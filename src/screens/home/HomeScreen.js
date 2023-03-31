import React from "react";
import Banner from "../../components/banner/Banner";
import "./HomeScreen.css";
import Nav from "../../components/nav/Nav";
import requests from "../../Request";
import Row from "../../components/row/Row";

function HomeScreen() {
  const rows = [
    {
      title: "NETFLİX Originals",
      fetchUrl: requests.fetchNetflixOriginals,
      isLargeRow: true,
    },
    { title: "Trending Now", fetchUrl: requests.fetchTrending },
    { title: "Top Rated", fetchUrl: requests.fetchTopRated },
    { title: "Action Movies", fetchUrl: requests.fetchActionMovies },
    { title: "Comedy Movies", fetchUrl: requests.fetchComedyMovies },
    { title: "Horror Movies", fetchUrl: requests.fetchHorrorMovies },
    { title: "Romance Movies", fetchUrl: requests.fetchRomanceMovies },
    { title: "Documentaries", fetchUrl: requests.fetchDocumentaries },
  ];
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      {rows.map((row, index) => (
        <Row
          key={index}
          title={row.title}
          fetchUrl={row.fetchUrl}
          isLargeRow={row.isLargeRow}
        />
      ))}
    </div>
  );
}

export default HomeScreen;
