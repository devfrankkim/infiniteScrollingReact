import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    let cancel;
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(cToken => (cancel = cToken))
    })
      .then(res => {
        setBooks(prevBooks => {
          return [
            // remove all the duplicates with returning unique value => new Set
            ...new Set([...prevBooks, ...res.data.docs.map(book => book.title)])
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch(e => {
        if (axios.isCancel(e)) return setError(true);
      });
    return () => cancel(); // cancel our request
  }, [query, pageNumber]);
  return { loading, error, books, hasMore };
}
