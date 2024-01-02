export const genreQueryParam = (genres: number[]) => {
  return genres.length > 0 ? { with_genres: genres.join(",") } : {};
};

export const runtimeQueryParam = (runtime: number) => {
  if (runtime === 60) return { "with_runtime.lte": 60 };
  if (runtime === 120)
    return { "with_runtime.lte": 120, "with_runtime.gte": 61 };
  if (runtime > 120) return { "with_runtime.gte": 121 };
  return {};
};

export const ratingQueryParam = (rating: number) => {
  if (rating === 0) return {};
  if (rating === 5) return { "vote_average.lte": 5 };
  if (rating === 5.1) return { "vote_average.gte": 5.1 };
  if (rating === 9) return { "vote_average.gte": 9 };
  return {};
};
