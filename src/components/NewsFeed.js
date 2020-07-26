import React, { useState, useEffect } from 'react';

// Initiate default state
const defaultNews = {
  status: 'ok',
  totalResult: 0,
  articles: [],
};

const endpoint =
  'https://newsapi.org/v2/top-headlines?country=id&apiKey=d4eef434bb2848cca69d497ef7eb2b42';

const NewsFeed = () => {
  // Init
  const [news, setNews] = useState(defaultNews);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${endpoint}&page=${page}`);
        const result = await response.json();
        setNews((current) => {
          return {
            ...result,
            totalResult: result.totalResult,
            articles: [...current.articles, ...result.articles],
            status: result.status,
          };
        });
        if (result.status !== 'ok') {
          throw new Error('error');
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    //call the function
    fetchData();
  }, [page]);

  if (loading) {
    return <h2>loading . . .</h2>;
  }

  return (
    <div>
      <h1>Berita Hari Ini</h1>
      {error && <p>error gan ...</p>}
      <ol className="list-group">
        {news.articles.map((data, index) => (
          <li className="list-group-item" key={index}>
            {' '}
            <a href={data.url}>{data.title}</a>{' '}
          </li>
        ))}
      </ol>
      {news.articles.length < parseInt(news.totalResults) ? (
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            setPage((current) => current + 1);
          }}
        >
          loadmore
        </button>
      ) : null}

      {/* <button>refresh</button> */}
    </div>
  );
};

export default NewsFeed;
