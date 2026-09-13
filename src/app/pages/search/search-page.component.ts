import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SEARCH_SUGGESTIONS } from './search.data';
import { SearchResult, SearchSuggestionGroup, SearchSuggestionPart } from './search.models';

@Component({
  selector: 'app-search-page',
  standalone: true,
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class SearchPageComponent implements OnInit, OnChanges {
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  @Input() isSearchPage = false;
  @Output() readonly resultsChanged = new EventEmitter<boolean>();
  @ViewChild('searchInput') private searchInput?: ElementRef<HTMLInputElement>;
  @ViewChildren('searchResult') private searchResults?: QueryList<ElementRef<HTMLAnchorElement>>;

  readonly suggestedQueries = ['Lobetyolin', 'Dressing', 'Human Practices'];
  searchQuery = '';
  visibleSearchSuggestions: SearchResult[] = [];
  visibleSearchGroups: SearchSuggestionGroup[] = [];
  private queryTerms: string[] = [];

  get hasQuery(): boolean {
    return this.queryTerms.length > 0;
  }

  ngOnInit(): void {
    if (this.isSearchPage) this.restoreFromLocation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isSearchPage']?.currentValue && !changes['isSearchPage'].firstChange) {
      this.restoreFromLocation();
    }
  }

  /** Restore a direct search URL, or an existing component after history navigation. */
  restoreFromLocation(): void {
    if (typeof window === 'undefined') return;
    this.searchQuery = (new URL(window.location.href).searchParams.get('q') ?? '').slice(0, 200);
    this.filterResults();
    this.changeDetectorRef.markForCheck();
    // Initial results also update the parent without changing it mid-render.
    queueMicrotask(() => this.resultsChanged.emit(this.visibleSearchSuggestions.length > 0));
  }

  updateSearch(event: Event): void {
    this.setQuery((event.target as HTMLInputElement).value);
  }

  useSuggestedQuery(query: string): void {
    this.setQuery(query);
    this.focus();
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.isComposing) return;
    const firstResult = this.searchResults?.first?.nativeElement;
    if (event.key === 'ArrowDown' && firstResult) {
      event.preventDefault();
      firstResult.focus();
    } else if (event.key === 'Enter' && firstResult) {
      event.preventDefault();
      firstResult.click();
    }
  }

  onResultKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    const links = this.searchResults?.toArray().map((result) => result.nativeElement) ?? [];
    const index = links.indexOf(event.currentTarget as HTMLAnchorElement);
    const nextIndex = index + (event.key === 'ArrowDown' ? 1 : -1);
    if (nextIndex < 0) {
      event.preventDefault();
      this.focus();
    } else if (links[nextIndex]) {
      event.preventDefault();
      links[nextIndex].focus();
    }
  }

  /** Highlight literal search terms without injecting HTML. */
  suggestionParts(text: string): SearchSuggestionPart[] {
    if (!this.queryTerms.length) return [{ text, match: false }];
    const normalized = text.toLocaleLowerCase();
    const matches: Array<{ start: number; end: number }> = [];
    for (const term of this.queryTerms) {
      let start = normalized.indexOf(term);
      while (start !== -1) {
        matches.push({ start, end: start + term.length });
        start = normalized.indexOf(term, start + term.length);
      }
    }
    if (!matches.length) return [{ text, match: false }];
    matches.sort((left, right) => left.start - right.start);
    const merged: Array<{ start: number; end: number }> = [];
    for (const match of matches) {
      const previous = merged[merged.length - 1];
      if (previous && match.start <= previous.end) previous.end = Math.max(previous.end, match.end);
      else merged.push({ ...match });
    }
    const parts: SearchSuggestionPart[] = [];
    let cursor = 0;
    for (const match of merged) {
      if (match.start > cursor) parts.push({ text: text.slice(cursor, match.start), match: false });
      parts.push({ text: text.slice(match.start, match.end), match: true });
      cursor = match.end;
    }
    if (cursor < text.length) parts.push({ text: text.slice(cursor), match: false });
    return parts;
  }

  /** Reset component state without overwriting the previous search history entry. */
  reset(): void {
    this.searchQuery = '';
    this.filterResults();
    this.resultsChanged.emit(false);
    this.changeDetectorRef.markForCheck();
  }

  focus(): void {
    this.searchInput?.nativeElement.focus();
  }

  clearSearch(): void {
    this.setQuery('');
    this.focus();
  }

  private setQuery(query: string): void {
    this.searchQuery = query.slice(0, 200);
    this.filterResults();
    if (typeof window !== 'undefined' && this.isSearchPage) {
      const url = new URL(window.location.href);
      if (this.searchQuery) url.searchParams.set('q', this.searchQuery);
      else url.searchParams.delete('q');
      window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
    }
    this.resultsChanged.emit(this.visibleSearchSuggestions.length > 0);
    this.changeDetectorRef.markForCheck();
  }

  private filterResults(): void {
    this.queryTerms = [...new Set(this.searchQuery.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean))];
    this.visibleSearchSuggestions = this.queryTerms.length ? SEARCH_SUGGESTIONS
      .filter((suggestion) => {
        const text = `${suggestion.category} ${suggestion.title} ${suggestion.subtitle} ${suggestion.text}`.toLocaleLowerCase();
        return this.queryTerms.every((term) => text.includes(term));
      })
      .map((suggestion) => ({ ...suggestion, snippet: this.snippetFor(suggestion.text, suggestion.description) })) : [];
    this.visibleSearchGroups = [];
    for (const suggestion of this.visibleSearchSuggestions) {
      let group = this.visibleSearchGroups.find((candidate) => candidate.category === suggestion.category);
      if (!group) {
        group = { category: suggestion.category, suggestions: [] };
        this.visibleSearchGroups.push(group);
      }
      group.suggestions.push(suggestion);
    }
  }

  private snippetFor(text: string, description: string): string {
    const normalized = text.toLocaleLowerCase();
    const matches = this.queryTerms.map((term) => normalized.indexOf(term)).filter((index) => index >= 0);
    if (!matches.length) return description;
    // Keep a complete phrase together when common words also occur earlier.
    const phrase = this.searchQuery.trim().toLocaleLowerCase().replace(/\s+/g, ' ');
    const phraseIndex = normalized.indexOf(phrase);
    const matchStart = phraseIndex >= 0 ? phraseIndex : Math.min(...matches);
    const start = Math.max(0, matchStart - 35);
    const end = Math.min(text.length, Math.max(start + 160, phraseIndex >= 0 ? phraseIndex + phrase.length : 0));
    return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`;
  }
}
