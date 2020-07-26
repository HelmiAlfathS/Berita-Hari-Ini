import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        // yang ini pake fetch, yg bawah pake axios
        // const response = await fetch(`${endpoint}&page=${page}`);
        // const result = await response.json();
        // setNews((current) => {
        //   return {
        //     ...result,
        //     totalResult: result.totalResult,
        //     articles: [...current.articles, ...result.articles],
        //     status: result.status,
        //   };
        // });

        const res = await axios.get(`${endpoint}&page=${page}`);
        setNews((cur) => {
          return {
            ...defaultNews,
            articles: [...cur.articles, ...res.data.articles],
            totalResult: res.data.totalResults,
            status: res.data.status,
          };
        });
        if (res.data.status !== 'ok') {
          throw new Error('error');
          console.log(res.status);
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
            <span className="mr-3">{index + 1}.</span>{' '}
            <a href={data.url}>{data.title}</a>{' '}
          </li>
        ))}
      </ol>
      {news.articles.length < parseInt(news.totalResult) ? (
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            setPage((current) => current + 1);
          }}
        >
          Load More
        </button>
      ) : null}

      {/* <button>refresh</button> */}
    </div>
  );
};

export default NewsFeed;
