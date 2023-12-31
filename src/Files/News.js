import React, { useState, useEffect } from "react";
import Newsitem from "./Newsitem";
import "../Files/News.css";

export default function News() {
  const [news, setNews] = useState([]);
  const [searchnews, setSearchnews] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 9;

  const getNews = async () => {
    let url = await fetch(
      `https://newsapi.org/v2/everything?q=${searchnews}&sortBy=publishedAt&apiKey=66256ee4a0954c0e8b8df275b46c6e12&pageSize=${pageSize}&page=${currentPage}&q=cricket`
    );
    let jsonData = await url.json();
    setNews(jsonData.articles);
    if (jsonData.articles) {
      setTotalPages(Math.ceil(jsonData.totalResults / pageSize));
    }
  };

  useEffect(() => {
    getNews();
  }, [searchnews, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    getNews();
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const paginationButtons = [];

    if (totalPages) {
      for (let page = 1; page <= 10; page++) {
        paginationButtons.push(
          <button
            key={page}
            className={`pagination-button ${
              currentPage === page ? "active" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        );
      }
    }

    return paginationButtons;
  };

  return (
    <>
      <div className="container">
        <header className="header">
          <h1 className="header-title">The Daily Times </h1>
          
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search News"
              value={searchnews}
              onChange={(e) => setSearchnews(e.target.value)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </header>
      </div>

      {news && (
        <div className="container2">
          {/* <h2>Adfar News Channel</h2> */}
          <div className="row">
            {news.map((element, index) => (
              <div className="col-md-4" key={index}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 30) : ""}
                  description={
                    element.description ? element.description.slice(0, 300) : ""
                  }
                  image={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://ichef.bbci.co.uk/news/1024/branded_news/812D/production/_130196033_dc5bc9dea26cabf72f5fbf001ec25d7965b579af6_677_2587_14551000x563.jpg"
                  }
                  link={
                    element.url
                      ? element.url
                      : "https://www.fool.com.au/2023/07/02/2-of-the-best-etfs-for-asx-investors-to-buy-in-july/"
                  }
                />
              </div>
            ))}
          </div>
          <div className="pagination">
            <button className="pagination-button" onClick={handlePrevPage}>
              Prev
            </button>
            {renderPaginationButtons()}
            <button className="pagination-button" onClick={handleNextPage}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
