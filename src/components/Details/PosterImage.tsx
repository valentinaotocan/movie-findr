import defaultImgPoster from "../../assets/images/defaultImgPoster.jpg";
import { Movie } from "../../types";

function PosterImage({ poster_path, title }: Movie) {
  return (
    <img
      src={
        poster_path
          ? `https://image.tmdb.org/t/p/w500/${poster_path}`
          : defaultImgPoster
      }
      alt={title || "Default Image"}
      className="rounded"
    />
  );
}

export default PosterImage;
