export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  movie_id: number;
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

export interface FavoriteContextType {
  favorites: Movie[];
  favoritesChecker: (movie: Movie) => boolean;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movie: Movie) => void;
}
