import { TrailerProps } from "../../types";

function Trailer({videos}: TrailerProps) {

const trailer = videos.find((video) => video.type === "Trailer");

  return (
    <div className="pb-8">
      <h2 className="pb-3.5">Trailer</h2>
      {trailer ? (
        <iframe
          className="w-full aspect-video rounded"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Trailer"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Trailer not available</p>
      )}
    </div>
  );
}

export default Trailer