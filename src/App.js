import React, { useState, useRef, useCallback } from "react";
import useBookSearch from "../src/useBookSearch";

export default function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  // useBookSearch(query, pageNumber);
  // No stored anywhere yet so need to store these inside of state
  const { books, hasMore, loading, error } = useBookSearch(query, pageNumber);
  const observer = useRef();
  // default is null so we need to check with 'observer.current'
  const lastBookElementRef = useCallback(
    node => {
      if (loading) return;
      // going to re-connect it
      if (observer.current) observer.current.disconnect();
      // this is going to take in a function and this function takes all the entries that are available
      // so everything that it's watching is going to be in the entries array as soon as they become visible
      observer.current = new IntersectionObserver(entries => {
        // It's on the page somewhere
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
          console.log("Visible");
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    setQuery(e.target.value);
    // the value of whatever is in the search box
    setPageNumber(1); // ex)go back to page 1 when refreshing.
  }

  return (
    <>
      <div>
        <input type="text" value={query} onChange={handleSearch}></input>
        {books.map((book, index) => {
          //last book
          if (books.length === index + 1) {
            return (
              <div ref={lastBookElementRef} key={book}>
                {book}
              </div>
            );
          } else {
            return <div key={book}>{book}</div>;
          }
        })}
        <div>{loading && "Loading...."}</div>
        <div>{error && "ERROR"}</div>
      </div>
    </>
  );
}
