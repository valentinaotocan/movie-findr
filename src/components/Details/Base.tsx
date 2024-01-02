import { Movie } from "../../types"

function Base({title, release_date}: Movie) {
  const year = release_date ? release_date.slice(0, 4) : "/";

  return (
    <>
      <h1>{title}</h1>
      <p className="text-lg pl-2">({year})</p>
    </>
  );
}

export default Base