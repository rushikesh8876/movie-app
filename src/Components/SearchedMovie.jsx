import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function SearchedMovie() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const Api_key = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    
    const movieSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${encodeURIComponent(query)}&page=1`;

    fetch(movieSearchUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Search request failed");
        return res.json();
      })
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [query]); 

  if (!query) {
    return <div className="container mt-4 alert alert-warning text-center">Please enter a movie name in the search bar.</div>;
  }

  if (loading) return <div className="container mt-4 text-center text-muted">Searching...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Search Results for: "{query}"</h3>
      <div className="row g-4">
        {movies.length === 0 ? (
          <p className="text-muted ms-3">No movies found matching that title.</p>
        ) : (
          movies.map((movie) => (
            <div className="col-6 col-sm-4 col-md-3" key={movie.id}>
              <div className="card h-100 shadow-sm bg-dark text-white border-0">
                <img 
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                  className="card-img-top" 
                  alt={movie.title} 
                />
                <div className="card-body d-flex flex-column justify-content-between p-2">
                  <div>
                    <h6 className="card-title text-truncate mb-1">{movie.title}</h6>
                    <p className="text-warning small mb-2">Rating: {movie.vote_average?.toFixed(1)}</p>
                  </div>
                  <Link to={`/movie/${movie.id}`} className="btn btn-outline-info btn-sm w-100">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
