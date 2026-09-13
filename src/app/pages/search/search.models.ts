export interface SearchSuggestion {
  title: string;
  subtitle: string;
  href: string;
  category: string;
  description: string;
  text: string;
}

export interface SearchResult extends SearchSuggestion {
  snippet: string;
}

export interface SearchSuggestionGroup {
  category: string;
  suggestions: SearchResult[];
}

export interface SearchSuggestionPart {
  text: string;
  match: boolean;
}
