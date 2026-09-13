import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { WikiArticle, WikiCategory } from '../../content/wiki.models';
import { WIKI_CATEGORIES } from '../../content/wiki.data';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './category-page.component.html',
  host: { style: 'display: contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPageComponent implements OnChanges {
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}
  @Input({ required: true }) category!: WikiCategory;
  @Input() articles: WikiArticle[] = [];
  @Input({ required: true }) scrollContainer!: HTMLElement;
  @Input() animationsPaused = false;
  readonly categories = WIKI_CATEGORIES;
  activeSection = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) this.activeSection = 0;
  }

  onPageContentScroll(): void {
    const readingLine = this.scrollContainer.getBoundingClientRect().top + this.scrollContainer.clientHeight * .55;
    let index = 0;
    this.articles.forEach((article, i) => {
      const element = document.getElementById(article.slug);
      if (element && element.getBoundingClientRect().top <= readingLine) index = i;
    });
    if (index !== this.activeSection) {
      this.activeSection = index;
      this.changeDetectorRef.markForCheck();
    }
  }

  jumpTo(event: Event, id: string): void {
    if (event instanceof MouseEvent && (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)) return;
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const reduceMotion = this.animationsPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const offset = window.innerWidth > 1294 ? (this.scrollContainer.clientHeight - target.clientHeight) / 2 : (window.innerWidth <= 960 ? 80 : 16);
    this.scrollContainer.scrollTo({
      top: target.getBoundingClientRect().top - this.scrollContainer.getBoundingClientRect().top + this.scrollContainer.scrollTop - offset,
      behavior: reduceMotion ? 'instant' : 'smooth',
    });
    history.replaceState({}, '', `${location.pathname}#${id}`);
    target.focus({ preventScroll: true });
  }
}
