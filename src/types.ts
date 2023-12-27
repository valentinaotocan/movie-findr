export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  movie_id: number;
}

export interface MovieDetails {
  backdrop_path: string;
  budget: number;
  revenue: number;
  genres: {
    name: string;
  }[];
  overview: string;
  popularity: number;
  poster_path: string;
  production_countries: {
    name: string;
  }[];
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
  credits: {
    cast: {
      original_name: string;
      character: string;
      id: number;
    }[];
    crew: {
      name: string;
      job: string;
    }[];
  };
  similar: {
    results: {
      poster_path: string;
    }[];
  };
  videos?: {
    results?: {
      key: string;
      site: string;
      type: string;
      id: string;
    }[];
  };
}

export interface CardProps {
  movies: Movie[];
  layout: string;
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

export interface FilterGenreProps {
  genres: { id: number; name: string }[];
  selectedGenres: number[];
  onGenreChange: (genreId: number[]) => void;
  isOpen: boolean;
  toggleDropdown: () => void;
}

export interface FilterRuntimeProps {
  selectedRuntime: number | null;
  onRuntimeChange: (runtime: number | null) => void;
  isOpen: boolean;
  toggleDropdown: () => void;
}

export interface FilterRatingProps {
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
  isOpen: boolean;
  toggleDropdown: () => void;
}

export interface FilterSortByProps {
  selectedSortBy: string;
  handleSortBy: (value: string) => void;
}

export interface UseFetchGenresProps {
  endpoint: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface FavoriteContextType {
  favorites: Movie[];
  favoritesChecker: (movie: Movie) => boolean;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movie: Movie) => void;
}
