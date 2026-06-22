import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Popular from "./Components/Popular";
import TopRated from "./Components/TopRated";
import SearchedMovie from "./Components/SearchedMovie";
import SingleMovie from "./Components/SingleMovie";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/"element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/searched-movie" element={<SearchedMovie />} />
        <Route path="/movie/:id" element={<SingleMovie />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}
