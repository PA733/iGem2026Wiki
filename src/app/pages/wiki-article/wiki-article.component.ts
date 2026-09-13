import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
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

  activeSectionIndex: number | null = null;
  tocIndicatorTop = 0;
  tocIndicatorHeight = 56;
  copiedSection: string | null = null;
  copyFailedSection: string | null = null;
  copyAnnouncement = '';
  enterWithFragment = typeof window !== 'undefined' && !!window.location.hash;

  private renderFrame?: number;
  private tocMeasureFrame?: number;
  private tocResizeObserver?: ResizeObserver;
  private copyFeedbackTimer?: ReturnType<typeof setTimeout>;
  private copyRequest = 0;
  private destroyed = false;
  private replayEntrance = false;

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
      this.activeSectionIndex = null;
      this.copiedSection = null;
      this.copyFailedSection = null;
      this.copyAnnouncement = '';
      this.enterWithFragment = typeof window !== 'undefined' && !!window.location.hash;
      this.replayEntrance = true;
      this.copyRequest++;
      this.clearCopyFeedback();
      this.scheduleFragmentScroll();
    }
  }

  ngAfterViewInit(): void {
    this.scheduleFragmentScroll();
    const toc = this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article-toc-items');
    if (toc && typeof ResizeObserver !== 'undefined') {
      this.tocResizeObserver = new ResizeObserver(() => this.scheduleTocMeasurement());
      this.tocResizeObserver.observe(toc);
    }
    document.fonts.ready.then(() => this.scheduleTocMeasurement());
  }

  ngOnDestroy(): void {
    this.destroyed = true;
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
  }

  /** Restore full-path fragment links even when the shell reuses this article. */
  restoreFragment(): void {
    this.scheduleFragmentScroll();
  }

  /** The surrounding app owns the scrolling element and forwards its scroll events. */
  onPageContentScroll(): void {
    if (!this.scrollContainer || !this.article) return;
    const readingLine = this.scrollContainer.getBoundingClientRect().top + this.readingOffset + 8;
    let nextIndex: number | null = null;
    for (const [index, section] of this.article.sections.entries()) {
      const element = this.sectionElement(section.id);
      if (element && element.getBoundingClientRect().top <= readingLine) nextIndex = index;
    }
    if (this.scrollContainer.scrollTop > 0
      && this.scrollContainer.scrollTop + this.scrollContainer.clientHeight >= this.scrollContainer.scrollHeight - 2
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
    return window.matchMedia('(max-width: 1287px)').matches ? 32 : 136;
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
      const activeTab = this.elementRef.nativeElement.querySelector<HTMLElement>('.wiki-article-tab.active');
      if (activeTab?.parentElement) {
        const tabs = activeTab.parentElement;
        tabs.scrollLeft = Math.max(0, activeTab.offsetLeft - (tabs.clientWidth - activeTab.offsetWidth) / 2);
      }
    });
  }

  private scrollSection(sectionId: string, animate: boolean, focus: boolean): void {
    const target = this.sectionElement(sectionId);
    if (!target || !this.scrollContainer) return;
    const reducedMotion = this.animationsPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = target.getBoundingClientRect().top - this.scrollContainer.getBoundingClientRect().top
      + this.scrollContainer.scrollTop - this.readingOffset;
    this.scrollContainer.scrollTo({ top: Math.max(0, top), behavior: animate && !reducedMotion ? 'smooth' : 'instant' });
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
