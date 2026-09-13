import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { FoundationArticleComponent } from './pages/foundations/foundation-article.component';
import { FoundationArticleKey } from './pages/foundations/foundation-article.models';
import { foundationArticleKeyForPath } from './pages/foundations/foundation-article.routes';
import { HomePageComponent } from './pages/home/home-page.component';
import { SearchPageComponent } from './pages/search/search-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [NavigationComponent, HomePageComponent, SearchPageComponent, FoundationArticleComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('pageContent') private pageContent?: ElementRef<HTMLElement>;
  @ViewChild(NavigationComponent) private navigation?: NavigationComponent;
  @ViewChild(HomePageComponent) private homePage?: HomePageComponent;
  @ViewChild(SearchPageComponent) private searchPage?: SearchPageComponent;
  @ViewChild(FoundationArticleComponent) private articlePage?: FoundationArticleComponent;

  isDark = false;
  animationsPaused = false;
  isSearchPage = false;
  articleKey: FoundationArticleKey | null = null;
  hasSearchResults = false;
  private searchFocusTimer?: ReturnType<typeof setTimeout>;

  get isArticlePage(): boolean {
    return this.articleKey !== null;
  }

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    this.syncPageFromLocation();
    this.isDark = window.localStorage.getItem('current_mode') === 'dark';
    this.animationsPaused = window.localStorage.getItem('current_animation') === 'pause';
    this.syncBodyTheme();
    this.updateDocumentTitle();
  }

  ngOnDestroy(): void {
    this.cancelSearchFocus();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('current_mode', this.isDark ? 'dark' : 'light');
    }
    this.syncBodyTheme();
  }

  toggleAnimations(): void {
    this.animationsPaused = !this.animationsPaused;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('current_animation', this.animationsPaused ? 'pause' : 'play');
    }
  }

  openSearch(event?: Event): void {
    event?.preventDefault();
    this.navigation?.closeMenus();
    this.articleKey = null;
    this.scrollToTop();
    this.isSearchPage = true;
    this.updateUrl('/search.html');
    this.updateDocumentTitle();
    // Move focus after Angular has made the search view visible.
    this.cancelSearchFocus();
    this.searchFocusTimer = setTimeout(() => {
      this.searchPage?.focus();
      this.searchFocusTimer = undefined;
    }, 0);
  }

  openArticle(event: Event, path: string): void {
    const articleKey = foundationArticleKeyForPath(path);
    if (!articleKey) return;
    event.preventDefault();
    this.cancelSearchFocus();
    this.navigation?.closeMenus(true);
    this.isSearchPage = false;
    this.searchPage?.reset();
    this.articleKey = articleKey;
    this.updateUrl(path);
    this.updateDocumentTitle();
    this.scrollToTop();
  }

  onPageContentScroll(): void {
    this.articlePage?.onPageContentScroll();
  }

  skipToTarget(event: Event): void {
    event.preventDefault();
    if (typeof document === 'undefined') return;
    const target = document.getElementById('main_content') ?? document.getElementById('main-content');
    if (!target) return;
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', `${window.location.pathname}#main_content`);
    }
    this.pageContent?.nativeElement.scrollTo({ top: target.offsetTop, behavior: 'auto' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }

  scrollHome(event: Event): void {
    event.preventDefault();
    this.cancelSearchFocus();
    this.navigation?.closeDesktopSubmenu(false);
    if (this.isSearchPage || this.isArticlePage) {
      this.isSearchPage = false;
      this.articleKey = null;
      this.searchPage?.reset();
      this.updateUrl('/');
      this.updateDocumentTitle();
    }
    this.scrollToTop();
  }

  @HostListener('window:popstate')
  onPopState(): void {
    if (typeof window === 'undefined') return;
    const wasHome = !this.isSearchPage && !this.isArticlePage;
    this.cancelSearchFocus();
    this.syncPageFromLocation();
    this.navigation?.closeMenus(true);
    this.searchPage?.reset();
    this.scrollToTop();
    this.updateDocumentTitle();
    // A history entry within Home still reapplies the animation preference.
    if (wasHome && !this.isSearchPage && !this.isArticlePage) {
      this.homePage?.restartVideo();
    }
  }

  private syncPageFromLocation(): void {
    this.isSearchPage = window.location.pathname.endsWith('/search.html');
    this.articleKey = foundationArticleKeyForPath(window.location.pathname);
  }

  private scrollToTop(): void {
    this.pageContent?.nativeElement.scrollTo({ top: 0, behavior: 'auto' });
  }

  private cancelSearchFocus(): void {
    clearTimeout(this.searchFocusTimer);
    this.searchFocusTimer = undefined;
  }

  private updateUrl(path: string): void {
    if (typeof window === 'undefined') return;
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
  }

  private updateDocumentTitle(): void {
    if (typeof document === 'undefined') return;
    document.title = this.isSearchPage
      ? 'Search — Material Design 3'
      : this.isArticlePage
        ? 'Accessibility overview – Material Design 3'
        : "Material Design 3 - Google's latest open source design system";
  }

  private syncBodyTheme(): void {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('dark-mode', this.isDark);
    document.documentElement.style.colorScheme = this.isDark ? 'dark' : 'light';
  }
}
