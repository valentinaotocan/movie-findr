import { RolesProps } from "../../types";

function Roles({ credits }: RolesProps) {
  return (
    <div className="pb-8">
      <h2 className="pb-3.5">Cast</h2>
      <ul className="overflow-y-auto max-h-[18.75rem]">
        {credits.cast.length > 0 ? (
          credits.cast.map((actor) => (
            <li key={actor.id}>
              {actor.original_name} as {actor.character}
            </li>
          ))
        ) : (
          <p>No cast data available</p>
        )}
      </ul>
    </div>
  );
}

export default Roles