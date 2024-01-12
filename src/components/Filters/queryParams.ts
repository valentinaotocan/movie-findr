import { Filters } from "../../types";

const yearParam = (year: number | null) => {
  return year !== null ? { year } : {};
};

const genreParam = (genres: number[]) => {
  return genres.length > 0 ? { with_genres: genres.join(",") } : {};
};

const runtimeParam = (runtime: number | null) => {
  if (runtime === 60) return { "with_runtime.lte": 60 };
  if (runtime === 120)
    return { "with_runtime.lte": 120, "with_runtime.gte": 61 };
  if (runtime === 121) return { "with_runtime.gte": 121 };
  return {};
};

const ratingParam = (rating: number | null) => {
  if (rating === 0) return {};
  if (rating === 5) return { "vote_average.lte": 5 };
  if (rating === 5.1) return { "vote_average.gte": 5.1 };
  if (rating === 9) return { "vote_average.gte": 9 };
  return {};
};

const sortByParam = (sortBy: string) => {
  return { sort_by: `${sortBy}.desc` };
};

function queryParams(filters: Filters) {
  return {
    ...sortByParam(filters.selectedSortBy),
    ...yearParam(filters.selectedYear),
    ...genreParam(filters.selectedGenres),
    ...runtimeParam(filters.selectedRuntime),
    ...ratingParam(filters.selectedRating),
  };
}

export default queryParams;
