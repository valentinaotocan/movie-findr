export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  movie_id: string;
}

export interface CardProps {
  movies: Movie[];
}

export interface SearchInputProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export interface SearchSuggestionsProps {
  loading: boolean;
  error: boolean;
  suggestionsWithImg: Movie[];
  handleSelect: (selectedItem: string) => void;
  handleSeeAllResults: () => void;
  searchTerm: string;
}