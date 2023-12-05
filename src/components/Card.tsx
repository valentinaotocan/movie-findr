import { CardProps } from "../types"

function Card({movies}: CardProps) {
  return (
    <div className="flex gap-3.5">
      {movies.map((movie) => (
        <div key={movie.id} className="w-[190px] h-[270px]">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
export default Card