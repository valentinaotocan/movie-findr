export interface Movie {
  id?: string;
  title: string;
  poster_path?: string;
  release_date: string;
}

// Favorite
export interface FavoriteContextType {
  favorites: Movie[];
  favoritesChecker: (movie: Movie) => boolean;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movie: Movie) => void;
}

// Detail Page
export interface BackdropImageProps {
  backdrop_path: string | null;
}

export interface RolesProps {
  credits: {
    cast: {
      original_name: string;
      character: string;
      id: number;
    }[];
  };
}

export interface TrailerProps {
  videos: {
    key: string;
    type: string;
  }[];
}

export interface MovieDetails {
  vote_average: number;
  popularity: number;
  genres: { name: string }[];
  runtime: number;
  budget: number;
  revenue: number;
  credits: {
    crew: { job: string; name: string }[];
  }
  production_countries: { name: string }[];
}

export interface FavoriteProps {
  movie: Movie;
}

export interface InfoListsProps {
  details: MovieDetails;
  borderLastItem: boolean;
}

// Common components
export interface CardProps {
  movies: Movie[];
  layout: string;
  height?: string;
}

export interface DropdownProps {
  isOpen: boolean;
  label: string;
  toggle: () => void;
  className?: string;
}

// Search
export interface SearchInputProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export interface SearchSuggestionsProps {
  isLoading: boolean;
  error: boolean;
  suggestionsWithImg: Movie[];
  handleSelect: (selectedItem: string) => void;
  handleSeeAllResults: () => void;
  searchTerm: string;
}

// 
export interface Genre {
  id: number;
  name: string;
}

// Filter
export interface FilterProps<T> {
  selectedValue: T;
  onChange: (value: T) => void;
  isOpen: boolean;
  toggleDropdown: () => void;
}

export interface GenreProps extends FilterProps<number[]> {
  genres: Genre[];
}

export interface SortByProps {
  selectedSortBy: string;
  handleSortBy: (value: string) => void;
}