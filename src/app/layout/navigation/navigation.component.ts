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
import type { MobileSubmenuItem, NavItem, VisibleMobileSubmenuItem } from './navigation.models';

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
  mobileMenuSection: string | null = null;
  private expandedMobileSubmenuItems = new Set<MobileSubmenuItem>();
  private mobileMenuTrigger?: HTMLElement;
  private mobileSubmenuTrigger?: string;
  /** Desktop keeps the source site's second-level drawer beside the rail. */
  desktopMenuSection: string | null = null;
  desktopPanelOpen = false;
  private expandedDesktopSubmenuItems = new Set<MobileSubmenuItem>();
  private desktopMenuTrigger?: HTMLElement;
  private desktopCloseTimer?: ReturnType<typeof setTimeout>;
  private desktopOpenTimer?: ReturnType<typeof setTimeout>;

  isDesktopSubmenuItemExpanded(item: MobileSubmenuItem): boolean {
    return this.expandedDesktopSubmenuItems.has(item);
  }

  /**
   * Keep the official destination on every topic item.  The clone does not
   * ship the documentation pages themselves, so topic links intentionally
   * open the corresponding Material page just as the source site does.
   */
  desktopTopicHref(item: MobileSubmenuItem): string {
    return item.href;
  }

  /** Mark the topic that owns the current path when a documentation route is open. */
  isDesktopTopicActive(item: MobileSubmenuItem, depth: number): boolean {
    if (depth !== 0 || typeof window === 'undefined') return false;
    try {
      const topicPath = new URL(item.href, window.location.origin).pathname.replace(/\/$/, '') || '/';
      const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
      return currentPath === topicPath || (topicPath !== '/' && currentPath.startsWith(`${topicPath}/`));
    } catch {
      return false;
    }
  }

  /** Open a topic drawer from a click or keyboard activation. */
  openDesktopSubmenu(event: Event | undefined, item: NavItem): void {
    if (!item.expandable || !this.mobileSubmenus[item.label]) return;
    event?.preventDefault();
    if (event?.currentTarget instanceof HTMLElement) {
      this.desktopMenuTrigger = event.currentTarget;
    }
    this.cancelDesktopSubmenuClose();
    if (this.desktopOpenTimer !== undefined) {
      this.cancelTimer(this.desktopOpenTimer);
      this.desktopOpenTimer = undefined;
    }
    const wasOpen = this.desktopPanelOpen && !!this.desktopMenuSection;
    const changedSection = this.desktopMenuSection !== item.label;
    this.desktopMenuSection = item.label;
    if (changedSection) this.expandedDesktopSubmenuItems = new Set();

    // Keep an already-open panel in place when moving between rail topics;
    // only the first open gets the source-style slide/fade entrance.
    if (wasOpen) {
      this.desktopPanelOpen = true;
      return;
    }
    // Render the drawer in its translated state for one frame, then add the
    // open class.  This makes the source-style slide-in observable even in
    // browsers that do not implement CSS @starting-style for Angular views.
    this.desktopPanelOpen = false;
    this.desktopOpenTimer = this.defer(() => {
      if (this.desktopMenuSection === item.label) {
        this.desktopPanelOpen = true;
      }
      this.desktopOpenTimer = undefined;
      this.changeDetectorRef.detectChanges();
    }, 0);
  }

  openDesktopSubmenuOnHover(item: NavItem): void {
    this.openDesktopSubmenu(undefined, item);
  }

  toggleDesktopSubmenuItem(event: Event, item: MobileSubmenuItem): void {
    if (!item.children?.length) {
      this.closeDesktopSubmenu(false);
      return;
    }
    event.preventDefault();
    this.cancelDesktopSubmenuClose();
    const expanded = new Set(this.expandedDesktopSubmenuItems);
    if (expanded.has(item)) {
      expanded.delete(item);
    } else {
      expanded.add(item);
    }
    this.expandedDesktopSubmenuItems = expanded;
  }

  onDesktopSubmenuLeafClick(_event: Event): void {
    // Let the anchor perform its normal navigation while the drawer starts
    // its exit transition. The source follows the same route-level behavior.
    this.closeDesktopSubmenu(false);
  }

  onDesktopNavItemClick(event: Event, item: NavItem): void {
    if (item.expandable) {
      this.openDesktopSubmenu(event, item);
      return;
    }
    if (this.desktopMenuSection) this.closeDesktopSubmenu(false);
    if (item.active) this.scrollHome(event);
  }

  onDesktopNavItemKeydown(event: KeyboardEvent, item: NavItem): void {
    if (!item.expandable) return;
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      this.openDesktopSubmenu(event, item);
    }
  }

  cancelDesktopSubmenuClose(): void {
    if (this.desktopCloseTimer !== undefined) {
      this.cancelTimer(this.desktopCloseTimer);
      this.desktopCloseTimer = undefined;
    }
    // If the pointer comes back while the dismissible drawer is sliding out,
    // reverse the transition instead of waiting for the panel to be removed.
    if (this.desktopMenuSection && !this.desktopPanelOpen) {
      this.desktopPanelOpen = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  scheduleDesktopSubmenuClose(): void {
    this.cancelDesktopSubmenuClose();
    if (!this.desktopMenuSection) return;
    // A short grace period lets the pointer cross from the 88px rail into
    // the adjacent drawer without causing a flicker.
    this.desktopCloseTimer = this.defer(() => {
      this.desktopPanelOpen = false;
      this.changeDetectorRef.detectChanges();
      this.desktopCloseTimer = this.defer(() => {
        if (!this.desktopPanelOpen) {
          this.desktopMenuSection = null;
          this.expandedDesktopSubmenuItems = new Set();
        }
        this.desktopCloseTimer = undefined;
        this.changeDetectorRef.detectChanges();
      }, 300);
    }, 140);
  }

  closeDesktopSubmenu(restoreFocus = true): void {
    if (!this.desktopMenuSection && !this.desktopPanelOpen) return;
    this.cancelDesktopSubmenuClose();
    if (this.desktopOpenTimer !== undefined) {
      this.cancelTimer(this.desktopOpenTimer);
      this.desktopOpenTimer = undefined;
    }
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
      this.defer(() => trigger.focus(), 0);
    }
    this.changeDetectorRef.markForCheck();
  }

  /** The source dismissible drawer closes when the pointer lands in content. */
  @HostListener('document:pointerdown', ['$event'])
  onDocumentPointerDown(event: PointerEvent): void {
    if (!this.desktopMenuSection || !this.desktopPanelOpen || typeof Element === 'undefined') return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('.nav-rail, .desktop-topic-drawer')) return;
    // Do not restore focus to the rail trigger here: the trigger's focus
    // handler intentionally opens a topic drawer, which would immediately
    // undo an outside-click dismissal.
    this.closeDesktopSubmenu(false);
  }

  toggleMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
      return;
    }
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      this.mobileMenuTrigger = document.activeElement;
    }
    this.isMobileMenuOpen = true;
    this.mobileMenuSection = null;
    this.expandedMobileSubmenuItems = new Set();
    this.defer(() => {
      document.querySelector<HTMLElement>('.mobile-drawer .drawer-item')?.focus();
    }, 0);
  }

  closeMobileMenu(restoreFocus = true): void {
    this.isMobileMenuOpen = false;
    this.mobileMenuSection = null;
    this.expandedMobileSubmenuItems = new Set();
    this.mobileSubmenuTrigger = undefined;
    const trigger = this.mobileMenuTrigger;
    this.mobileMenuTrigger = undefined;
    if (restoreFocus && trigger?.isConnected) {
      this.defer(() => trigger.focus(), 0);
    }
    this.changeDetectorRef.markForCheck();
  }

  openMobileSubmenu(event: Event, item: NavItem): void {
    if (!item.expandable || !this.mobileSubmenus[item.label]) return;
    event.preventDefault();
    this.mobileSubmenuTrigger = item.label;
    this.mobileMenuSection = item.label;
    this.expandedMobileSubmenuItems = new Set();
    this.defer(() => document.querySelector<HTMLElement>('.drawer-back')?.focus(), 0);
  }

  closeMobileSubmenu(): void {
    const section = this.mobileSubmenuTrigger;
    this.mobileMenuSection = null;
    this.mobileSubmenuTrigger = undefined;
    this.expandedMobileSubmenuItems = new Set();
    // Restore focus to the topic that opened the submenu once the main menu
    // has been rendered again.
    if (section && typeof document !== 'undefined') {
      this.defer(() => {
        const item = Array.from(document.querySelectorAll<HTMLElement>('.mobile-drawer .drawer-item'))
          .find((candidate) => candidate.getAttribute('aria-label') === section);
        item?.focus();
      }, 0);
    }
  }

  get visibleMobileSubmenuItems(): VisibleMobileSubmenuItem[] {
    if (!this.mobileMenuSection) return [];
    const visible: VisibleMobileSubmenuItem[] = [];
    const walk = (items: MobileSubmenuItem[], depth: number): void => {
      items.forEach((item, index) => {
        visible.push({
          item,
          depth,
          childStart: depth > 0 && index === 0,
          childEnd: depth > 0 && index === items.length - 1,
        });
        if (item.children?.length && this.expandedMobileSubmenuItems.has(item)) {
          walk(item.children, depth + 1);
        }
      });
    };
    walk(this.mobileSubmenus[this.mobileMenuSection] ?? [], 0);
    return visible;
  }

  isMobileSubmenuItemExpanded(item: MobileSubmenuItem): boolean {
    return this.expandedMobileSubmenuItems.has(item);
  }

  openMobileSubmenuItem(event: Event, item: MobileSubmenuItem): void {
    if (!item.children?.length) {
      this.closeMobileMenu();
      return;
    }
    event.preventDefault();
    const expanded = new Set(this.expandedMobileSubmenuItems);
    if (expanded.has(item)) {
      expanded.delete(item);
    } else {
      expanded.add(item);
    }
    this.expandedMobileSubmenuItems = expanded;
  }

  onDrawerItemClick(event: Event, item: NavItem): void {
    if (item.expandable) {
      this.openMobileSubmenu(event, item);
      return;
    }
    if (item.active) this.scrollHome(event);
    this.closeMobileMenu();
  }

  onDrawerItemKeydown(event: Event, item: NavItem): void {
    const key = (event as KeyboardEvent).key;
    if (key === ' ' || key === 'Spacebar') {
      if (item.expandable) this.onDrawerItemClick(event, item);
    }
  }

  openSearch(event: Event): void {
    event.preventDefault();
    this.closeMenus(false);
    this.searchRequested.emit(event);
  }

  scrollHome(event: Event): void {
    event.preventDefault();
    this.closeDesktopSubmenu(false);
    this.homeRequested.emit(event);
  }

  toggleTheme(): void {
    this.themeToggled.emit();
  }

  toggleAnimations(): void {
    this.animationsToggled.emit();
  }

  /** Reset navigation state when the parent changes the active page. */
  closeMenus(restoreMobileFocus = false): void {
    this.closeDesktopSubmenu(false);
    this.closeMobileMenu(restoreMobileFocus);
    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    for (const timer of this.pendingTimers) clearTimeout(timer);
    this.pendingTimers.clear();
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
