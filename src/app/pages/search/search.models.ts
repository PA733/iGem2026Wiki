export interface SearchSuggestion {
  title: string;
  href: string;
  category: string;
}

export interface SearchSuggestionGroup {
  category: string;
  suggestions: SearchSuggestion[];
}

export interface SearchSuggestionPart {
  text: string;
  match: boolean;
}
