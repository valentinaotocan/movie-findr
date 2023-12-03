import filmReel from "../assets/images/film-reel.jpg";
function Home() {
  return (
    <div className="relative h-screen">
      <img
        src={filmReel}
        alt="Film Reel"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button className="bg-gray-500 text-white py-3 px-7 rounded hover:bg-yellow-500 hover:text-black">
          Discover Movies
        </button>
      </div>
    </div>
  );
}
export default Home;
