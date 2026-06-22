import React, {useEffect, useState} from 'react'
import axios from "axios";
import { Link } from 'react-router';

export default function TopRated() {
  const [data, setData] = useState({ results: [], total_pages: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const API_KEY = "7969f5b51a4e6390b0a1b7d0b7cfacd6";

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`,
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        window.scrollTo(0, 0);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, [currentPage]);

  return (
    <>
    <h1>Top Rated</h1>
    <div className="movie-grid">
          {data.results &&
            data.results.map((movie) => (
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div
                className="movie"
                key={movie.id}
                style={{ marginBottom: "20px" }}
              >
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
                <h2>{movie.title}</h2>
                <p>Rating: {movie.vote_average}</p>
              </div>
              </Link>
            ))}
        </div>
         <div
        className="pagination"
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
        }}
      >
        
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        {/* Example: Showing first 10 pages only to avoid a massive row of buttons */}
        {[...Array(Math.min(data.total_pages, 10))].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              fontWeight: currentPage === index + 1 ? "bold" : "normal",
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === data.total_pages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  )
}
