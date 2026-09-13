import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { WikiArticle, WikiCategoryId } from '../../content/wiki.models';

const CATEGORY_LABELS: Record<WikiCategoryId, string> = {
  project: 'Project',
  'wet-lab': 'Wet Lab',
  'dry-lab': 'Dry Lab',
  'human-practices': 'Human Practices',
  team: 'Team',
  safety: 'Safety',
};

@Component({
  selector: 'app-wiki-article',
  standalone: true,
  templateUrl: './wiki-article.component.html',
  host: { style: 'display: contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WikiArticleComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input({ required: true }) article!: WikiArticle;
  @Input({ required: true }) scrollContainer!: HTMLElement;
  @Input() relatedArticles: WikiArticle[] = [];
  @Input() animationsPaused = false;
  @Output() tabNavigated = new EventEmitter<string>();

  activeSectionIndex: number | null = null;
  tocIndicatorTop = 0;
  tocIndicatorHeight = 56;
  copiedSection: string | null = null;
  copyFailedSection: string | null = null;
  copyAnnouncement = '';
  enterWithFragment = typeof window !== 'undefined' && !!window.location.hash;
  tabsSticky = false;
  tabsOverflow = false;
  controlsHidden = false;
  showBackToTop = false;

  private renderFrame?: number;
  private tocMeasureFrame?: number;
  private tocResizeObserver?: ResizeObserver;
  private copyFeedbackTimer?: ReturnType<typeof setTimeout>;
  private copyRequest = 0;
  private destroyed = false;
  private replayEntrance = false;
  private tabTimer?: ReturnType<typeof setTimeout>;
  private tabScrollTimer?: ReturnType<typeof setTimeout>;
  private tabAnimation?: Animation;
  private tabTarget: string | null = null;
  private tabDirection = 1;
  private tabScrollPositions = new Map<string, number>();
  private lastScrollTop = 0;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly elementRef: ElementRef<HTMLElement>,
  ) {}

  get categoryLabel(): string {
    return CATEGORY_LABELS[this.article.category];
  }

  get categoryArticles(): WikiArticle[] {
    return this.relatedArticles.filter((entry) => entry.category === this.article.category);
  }

  get previousArticle(): WikiArticle | null {
    const entries = this.categoryArticles;
    const index = entries.findIndex((entry) => entry.slug === this.article.slug);
    return index > 0 ? entries[index - 1] : null;
  }

  get nextArticle(): WikiArticle | null {
    const entries = this.categoryArticles;
    const index = entries.findIndex((entry) => entry.slug === this.article.slug);
    return index >= 0 && index < entries.length - 1 ? entries[index + 1] : null;
  }

  articlePath(article: WikiArticle): string {
    return `/${article.category}/${article.slug}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['article']) {
      const fromTab = this.tabTarget === this.articlePath(this.article);
      this.activeSectionIndex = null;
      this.copiedSection = null;
      this.copyFailedSection = null;
      this.copyAnnouncement = '';
      this.enterWithFragment = typeof window !== 'undefined' && !!window.location.hash;
      this.replayEntrance = !fromTab;
      if (!fromTab) {
        this.cancelTabNavigation();
        this.tabScrollPositions.clear();
      }
      this.copyRequest++;
      this.clearCopyFeedback();
      this.scheduleFragmentScroll();
      if (fromTab && this.isMobile) window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  ngAfterViewInit(): void {
    this.scheduleFragmentScroll();
    const toc = this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article-toc-items');
    if (toc && typeof ResizeObserver !== 'undefined') {
      this.tocResizeObserver = new ResizeObserver(() => { this.scheduleTocMeasurement(); this.measureTabs(); });
      this.tocResizeObserver.observe(toc);
      const tabs = this.elementRef.nativeElement.querySelector('.wiki-article-tabs');
      if (tabs) this.tocResizeObserver.observe(tabs);
    }
    document.fonts.ready.then(() => { this.scheduleTocMeasurement(); this.measureTabs(); });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.cancelTabNavigation();
    this.copyRequest++;
    this.clearCopyFeedback();
    if (this.renderFrame !== undefined) cancelAnimationFrame(this.renderFrame);
    if (this.tocMeasureFrame !== undefined) cancelAnimationFrame(this.tocMeasureFrame);
    this.tocResizeObserver?.disconnect();
  }

  @HostListener('window:hashchange')
  onHashChange(): void {
    this.scheduleFragmentScroll();
  }

  @HostListener('window:resize')
  onViewportResize(): void {
    this.onPageContentScroll();
    this.scheduleTocMeasurement();
    this.measureTabs();
    this.revealActiveTab();
  }

  selectTab(event: MouseEvent, entry: WikiArticle): void {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    event.stopPropagation();
    this.changeTab(entry);
  }

  stepTab(direction: number): void {
    const entries = this.categoryArticles;
    const next = entries[entries.findIndex(entry => entry.slug === this.article.slug) + direction];
    if (next) this.changeTab(next);
  }

  onTabKeydown(event: KeyboardEvent, index: number): void {
    const tabs = this.elementRef.nativeElement.querySelectorAll<HTMLElement>('.wiki-article-tab');
    let next: number;
    switch (event.key) {
      case 'ArrowLeft': next = Math.max(0, index - 1); break;
      case 'ArrowRight': next = Math.min(tabs.length - 1, index + 1); break;
      case 'Home': next = 0; break;
      case 'End': next = tabs.length - 1; break;
      case ' ': event.preventDefault(); tabs[index].click(); return;
      default: return;
    }
    event.preventDefault();
    tabs[next]?.focus({ preventScroll: true });
    this.revealTab(tabs[next]);
  }

  cancelTabNavigation(): void {
    clearTimeout(this.tabTimer);
    clearTimeout(this.tabScrollTimer);
    this.tabAnimation?.cancel();
    this.tabAnimation = undefined;
    this.tabTarget = null;
  }

  backToContent(focusContents = false): void {
    this.cancelTabNavigation();
    const toc = this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article-toc');
    if (!toc) return;
    this.scrollingElement.scrollTo({
      top: toc.getBoundingClientRect().top - this.scrollOrigin + this.scrollingElement.scrollTop - (this.isMobile ? 72 : 88),
      behavior: this.reducedMotion ? 'instant' : 'smooth',
    });
    this.revealActiveTab();
    this.controlsHidden = false;
    if (focusContents) toc.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
  }

  private changeTab(entry: WikiArticle): void {
    this.cancelTabNavigation();
    if (entry.slug === this.article.slug) { this.backToContent(); return; }
    const entries = this.categoryArticles;
    this.tabDirection = Math.sign(entries.indexOf(entry) - entries.findIndex(item => item.slug === this.article.slug));
    this.tabScrollPositions.set(this.articlePath(this.article), this.scrollingElement.scrollTop);
    this.tabTarget = this.articlePath(entry);
    const body = this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article-body');
    if (body && !this.reducedMotion) {
      this.tabAnimation = body.animate([
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: `translateX(${-10 * this.tabDirection}px)` },
      ], { duration: 100, easing: 'cubic-bezier(.2, 0, 0, 1)', fill: 'both' });
    }
    this.tabTimer = setTimeout(() => {
      if (this.tabTarget) this.tabNavigated.emit(this.tabTarget);
    }, this.reducedMotion ? 0 : 100);
  }

  private finishTabNavigation(): void {
    this.tabAnimation?.cancel();
    const body = this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article-body');
    if (body && !this.reducedMotion) {
      this.tabAnimation = body.animate([
        { opacity: 0, transform: `translateX(${10 * this.tabDirection}px)` },
        { opacity: 1, transform: 'translateX(0)' },
      ], { duration: 200, delay: 200, easing: 'linear', fill: 'backwards' });
    }
    this.revealActiveTab();
    this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article-tab.active')?.focus({ preventScroll: true });
    this.tabScrollTimer = setTimeout(() => {
      if (!this.isMobile) {
        const hero = this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article-hero');
        const container = this.scrollingElement;
        const top = hero ? hero.getBoundingClientRect().bottom - this.scrollOrigin + container.scrollTop : 0;
        const remembered = this.tabScrollPositions.get(this.articlePath(this.article)) ?? 0;
        const destination = Math.max(top, remembered);
        container.scrollTo({ top: destination, behavior: !this.reducedMotion && destination === top && container.scrollTop <= top ? 'smooth' : 'instant' });
      }
      this.tabTarget = null;
    }, this.reducedMotion ? 0 : 200);
  }

  private get isMobile(): boolean { return window.matchMedia('(max-width: 960px)').matches; }
  private get reducedMotion(): boolean { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  private get scrollingElement(): HTMLElement { return this.isMobile ? document.scrollingElement as HTMLElement : this.scrollContainer; }
  private get scrollOrigin(): number { return this.isMobile ? 0 : this.scrollContainer.getBoundingClientRect().top; }

  private measureTabs(): void {
    if (this.destroyed) return;
    const tabs = this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article-tabs');
    if (tabs) {
      this.tabsOverflow = tabs.scrollWidth > tabs.clientWidth + 1;
      this.changeDetectorRef.markForCheck();
    }
  }

  private revealActiveTab(): void {
    this.revealTab(this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article-tab.active'));
  }

  private revealTab(tab: HTMLElement | null | undefined): void {
    const tabs = tab?.parentElement;
    if (!tab || !tabs) return;
    const delta = tab.getBoundingClientRect().left - tabs.getBoundingClientRect().left;
    if (delta < 0) tabs.scrollBy({ left: delta, behavior: 'instant' });
    else if (delta + tab.offsetWidth > tabs.clientWidth) tabs.scrollBy({ left: delta + tab.offsetWidth - tabs.clientWidth, behavior: 'instant' });
  }

  /** Restore full-path fragment links even when the shell reuses this article. */
  restoreFragment(): void {
    this.scheduleFragmentScroll();
  }

  /** The surrounding app owns the scrolling element and forwards its scroll events. */
  onPageContentScroll(): void {
    if (!this.scrollContainer || !this.article) return;
    const container = this.scrollingElement;
    const hero = this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article-hero');
    const main = this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article');
    const transform = main ? getComputedStyle(main).transform : 'none';
    // History restores scroll before the entrance finishes; use the layout
    // boundary rather than its temporary 10px animation translation.
    const entranceOffset = transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m42;
    this.tabsSticky = !this.isMobile && !!hero && hero.getBoundingClientRect().bottom - entranceOffset <= this.scrollOrigin + .5;
    const body = this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article-body');
    this.showBackToTop = !!body && body.getBoundingClientRect().top < 0;
    if (Math.abs(container.scrollTop - this.lastScrollTop) > 5) {
      this.controlsHidden = innerWidth <= 600 && this.showBackToTop && container.scrollTop > this.lastScrollTop;
      this.lastScrollTop = container.scrollTop;
    }
    this.changeDetectorRef.markForCheck();
    const readingLine = this.scrollOrigin + this.readingOffset + 8;
    let nextIndex: number | null = null;
    for (const [index, section] of this.article.sections.entries()) {
      const element = this.sectionElement(section.id);
      if (element && element.getBoundingClientRect().top <= readingLine) nextIndex = index;
    }
    if (container.scrollTop > 0
      && container.scrollTop + container.clientHeight >= container.scrollHeight - 2
      && this.article.sections.length) {
      nextIndex = this.article.sections.length - 1;
    }
    if (nextIndex === this.activeSectionIndex) return;
    this.activeSectionIndex = nextIndex;
    this.scheduleTocMeasurement();
    this.changeDetectorRef.markForCheck();
  }

  scrollToSection(event: MouseEvent, sectionId: string): void {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    event.stopPropagation();
    if (!this.sectionElement(sectionId)) return;
    this.cancelTabNavigation();
    const targetUrl = new URL(window.location.href);
    targetUrl.hash = sectionId;
    if (targetUrl.href !== window.location.href) window.history.pushState(null, '', targetUrl);
    this.scrollSection(sectionId, true, true);
  }

  async copySectionLink(event: MouseEvent, sectionId: string): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    const request = ++this.copyRequest;
    const url = new URL(window.location.href);
    url.hash = sectionId;
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url.href);
        copied = true;
      }
    } catch {
      // A denied Clipboard API can still allow the browser's legacy copy action.
    }
    if (this.destroyed || request !== this.copyRequest) return;
    if (!copied) copied = this.copyWithSelection(url.href);
    if (this.destroyed || request !== this.copyRequest) return;

    this.copiedSection = copied ? sectionId : null;
    this.copyFailedSection = copied ? null : sectionId;
    this.copyAnnouncement = copied ? 'Section link copied.' : 'Copy failed. Select the section in the contents and copy the link from the address bar.';
    this.clearCopyFeedback();
    this.copyFeedbackTimer = setTimeout(() => {
      this.copiedSection = null;
      this.copyFailedSection = null;
      this.copyAnnouncement = '';
      this.changeDetectorRef.markForCheck();
    }, 2400);
    this.changeDetectorRef.markForCheck();
  }

  private get readingOffset(): number {
    if (window.matchMedia('(max-width: 960px)').matches) return 80;
    return window.matchMedia('(max-width: 1294px)').matches ? 88 : 136;
  }

  private sectionElement(id: string): HTMLElement | undefined {
    return Array.from(this.elementRef.nativeElement.querySelectorAll<HTMLElement>('[data-wiki-section]'))
      .find((element) => element.id === id);
  }

  private scheduleFragmentScroll(): void {
    if (typeof window === 'undefined') return;
    if (this.renderFrame !== undefined) cancelAnimationFrame(this.renderFrame);
    this.renderFrame = requestAnimationFrame(() => {
      this.renderFrame = undefined;
      if (this.replayEntrance) {
        const main = this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article');
        if (main) {
          main.style.animation = 'none';
          // Commit the disabled animation before replaying it for a reused article view.
          void main.offsetWidth;
          main.style.removeProperty('animation');
        }
        this.replayEntrance = false;
      }
      let id = window.location.hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* An invalid fragment simply has no matching section. */ }
      if (id && this.sectionElement(id)) this.scrollSection(id, false, false);
      this.onPageContentScroll();
      this.scheduleTocMeasurement();
      this.measureTabs();
      this.revealActiveTab();
      if (this.tabTarget === this.articlePath(this.article)) this.finishTabNavigation();
    });
  }

  private scrollSection(sectionId: string, animate: boolean, focus: boolean): void {
    const target = this.sectionElement(sectionId);
    if (!target || !this.scrollContainer) return;
    const top = target.getBoundingClientRect().top - this.scrollOrigin
      + this.scrollingElement.scrollTop - this.readingOffset;
    this.scrollingElement.scrollTo({ top: Math.max(0, top), behavior: animate && !this.reducedMotion ? 'smooth' : 'instant' });
    this.activeSectionIndex = this.article.sections.findIndex((section) => section.id === sectionId);
    this.scheduleTocMeasurement();
    if (focus) target.focus({ preventScroll: true });
    this.changeDetectorRef.markForCheck();
  }

  private scheduleTocMeasurement(): void {
    if (this.destroyed || typeof window === 'undefined') return;
    if (this.tocMeasureFrame !== undefined) cancelAnimationFrame(this.tocMeasureFrame);
    this.tocMeasureFrame = requestAnimationFrame(() => {
      this.tocMeasureFrame = undefined;
      if (this.activeSectionIndex === null) return;
      const toc = this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article-toc-items');
      const link = toc?.querySelectorAll<HTMLElement>('li > a')[this.activeSectionIndex];
      if (!toc || !link) return;
      const top = link.getBoundingClientRect().top - toc.getBoundingClientRect().top;
      const height = link.getBoundingClientRect().height;
      if (top === this.tocIndicatorTop && height === this.tocIndicatorHeight) return;
      this.tocIndicatorTop = top;
      this.tocIndicatorHeight = height;
      this.changeDetectorRef.markForCheck();
    });
  }

  private copyWithSelection(value: string): boolean {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.readOnly = true;
    textarea.style.cssText = 'position:fixed;left:-10000px;top:0;opacity:0;';
    document.body.appendChild(textarea);
    try {
      textarea.select();
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      textarea.remove();
      previousFocus?.focus({ preventScroll: true });
    }
  }

  private clearCopyFeedback(): void {
    if (this.copyFeedbackTimer !== undefined) {
      clearTimeout(this.copyFeedbackTimer);
      this.copyFeedbackTimer = undefined;
    }
  }
}
