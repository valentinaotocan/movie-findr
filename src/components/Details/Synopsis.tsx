function Synopsis({ overview }: { overview: string | null }) {
  if (overview === null) return <p>No synopsis available</p>;

  return (
    <div className="py-8">
      <h2 className="pb-3.5">Synopsis</h2>
      <p>{overview}</p>
    </div>
  );
}

export default Synopsis;
