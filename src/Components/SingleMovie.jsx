import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const Api_key = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    if (!id || id === "undefined") return;

    setLoading(true);

    const movieDetailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${Api_key}&language=en-US`;
    const movieCastUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${Api_key}&language=en-US`;

    Promise.all([
      fetch(movieDetailUrl),
      fetch(movieCastUrl)
    ])
      .then(async ([resDetails, resCredits]) => {
        if (!resDetails.ok || !resCredits.ok) throw new Error("API call failed");
        const detailsData = await resDetails.json();
        const creditsData = await resCredits.json();
        
        setMovie(detailsData);
        setCast(creditsData.cast || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container mt-4 text-white">Loading details...</div>;
  if (!movie) return <div className="container mt-4 text-danger">Movie not found.</div>;

  return (
    <div className="container mt-4 text-white" style={{ background: "#0f172a", padding: "20px", borderRadius: "8px" }}>
      <div className="row align-items-center">
        <div className="col-md-3">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            className="img-fluid rounded border border-secondary shadow-sm"
            alt={movie.title}
          />
        </div>
        <div className="col-md-9">
          <h2 className="fw-bold">{movie.title}</h2>
          <h5 className="text-warning">Rating: {movie.vote_average?.toFixed(1)}</h5>
          <div className="d-flex gap-3 my-2 text-info small">
            <span>{movie.runtime} min</span>
            <span>{movie.genres?.map(g => g.name).join(", ")}</span>
          </div>
          <p className="text-light small">Release Date: {movie.release_date}</p>
          <h4 className="mt-4">Overview</h4>
          <p style={{ lineHeight: "1.6", color: "#dcdde1" }}>{movie.overview}</p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="border-bottom pb-2 border-secondary">Cast</h3>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-6 g-3 mt-2">
          {cast.slice(0, 6).map((actor) => (
            <div className="col text-center" key={actor.id}>
              <div className="card h-100 bg-dark text-white border-0 shadow-sm">
                <img
                  src={`https://tmdb.org${actor.profile_path}`}
                  className="card-img-top img-fluid rounded-top"
                  alt={actor.name}
                  style={{ objectFit: "cover", height: "180px" }}
                />
                <div className="p-2">
                  <p className="mb-0 fw-bold small text-truncate">{actor.name}</p>
                  <p className="mb-0 text-muted extra-small text-truncate" style={{ fontSize: "11px" }}>
                    Character: {actor.character}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
