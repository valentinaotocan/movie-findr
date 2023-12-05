export interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

export interface CardProps {
  movies: Movie[];
}