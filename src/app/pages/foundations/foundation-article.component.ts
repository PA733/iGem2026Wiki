import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FOUNDATION_ARTICLES } from './foundation-article.data';
import { FoundationArticleKey, FoundationArticlePage } from './foundation-article.models';
import { foundationArticleKeyForPath } from './foundation-article.routes';

@Component({
  selector: 'app-foundation-article',
  standalone: true,
  templateUrl: './foundation-article.component.html',
  host: { style: 'display: contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoundationArticleComponent implements OnChanges, OnDestroy {
  @Input() articleKey: FoundationArticleKey = 'principles';
  @Input({ required: true }) scrollContainer!: HTMLElement;
  @Output() readonly articleRequested = new EventEmitter<{ event: Event; path: string }>();

  activeArticleTocIndex: number | null = null;
  copiedArticleSection: string | null = null;
  private copyFeedbackTimer?: ReturnType<typeof setTimeout>;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  get currentFoundationArticle(): FoundationArticlePage {
    return FOUNDATION_ARTICLES[this.articleKey];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['articleKey']) {
      this.activeArticleTocIndex = null;
      this.copiedArticleSection = null;
      this.clearCopyFeedbackTimer();
    }
  }

  ngOnDestroy(): void {
    this.clearCopyFeedbackTimer();
  }

  /** Let the application shell handle navigation between local article tabs. */
  openArticle(event: Event, path: string): void {
    if (!foundationArticleKeyForPath(path)) return;
    event.preventDefault();
    this.articleRequested.emit({ event, path });
  }

  navigateArticleLink(event: Event, path: string): void {
    this.openArticle(event, path);
  }

  scrollArticleTo(event: Event, targetId: string): void {
    event.preventDefault();
    const target = document.getElementById(targetId);
    const scrollContainer = this.scrollContainer;
    if (!target || !scrollContainer) return;
    const tocIndex = this.currentFoundationArticle.toc.findIndex((entry) => entry.target === targetId);
    this.activeArticleTocIndex = tocIndex < 0 ? null : tocIndex;
    const scrollTop = target.getBoundingClientRect().top
      - scrollContainer.getBoundingClientRect().top
      + scrollContainer.scrollTop;
    scrollContainer.scrollTo({ top: scrollTop, behavior: 'smooth' });
    target.focus({ preventScroll: true });
    this.changeDetectorRef.markForCheck();
  }

  /** Follow the section at the shared scrolling shell's sticky reading line. */
  onPageContentScroll(): void {
    if (typeof document === 'undefined') return;
    const scrollContainer = this.scrollContainer;
    if (!scrollContainer) return;

    const readingLine = scrollContainer.getBoundingClientRect().top + 136;
    let nextIndex: number | null = null;
    for (const [index, entry] of this.currentFoundationArticle.toc.entries()) {
      const section = document.getElementById(entry.target);
      if (section && section.getBoundingClientRect().top <= readingLine + 0.5) {
        nextIndex = index;
      }
    }

    if (nextIndex === this.activeArticleTocIndex) return;
    this.activeArticleTocIndex = nextIndex;
    this.changeDetectorRef.markForCheck();
  }

  copyArticleLink(event: Event, sectionId: string): void {
    event.preventDefault();
    const url = typeof window === 'undefined'
      ? `#${sectionId}`
      : `${window.location.origin}${window.location.pathname}#${sectionId}`;
    const copy = typeof navigator !== 'undefined' && navigator.clipboard
      ? navigator.clipboard.writeText(url)
      : Promise.resolve();
    void copy.catch(() => undefined);
    this.copiedArticleSection = sectionId;
    this.clearCopyFeedbackTimer();
    this.copyFeedbackTimer = setTimeout(() => {
      this.copiedArticleSection = null;
      this.copyFeedbackTimer = undefined;
      this.changeDetectorRef.markForCheck();
    }, 1400);
  }

  private clearCopyFeedbackTimer(): void {
    if (this.copyFeedbackTimer !== undefined) {
      clearTimeout(this.copyFeedbackTimer);
      this.copyFeedbackTimer = undefined;
    }
  }
}
