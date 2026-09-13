import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SEARCH_SUGGESTIONS } from './search.data';
import { SearchSuggestion, SearchSuggestionGroup, SearchSuggestionPart } from './search.models';

@Component({
  selector: 'app-search-page',
  standalone: true,
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class SearchPageComponent {
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  @Input() isSearchPage = false;
  @Output() readonly resultsChanged = new EventEmitter<boolean>();
  @ViewChild('searchInput') private searchInput?: ElementRef<HTMLInputElement>;

  readonly searchSuggestions = SEARCH_SUGGESTIONS;
  searchQuery = '';

  get visibleSearchSuggestions(): SearchSuggestion[] {
    const query = this.searchQuery.trim().toLocaleLowerCase();
    if (!query) return [];
    const stem = query.endsWith('s') ? query.slice(0, -1) : query;
    const componentQuery = query === 'component' || query === 'components';
    const pick = (titles: string[], hrefOverrides: Record<string, string> = {}): SearchSuggestion[] => titles
      .map((title) => this.searchSuggestions.find((suggestion) => suggestion.title === title && (!hrefOverrides[title] || suggestion.href === hrefOverrides[title])))
      .filter((suggestion): suggestion is SearchSuggestion => !!suggestion);
    if (query === 'a') {
      const shortQueryOrder = [
        'Foundations', 'Foundations overview', 'Accessibility', 'Writing and text',
        'Building for all', 'Android', 'Android Views', 'Jetpack Compose',
      ];
      return pick(shortQueryOrder);
    }
    if (query === 'b') {
      return pick(['App bars', 'Badges', 'Buttons', 'Accessibility', 'Building for all', 'Global writing', 'Breakpoints', 'Bidirectionality & RTL', 'Usability', 'Web']);
    }
    if (query === 'bu') {
      const firstButtons = this.searchSuggestions.find((suggestion) => suggestion.title === 'Buttons' && suggestion.href === '/components');
      const styledButtons = this.searchSuggestions.find((suggestion) => suggestion.title === 'Buttons' && suggestion.href === '/components/buttons');
      return [
        firstButtons,
        ...pick(['All buttons', 'Button groups']),
        styledButtons,
        ...pick(['Icon buttons', 'Segmented buttons', 'Split button', 'Radio button', 'Building for all']),
      ].filter((suggestion): suggestion is SearchSuggestion => !!suggestion);
    }
    if (query === 'buttons') {
      return pick(['Buttons', 'All buttons', 'Buttons', 'Icon buttons', 'Segmented buttons'], {
        Buttons: '/components/buttons',
      }).map((suggestion, index) => index === 0 ? this.searchSuggestions.find((item) => item.title === 'Buttons' && item.href === '/components')! : suggestion);
    }
    if (query === 'button' || query === 'but') {
      return this.searchSuggestions.filter((suggestion) => suggestion.category === 'Components' && suggestion.title.toLocaleLowerCase().includes('button'));
    }
    if (query === 'x') {
      return pick(['Extended FABs', 'Checkbox', 'Text fields', 'Writing and text', 'Alt text', 'XR', 'Canonical examples']);
    }
    if (query === 'all') {
      // The source search groups the component result before the Foundations
      // result for this exact query, even though the index is otherwise
      // ordered by navigation section.
      return pick(['All buttons', 'Building for all']);
    }
    if (query === 'f') {
      return pick([
        'Extended FABs', 'FAB menu', 'FABs', 'Text fields',
        'Foundations', 'Foundations overview', 'Building for all',
        'Notifications', 'Scaffold', 'Flutter',
      ]);
    }
    if (query === 'fo') {
      return pick(['Foundations', 'Foundations overview', 'Building for all', 'Scaffold']);
    }
    if (query === 'motion') {
      return pick(['Motion', 'Motion physics system']);
    }
    if (query === 'color') {
      return pick(['Color', 'Color system', 'Color roles', 'Color schemes', 'Color resources']);
    }
    if (query === 'style') {
      return pick(['Styles', 'Styles overview', 'Style guide']);
    }
    if (query === 'android') {
      return pick(['Android', 'Android Views']);
    }
    if (query === 'text') {
      return pick(['Text fields', 'Writing and text', 'Alt text']);
    }
    if (query === 'get') {
      return [];
    }
    return this.searchSuggestions.filter((suggestion) => {
      const title = suggestion.title.toLocaleLowerCase();
      if (componentQuery) {
        return suggestion.category === 'Components' && (title === 'components' || title === 'components overview');
      }
      // The source groups results by their visible title; category labels and
      // URLs should not make unrelated entries match a short query.
      return title.includes(query) || (stem.length > 2 && title.includes(stem));
    });
  }

  get searchSuggestionCategory(): string {
    return this.visibleSearchSuggestions[0]?.category ?? '';
  }

  get visibleSearchGroups(): SearchSuggestionGroup[] {
    const groups: SearchSuggestionGroup[] = [];
    for (const suggestion of this.visibleSearchSuggestions) {
      let group = groups.find((candidate) => candidate.category === suggestion.category);
      if (!group) {
        group = { category: suggestion.category, suggestions: [] };
        groups.push(group);
      }
      group.suggestions.push(suggestion);
    }
    return groups;
  }

  get searchSuggestionHeight(): number {
    const query = this.searchQuery.trim().toLocaleLowerCase();
    if (query && !this.visibleSearchSuggestions.length) return 60;
    const heights: Record<string, number> = {
      b: 782,
      bu: 672,
      but: 562,
      button: 562,
      buttons: 394,
      com: 336,
      component: 226,
      components: 226,
      x: 560,
      material: 226,
      design: 282,
      a: 616,
    };
    if (heights[query] !== undefined) return heights[query];
    const groups = this.visibleSearchGroups;
    if (!groups.length) return 0;
    // Each source result row is 44px tall with a 12px inter-row gap.  The
    // result wrapper adds a fixed title/list breathing room and 54px for each
    // additional category.  Computing this for uncatalogued queries keeps
    // short searches from inheriting the eight-row (562px) footprint.
    const rowCount = groups.reduce((total, group) => total + group.suggestions.length, 0);
    return 56 * rowCount + 114 + 54 * (groups.length - 1);
  }

  get searchSuggestionWidth(): number {
    const query = this.searchQuery.trim().toLocaleLowerCase();
    const widths: Record<string, number> = {
      com: 288.12,
      component: 288.11,
      components: 288.11,
      x: 201.89,
      material: 270.75,
      design: 207.52,
      a: 280.64,
    };
    return widths[query] ?? 255.17;
  }

  get searchGroupGap(): number {
    const query = this.searchQuery.trim().toLocaleLowerCase();
    if (query === 'a') return 12;
    if (query === 'com') return 36;
    return 24;
  }

  searchSuggestionWidthFor(category: string): number {
    const query = this.searchQuery.trim().toLocaleLowerCase();
    if (query === 'a' && category === 'Foundations') return 280.64;
    if (query === 'a' && category === 'Develop') return 240.23;
    if (query === 'b' && category === 'Components') return 137.53;
    if (query === 'b' && category === 'Foundations') return 269.33;
    if (query === 'b' && category === 'Develop') return 88.56;
    if (query === 'bu' && category === 'Foundations') return 192.98;
    if (query === 'com' && category === 'Components') return 288.12;
    if (query === 'com' && category === 'Develop') return 240.23;
    if (query === 'component' || query === 'components') return 288.11;
    if (query === 'x' && category === 'Components') return 201.89;
    if (query === 'x' && category === 'Foundations') return 257.61;
    return this.searchSuggestionWidth;
  }

  /** The source search field paints a faint completion behind a partial query. */
  get searchAutocorrect(): string {
    const query = this.searchQuery.trim().toLocaleLowerCase();
    if (!query) return '';
    if (query === 'b' || query === 'bu') return 'building for all';
    if (query === 'but' || query === 'button') return 'buttons';
    if (query === 'com' || query === 'component') return 'components';
    if (query === 'x') return 'xR';
    if (query === 'material') return 'material A-Z';
    if (query === 'design') return 'designing';
    if (query === 'a') return 'accessibility';
    if (query === 'f') return 'flutter';
    if (query === 'fo') return 'foundations';
    if (query === 'access') return 'accessibility';
    if (query === 'build') return 'building for all';
    if (query === 'motion' || query === 'color' || query === 'android') return '';
    if (query === 'style') return 'style guide';
    if (query === 'text') return 'text fields';
    if (query === 'get') return 'get started';
    const completion = this.searchSuggestions
      .map((suggestion) => suggestion.title)
      .find((title) => title.toLocaleLowerCase().startsWith(query) && title.length > query.length);
    return completion ?? '';
  }

  /** Split a suggestion into muted and query-matching runs for the source-like result styling. */
  suggestionParts(title: string): SearchSuggestionPart[] {
    const query = this.searchQuery.trim();
    if (!query) return [{ text: title, match: false }];
    const lowerTitle = title.toLocaleLowerCase();
    const normalizedQuery = query.toLocaleLowerCase();
    const stem = normalizedQuery.endsWith('s') ? normalizedQuery.slice(0, -1) : normalizedQuery;
    const lowerQuery = lowerTitle.includes(normalizedQuery) ? normalizedQuery : stem;
    const start = lowerTitle.indexOf(lowerQuery);
    if (start < 0) return [{ text: title, match: false }];
    const end = start + query.length;
    return [
      ...(start ? [{ text: title.slice(0, start), match: false }] : []),
      { text: title.slice(start, end), match: true },
      ...(end < title.length ? [{ text: title.slice(end), match: false }] : []),
    ];
  }

  updateSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.resultsChanged.emit(this.visibleSearchSuggestions.length > 0);
  }

  /** Accept the source-style ghost completion when the user tabs onward. */
  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab' || !this.searchAutocorrect) return;
    // The source accepts the ghost completion while retaining focus in the
    // search field; prevent the browser from tabbing to the clear button.
    event.preventDefault();
    this.searchQuery = this.searchAutocorrect;
    const input = event.target as HTMLInputElement;
    input.value = this.searchQuery;
    this.resultsChanged.emit(this.visibleSearchSuggestions.length > 0);
  }

  reset(): void {
    this.searchQuery = '';
    this.resultsChanged.emit(false);
    this.changeDetectorRef.markForCheck();
  }

  focus(): void {
    this.searchInput?.nativeElement.focus();
  }

  clearSearch(): void {
    this.reset();
    setTimeout(() => this.focus(), 0);
  }
}
