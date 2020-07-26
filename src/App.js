import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import PaginationLink from './components/PaginationLink';
import NewsFeed from './components/NewsFeed';
import './App.css';
import axios from 'axios';

const App = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  // set pagination state, dimulai dari page 1
  const [currentPage, setCurrenPage] = useState(1);

  // set berapa post yang diinginkan untuk setiap halaman
  const [postPerPage, setPostPerPage] = useState(10);

  // Fetching, sama seperti ComponentDidMount(), || useEffect( fetchCallBack, [])
  useEffect(() => {
    // membuat fungsi fetching data dan pengaturan state
    const fetching = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPost(res.data);
      setLoading(false);
    };

    // ini pake callback, tapi mending pake asyn
    // const fetching = () => {
    //   setLoading(true);
    //   axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
    //     setPost(res.data);
    //     console.log(res.data);
    //   });
    //   setLoading(false);
    // };

    //call the function
    fetching();
  }, []);

  // Config Pagination
  const indexLast = currentPage * postPerPage; //
  const indexFirst = indexLast - postPerPage;
  const currenPost = post.slice(indexFirst, indexLast);

  // Go To Page
  const goTo = (pageNumber) => setCurrenPage(pageNumber);

  return (
    <div className="container">
      <h1 className="text-danger">Random Post & Berita Hari ini</h1>
      <Posts post={currenPost} loading={loading} />
      <PaginationLink
        currentPage={currentPage}
        postPerPage={postPerPage}
        totalPost={post.length}
        goToPage={goTo}
      />
      <NewsFeed />
    </div>
  );
};

export default App;
