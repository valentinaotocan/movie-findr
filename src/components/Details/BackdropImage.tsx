import defaultBackdropL from "../../assets/images/defaultImgBackdrop-large.jpg";
import defaultBackdropS from "../../assets/images/defaultImgBackdrop-smaller.jpg";
import { BackdropImageProps } from "../../types";

function BackdropImage({ backdrop_path }: BackdropImageProps) {
  return (
    <picture>
      <source
        media="(min-width: 781px)"
        srcSet={
          backdrop_path
            ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
            : defaultBackdropL
        }
      />
      <source
        media="(min-width: 501px) and (max-width: 780px)"
        srcSet={
          backdrop_path
            ? `https://image.tmdb.org/t/p/w780/${backdrop_path}`
            : defaultBackdropS
        }
      />
      <source
        media="(max-width: 500px)"
        srcSet={
          backdrop_path
            ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
            : defaultBackdropS
        }
      />
      <img
        src={
          backdrop_path
            ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
            : defaultBackdropL
        }
        alt="Image"
        className="h-[28.125rem] w-full object-cover md:h-[15.625rem]"
      />
    </picture>
  );
}

export default BackdropImage;
