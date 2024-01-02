import notFound from '../assets/images/404.png';

function NotFound() {
  return (
    <section className="flex flex-col items-center text-center px-custom pt-8">
      <div className="max-w-[28rem]">
        <img src={notFound} alt="Error 404" />
      </div>
      <p className="text-yellow-400 pt-5">Page not found.</p>
      <p className="text-yellow-400 pt-5">
        The page you are looking for doesn't exist.
      </p>
    </section>
  );
}

export default NotFound;
