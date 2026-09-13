import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { SearchPageComponent } from './pages/search/search-page.component';
import { CategoryPageComponent } from './pages/category/category-page.component';
import { WikiArticleComponent } from './pages/wiki-article/wiki-article.component';
import { WIKI_ARTICLES, WIKI_CATEGORIES, articleForPath, categoryForPath } from './content/wiki.data';
import { WikiArticle, WikiCategory } from './content/wiki.models';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [NavigationComponent, HomePageComponent, SearchPageComponent, CategoryPageComponent, WikiArticleComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('pageContent') private pageContent?: ElementRef<HTMLElement>;
  @ViewChild(NavigationComponent) private navigation?: NavigationComponent;
  @ViewChild(SearchPageComponent) private searchPage?: SearchPageComponent;
  @ViewChild(WikiArticleComponent) private articlePage?: WikiArticleComponent;
  @ViewChild(CategoryPageComponent) private categoryPage?: CategoryPageComponent;
  isDark = false;
  animationsPaused = false;
  isSearchPage = false;
  hasSearchResults = false;
  currentPath = '/';
  article: WikiArticle | null = null;
  category: WikiCategory | null = null;
  relatedArticles: WikiArticle[] = [];
  notFound = false;
  readonly categories = WIKI_CATEGORIES;
  private renderTimer?: ReturnType<typeof setTimeout>;
  private restoreFrame?: number;
  private entryKey = '';
  private readonly scrollPositions = new Map<string, number>();

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  get activeCategory(): string { return this.isSearchPage ? 'search' : this.article?.category ?? this.category?.id ?? (this.notFound ? '' : 'home'); }

  ngOnInit(): void {
    try {
      this.isDark = localStorage.getItem('current_mode') === 'dark';
      this.animationsPaused = localStorage.getItem('current_animation') === 'pause';
    } catch { /* Browsing with storage disabled still permits theme controls. */ }
    this.syncBodyTheme();
    this.entryKey = this.ensureHistoryKey();
    this.syncPageFromLocation();
    this.afterNavigation(false);
  }

  ngOnDestroy(): void {
    clearTimeout(this.renderTimer);
    if (this.restoreFrame !== undefined) cancelAnimationFrame(this.restoreFrame);
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    try { localStorage.setItem('current_mode', this.isDark ? 'dark' : 'light'); } catch {}
    this.syncBodyTheme();
  }

  toggleAnimations(): void {
    this.animationsPaused = !this.animationsPaused;
    try { localStorage.setItem('current_animation', this.animationsPaused ? 'pause' : 'play'); } catch {}
  }

  openSearch(event?: Event): void { event?.preventDefault(); this.navigate('/search.html'); }
  scrollHome(event: Event): void {
    if (event instanceof MouseEvent && (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)) return;
    event.preventDefault();
    this.navigate('/');
  }

  onInternalLink(event: MouseEvent): void {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
    const url = new URL(anchor.href, location.href);
    if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol)) return;
    if (anchor.getAttribute('href')?.startsWith('#')) return;
    event.preventDefault();
    this.navigate(url.pathname + url.search + url.hash);
  }

  navigate(path: string, articleTab = false): void {
    this.scrollPositions.set(this.ensureHistoryKey(), this.scrollingElement?.scrollTop ?? 0);
    if (!articleTab) this.articlePage?.cancelTabNavigation();
    this.navigation?.closeMenus(false);
    if (location.pathname + location.search + location.hash !== path) history.pushState({}, '', path);
    this.entryKey = this.ensureHistoryKey();
    this.syncPageFromLocation();
    if (!articleTab) this.afterNavigation(true);
  }

  @HostListener('window:popstate')
  onPopState(): void {
    if (this.entryKey) this.scrollPositions.set(this.entryKey, this.scrollingElement?.scrollTop ?? 0);
    this.articlePage?.cancelTabNavigation();
    this.entryKey = this.ensureHistoryKey();
    const restoredPosition = this.scrollPositions.get(this.entryKey);
    this.navigation?.closeMenus(false);
    this.syncPageFromLocation();
    this.afterNavigation(true, restoredPosition);
  }

  onPageContentScroll(): void {
    this.entryKey = this.ensureHistoryKey();
    this.scrollPositions.set(this.entryKey, this.scrollingElement?.scrollTop ?? 0);
    this.articlePage?.onPageContentScroll();
    this.categoryPage?.onPageContentScroll();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (innerWidth <= 960) this.onPageContentScroll();
  }

  private get scrollingElement(): HTMLElement | undefined {
    return innerWidth <= 960 ? document.scrollingElement as HTMLElement : this.pageContent?.nativeElement;
  }

  skipToTarget(event: Event): void {
    event.preventDefault();
    const target = document.getElementById('main_content');
    if (!target) return;
    this.scrollingElement?.scrollTo({ top: 0, behavior: 'instant' });
    target.focus({ preventScroll: true });
  }

  private syncPageFromLocation(): void {
    this.currentPath = location.pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
    const path = this.currentPath === '/get-started' ? '/project' : this.currentPath;
    this.isSearchPage = path === '/search.html' || path === '/search';
    this.article = articleForPath(path) ?? null;
    const category = categoryForPath(path);
    this.category = !this.article && category && path === `/${category.id}` ? category : null;
    this.relatedArticles = WIKI_ARTICLES.filter(article => article.category === this.activeCategory);
    this.notFound = !this.isSearchPage && !this.article && !this.category && path !== '/';
    this.hasSearchResults = false;
    const title = this.isSearchPage ? 'Search' : this.article?.title ?? this.category?.title ?? (this.notFound ? 'Page not found' : 'Functional Dressing for Diabetic Foot Ulcers');
    document.title = `${title} — LUT-CHINA`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', this.article?.description ?? this.category?.description ?? 'LUT-CHINA explores functional dressings for diabetic foot ulcers through synthetic biology, from defined active molecules to a four-layer design.');
    this.changeDetectorRef.markForCheck();
  }

  private afterNavigation(focus: boolean, restoredPosition?: number): void {
    clearTimeout(this.renderTimer);
    if (this.restoreFrame !== undefined) cancelAnimationFrame(this.restoreFrame);
    this.scrollingElement?.scrollTo({ top: 0, behavior: 'instant' });
    this.renderTimer = setTimeout(() => {
      if (this.isSearchPage) {
        this.searchPage?.restoreFromLocation();
        if (focus) this.searchPage?.focus();
      } else if (location.hash && this.article) {
        this.articlePage?.restoreFragment();
      } else if (location.hash) {
        let id = location.hash.slice(1);
        try { id = decodeURIComponent(id); } catch {}
        const target = document.getElementById(id);
        const container = this.scrollingElement;
        if (target && container) {
          container.scrollTo({ top: target.getBoundingClientRect().top - (innerWidth <= 960 ? 0 : container.getBoundingClientRect().top) + container.scrollTop - (innerWidth <= 960 ? 80 : 16), behavior: 'instant' });
          target.focus({ preventScroll: true });
        }
      } else if (focus && !location.hash) {
        document.getElementById('main_content')?.focus({ preventScroll: true });
      }
      this.changeDetectorRef.markForCheck();
      if (restoredPosition !== undefined) {
        // Restore after the reader has finished its own initial fragment scroll.
        this.restoreFrame = requestAnimationFrame(() => {
          this.restoreFrame = requestAnimationFrame(() => {
            this.scrollingElement?.scrollTo({ top: restoredPosition, behavior: 'instant' });
            this.restoreFrame = undefined;
          });
        });
      }
    }, 0);
  }

  private ensureHistoryKey(): string {
    const state = history.state && typeof history.state === 'object' ? history.state : {};
    if (typeof state.wikiEntry === 'string') return state.wikiEntry;
    const key = crypto.randomUUID();
    history.replaceState({ ...state, wikiEntry: key }, '', location.href);
    return key;
  }

  private syncBodyTheme(): void {
    document.body.classList.toggle('dark-mode', this.isDark);
    document.documentElement.style.colorScheme = this.isDark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', this.isDark ? '#141314' : '#fefbff');
  }
}
