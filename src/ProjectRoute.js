import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Popular from "./Components/Popular";
import TopRated from "./Components/TopRated";
import SearchedMovie from "./Components/SearchedMovie";
import SingleMovie from "./Components/SingleMovie";

const ProjectRoute = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={ <Popular/>}>
        <Route path="top-rated" element={<TopRated />} />
        <Route path="searched-movie" element={<SearchedMovie />} />
        <Route path="single-movie" element={<SingleMovie />} />
      </Route>
    </Routes>
    </Router>
  );
};

export default ProjectRoute;
