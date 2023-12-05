import { CardProps } from "../types"

function Card({movies}: CardProps) {
  return (
    <div className="overflow-x-auto flex flex-nowrap">
      <div className="flex gap-3.5">
        {movies.map((movie) => (
          <div key={movie.id} className="w-[190px] h-[270px] flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Card