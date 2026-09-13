import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NAV_ITEMS, NAVIGATION_SUBMENUS } from './navigation.data';
import type { MobileSubmenuItem, NavItem } from './navigation.models';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './navigation.component.html',
  host: { style: 'display: contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnDestroy {
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  @Input() activeCategory = '';
  @Input() isSearchPage = false;
  @Input() isArticlePage = false;
  @Input() isDark = false;
  @Input() animationsPaused = false;

  @Output() readonly searchRequested = new EventEmitter<Event>();
  @Output() readonly homeRequested = new EventEmitter<Event>();
  @Output() readonly themeToggled = new EventEmitter<void>();
  @Output() readonly animationsToggled = new EventEmitter<void>();

  readonly navItems = NAV_ITEMS;
  readonly mobileSubmenus = NAVIGATION_SUBMENUS;
  private readonly pendingTimers = new Set<ReturnType<typeof setTimeout>>();

  isMobileMenuOpen = false;
  isMobileMenuMounted = false;
  mobileContentTransition = false;
  mobileMenuSection: string | null = null;
  desktopMenuSection: string | null = null;
  desktopPanelOpen = false;
  desktopContentTransition = false;
  private expandedMobileSubmenuItems = new Set<MobileSubmenuItem>();
  private expandedDesktopSubmenuItems = new Set<MobileSubmenuItem>();
  private mobileMenuTrigger?: HTMLElement;
  private mobileSubmenuTrigger?: string;
  private desktopMenuTrigger?: HTMLElement;
  private suppressedFocusTrigger?: HTMLElement;
  private desktopCloseTimer?: ReturnType<typeof setTimeout>;
  private desktopOpenTimer?: ReturnType<typeof setTimeout>;
  private mobileCloseTimer?: ReturnType<typeof setTimeout>;

  isNavItemActive(item: NavItem): boolean {
    if (this.isSearchPage || this.activeCategory === 'search') return false;
    if (this.activeCategory) return this.activeCategory === item.id;
    if (typeof window === 'undefined') return item.id === 'home';
    const path = this.normalizedPath(window.location.pathname);
    return path === item.href || (item.href !== '/' && path.startsWith(`${item.href}/`));
  }

  isTopicActive(item: MobileSubmenuItem): boolean {
    if (typeof window === 'undefined') return false;
    return this.normalizedPath(window.location.pathname) === this.normalizedPath(item.href);
  }

  private normalizedPath(path: string): string {
    const normalized = path.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
    return normalized === '/get-started' ? '/project' : normalized;
  }

  isDesktopSubmenuItemExpanded(item: MobileSubmenuItem): boolean {
    return this.expandedDesktopSubmenuItems.has(item);
  }

  isMobileSubmenuItemExpanded(item: MobileSubmenuItem): boolean {
    return this.expandedMobileSubmenuItems.has(item);
  }

  private initiallyExpandedItems(section: string): Set<MobileSubmenuItem> {
    const expanded = new Set<MobileSubmenuItem>();
    const walk = (items: MobileSubmenuItem[]): boolean => items.reduce((hasActive, item) => {
      const active = item.children?.length ? walk(item.children) : this.isTopicActive(item);
      if (active && item.children?.length) expanded.add(item);
      return hasActive || active;
    }, false);
    walk(this.mobileSubmenus[section] ?? []);
    return expanded;
  }

  /** Modified link clicks keep the browser's new-tab and download behavior. */
  private isModifiedClick(event?: Event): boolean {
    return event instanceof MouseEvent && (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);
  }

  openDesktopSubmenu(event: Event | undefined, item: NavItem): void {
    if (!item.expandable || !this.mobileSubmenus[item.label] || this.isModifiedClick(event)) return;
    event?.preventDefault();
    if (event?.currentTarget instanceof HTMLElement) this.desktopMenuTrigger = event.currentTarget;
    this.cancelDesktopSubmenuClose();
    if (this.desktopOpenTimer !== undefined) this.cancelTimer(this.desktopOpenTimer);
    const wasOpen = this.desktopPanelOpen && !!this.desktopMenuSection;
    if (!wasOpen) this.desktopContentTransition = false;
    else if (this.desktopMenuSection !== item.label) this.desktopContentTransition = true;
    if (this.desktopMenuSection !== item.label) {
      this.expandedDesktopSubmenuItems = this.initiallyExpandedItems(item.label);
    }
    this.desktopMenuSection = item.label;
    this.desktopPanelOpen = wasOpen;
    if (!wasOpen) {
      // Commit the translated panel before transitioning it into view.
      this.desktopOpenTimer = this.defer(() => {
        this.desktopPanelOpen = this.desktopMenuSection === item.label;
        this.desktopOpenTimer = undefined;
        this.changeDetectorRef.detectChanges();
      }, 20);
    }
  }

  openDesktopSubmenuOnHover(item: NavItem, event: MouseEvent): void {
    if (event.currentTarget instanceof HTMLElement) this.desktopMenuTrigger = event.currentTarget;
    this.openDesktopSubmenu(undefined, item);
  }

  onDesktopNavItemFocus(event: FocusEvent, item: NavItem): void {
    if (event.currentTarget === this.suppressedFocusTrigger) {
      this.suppressedFocusTrigger = undefined;
      return;
    }
    if (event.currentTarget instanceof HTMLElement) this.desktopMenuTrigger = event.currentTarget;
    this.openDesktopSubmenu(undefined, item);
  }

  toggleDesktopSubmenuItem(event: Event, item: MobileSubmenuItem): void {
    event.preventDefault();
    this.cancelDesktopSubmenuClose();
    this.expandedDesktopSubmenuItems = this.toggleExpandedItem(this.expandedDesktopSubmenuItems, item);
  }

  onDesktopSubmenuLeafClick(event: Event): void {
    if (!this.isModifiedClick(event)) this.closeDesktopSubmenu(false);
  }

  onDesktopNavItemClick(event: Event, item: NavItem): void {
    if (this.isModifiedClick(event)) return;
    if (item.expandable) this.openDesktopSubmenu(event, item);
    else this.scrollHome(event);
  }

  onDesktopNavItemKeydown(event: KeyboardEvent, item: NavItem): void {
    if (!item.expandable) return;
    if (['Enter', ' ', 'ArrowRight', 'ArrowDown'].includes(event.key)) {
      this.openDesktopSubmenu(event, item);
      this.defer(() => document.querySelector<HTMLElement>('.desktop-topic-nav:not(.desktop-topic-nav-leave) .desktop-topic-item')?.focus(), 300);
    }
  }

  cancelDesktopSubmenuClose(): void {
    if (this.desktopCloseTimer !== undefined) this.cancelTimer(this.desktopCloseTimer);
    this.desktopCloseTimer = undefined;
    if (this.desktopMenuSection && !this.desktopPanelOpen) {
      this.desktopPanelOpen = true;
      this.changeDetectorRef.markForCheck();
    }
  }

  scheduleDesktopSubmenuClose(): void {
    if (this.desktopCloseTimer !== undefined) this.cancelTimer(this.desktopCloseTimer);
    if (!this.desktopMenuSection) return;
    // Allow the pointer to cross the boundary between the rail and drawer.
    this.desktopCloseTimer = this.defer(() => {
      this.desktopCloseTimer = undefined;
      // Pointer movement must not hide the item a keyboard user is reading.
      if (document.activeElement?.closest('.desktop-topic-drawer')) return;
      this.closeDesktopSubmenu(false);
    }, 140);
  }

  closeDesktopSubmenu(restoreFocus = true): void {
    if (!this.desktopMenuSection && !this.desktopPanelOpen) return;
    if (this.desktopCloseTimer !== undefined) this.cancelTimer(this.desktopCloseTimer);
    if (this.desktopOpenTimer !== undefined) this.cancelTimer(this.desktopOpenTimer);
    this.desktopOpenTimer = undefined;
    this.desktopPanelOpen = false;
    const trigger = this.desktopMenuTrigger;
    this.desktopMenuTrigger = undefined;
    this.desktopCloseTimer = this.defer(() => {
      if (!this.desktopPanelOpen) {
        this.desktopMenuSection = null;
        this.expandedDesktopSubmenuItems = new Set();
      }
      this.desktopCloseTimer = undefined;
      this.changeDetectorRef.detectChanges();
    }, 300);
    if (restoreFocus && trigger?.isConnected) {
      this.suppressedFocusTrigger = trigger;
      trigger.focus();
      this.suppressedFocusTrigger = undefined;
    }
    this.changeDetectorRef.markForCheck();
  }

  toggleMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
      return;
    }
    this.closeDesktopSubmenu(false);
    if (this.mobileCloseTimer !== undefined) this.cancelTimer(this.mobileCloseTimer);
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      this.mobileMenuTrigger = document.activeElement;
    }
    this.isMobileMenuMounted = true;
    this.isMobileMenuOpen = true;
    this.mobileContentTransition = false;
    const activeSection = this.isArticlePage
      ? this.navItems.find((item) => item.expandable && this.isNavItemActive(item))?.label
      : undefined;
    this.mobileMenuSection = activeSection ?? null;
    this.mobileSubmenuTrigger = activeSection;
    this.expandedMobileSubmenuItems = activeSection ? this.initiallyExpandedItems(activeSection) : new Set();
    document.documentElement.classList.add('navigation-scroll-locked');
    this.defer(() => {
      if (this.isMobileMenuOpen) {
        const activeItem = document.querySelector<HTMLElement>('.mobile-drawer .drawer-item.active');
        (activeItem ?? document.querySelector<HTMLElement>('.drawer-header button'))?.focus({ preventScroll: true });
      }
    }, 300);
  }

  closeMobileMenu(restoreFocus = true): void {
    if (!this.isMobileMenuMounted) return;
    this.isMobileMenuOpen = false;
    const trigger = this.mobileMenuTrigger;
    this.mobileMenuTrigger = undefined;
    if (this.mobileCloseTimer !== undefined) this.cancelTimer(this.mobileCloseTimer);
    this.mobileCloseTimer = this.defer(() => {
      this.isMobileMenuMounted = false;
      this.mobileContentTransition = false;
      this.mobileMenuSection = null;
      this.expandedMobileSubmenuItems = new Set();
      this.mobileSubmenuTrigger = undefined;
      this.mobileCloseTimer = undefined;
      document.documentElement.classList.remove('navigation-scroll-locked');
      this.changeDetectorRef.detectChanges();
    }, 300);
    if (restoreFocus && trigger?.isConnected) trigger.focus();
    this.changeDetectorRef.markForCheck();
  }

  openMobileSubmenu(event: Event, item: NavItem): void {
    if (!item.expandable || !this.mobileSubmenus[item.label] || this.isModifiedClick(event)) return;
    event.preventDefault();
    this.mobileContentTransition = true;
    this.mobileSubmenuTrigger = item.label;
    this.mobileMenuSection = item.label;
    this.expandedMobileSubmenuItems = this.initiallyExpandedItems(item.label);
    this.defer(() => {
      if (this.isMobileMenuOpen) document.querySelector<HTMLElement>('.drawer-back')?.focus();
    }, 300);
  }

  closeMobileSubmenu(): void {
    const section = this.mobileSubmenuTrigger;
    this.mobileContentTransition = true;
    this.mobileMenuSection = null;
    this.mobileSubmenuTrigger = undefined;
    this.expandedMobileSubmenuItems = new Set();
    this.defer(() => {
      if (!this.isMobileMenuOpen) return;
      Array.from(document.querySelectorAll<HTMLElement>('.mobile-drawer .drawer-item'))
        .find((item) => item.getAttribute('aria-label') === section)?.focus();
    }, 300);
  }

  openMobileSubmenuItem(event: Event, item: MobileSubmenuItem): void {
    if (this.isModifiedClick(event)) return;
    if (!item.children?.length) {
      this.closeMobileMenu(false);
      return;
    }
    event.preventDefault();
    this.expandedMobileSubmenuItems = this.toggleExpandedItem(this.expandedMobileSubmenuItems, item);
  }

  onDrawerItemClick(event: Event, item: NavItem): void {
    if (this.isModifiedClick(event)) return;
    if (item.expandable) this.openMobileSubmenu(event, item);
    else this.scrollHome(event);
  }

  onDrawerItemKeydown(event: KeyboardEvent, item: NavItem): void {
    if (event.key === ' ' || event.key === 'ArrowRight') this.onDrawerItemClick(event, item);
  }

  openSearch(event: Event): void {
    if (this.isModifiedClick(event)) return;
    event.preventDefault();
    this.closeMenus(false);
    this.searchRequested.emit(event);
  }

  scrollHome(event: Event): void {
    if (this.isModifiedClick(event)) return;
    event.preventDefault();
    this.closeMenus(false);
    this.homeRequested.emit(event);
  }

  toggleTheme(): void { this.themeToggled.emit(); }
  toggleAnimations(): void { this.animationsToggled.emit(); }

  closeMenus(restoreMobileFocus = false): void {
    this.closeDesktopSubmenu(false);
    this.closeMobileMenu(restoreMobileFocus);
  }

  @HostListener('document:pointerdown', ['$event'])
  onDocumentPointerDown(event: PointerEvent): void {
    if (event.target instanceof Element && !event.target.closest('.nav-rail, .desktop-topic-drawer')) {
      this.closeDesktopSubmenu(false);
    }
  }

  @HostListener('document:focusin', ['$event'])
  onDocumentFocusIn(event: FocusEvent): void {
    if (!(event.target instanceof Element)) return;
    if (this.isMobileMenuOpen && !event.target.closest('.drawer-layer')) {
      document.querySelector<HTMLElement>('.drawer-header button')?.focus();
      return;
    }
    if (!event.target.closest('.nav-rail, .desktop-topic-drawer')) this.closeDesktopSubmenu(false);
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if (this.isMobileMenuOpen) {
        event.preventDefault();
        if (this.mobileMenuSection) this.closeMobileSubmenu();
        else this.closeMobileMenu();
      } else if (this.desktopPanelOpen) {
        event.preventDefault();
        this.closeDesktopSubmenu();
      }
      return;
    }
    if (event.key !== 'Tab' || !this.isMobileMenuOpen) return;
    const layer = document.querySelector<HTMLElement>('.drawer-layer');
    const focusable = Array.from(layer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]') ?? [])
      .filter((item) => item.tabIndex >= 0 && !item.closest('[inert], [aria-hidden="true"], .drawer-main-leave, .drawer-submenu-leave') && item.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && (document.activeElement === first || !layer?.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !layer?.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 960 && this.isMobileMenuMounted) this.closeMobileMenu(false);
    if (window.innerWidth <= 960) this.closeDesktopSubmenu(false);
  }

  ngOnDestroy(): void {
    document.documentElement.classList.remove('navigation-scroll-locked');
    for (const timer of this.pendingTimers) clearTimeout(timer);
    this.pendingTimers.clear();
  }

  private toggleExpandedItem(items: Set<MobileSubmenuItem>, item: MobileSubmenuItem): Set<MobileSubmenuItem> {
    const expanded = new Set(items);
    if (expanded.has(item)) expanded.delete(item);
    else expanded.add(item);
    return expanded;
  }

  private defer(callback: () => void, delay: number): ReturnType<typeof setTimeout> {
    const timer = setTimeout(() => {
      this.pendingTimers.delete(timer);
      callback();
    }, delay);
    this.pendingTimers.add(timer);
    return timer;
  }

  private cancelTimer(timer: ReturnType<typeof setTimeout>): void {
    clearTimeout(timer);
    this.pendingTimers.delete(timer);
  }
}
