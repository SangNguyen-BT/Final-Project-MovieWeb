import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import MovieListAPI from "../../api/movieListAPI";

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const location = useLocation();
  // const query = new URLSearchParams(location.search).get("query"); // Lấy từ khóa tìm kiếm từ URL
  const params = useParams();
  const { keyword } = params;
  console.log(keyword);
  useEffect(() => {
    const searchMovies = async () => {
      if (keyword) {
        setLoading(true);
        setError(null);

        try {
          const response = await MovieListAPI.getMovieSearch(keyword);
          setMovies(response.results);
        } catch (error) {
          setError("Lỗi khi tìm kiếm phim");
        } finally {
          setLoading(false);
        }
      }
    };

    searchMovies();
  }, [keyword]);

  return (
    <div>
      <h1>Kết quả tìm kiếm cho: {keyword}</h1>

      {loading && <p>Đang tìm kiếm...</p>}
      {error && <p>{error}</p>}

      <div>
        {movies.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id} className="text-white">
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <p>Ngày phát hành: {movie.release_date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">Không tìm thấy phim nào.</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
