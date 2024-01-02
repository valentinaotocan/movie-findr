import { InfoListsProps } from "../../types";

function InfoLists ({details, borderLastItem}: InfoListsProps) {

  const director = details.credits.crew.find((member) => member.job === "Director");

  const productionCountry = details.production_countries
    ?.map((country) => country.name)
    .join(", ");

  const detailInfos = [
    { label: "Rating", value: details.vote_average.toFixed(2) },
    { label: "Popularity", value: details.popularity.toFixed(2) },
    {
      label: "Genres",
      value: details.genres.map((genre) => genre.name).join(", "),
    },
    { label: "Runtime", value: `${details.runtime}'` },
    { label: "Production country", value: productionCountry },
    { label: "Director", value: director?.name },
    { label: "Budget", value: `${details.budget.toLocaleString("de-DE")}$` },
    { label: "Revenue", value: `${details.revenue.toLocaleString("de-DE")}$` },
  ];
  
  return (
    <>
      {detailInfos.map((info, index) => (
        <div
          className={`mb-4 pb-4 ${
            !borderLastItem && index === detailInfos.length - 1
              ? ""
              : "border-b border-gray-900"
          }`}
          key={index}
        >
          <h2 className="pb-2">{info.label}</h2>
          <p>{info.value || "No data available"}</p>
        </div>
      ))}
    </>
  );
}

export default InfoLists