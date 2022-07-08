import Head from 'next/head'
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import { useEffect, useState } from 'react';
import Blog from "../component/blog";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [article, setArticle] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    getData();
    // window.onscroll = function (ev) {
    //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isLoading) {
    //     page = page + 1;
    //     getData();
    //   }
    // };
  }, []);
  // useEffect(() => {
  //   getData();
  // }, [page]);

  const getData = async () => {
    console.log(page);
    const { data } = await client.query({
      query: gql`
      query {
        retrievePageArticles(page: ${page}) {
          id
          author
          createdAt
          score
          updatedAt
          title
          text
          type
          url
        }
      }      
      `,
    });
    setArticle((article) => [...article, ...data['retrievePageArticles']]);
    setPage((page) => page + 1);
    setHasMore(data['retrievePageArticles'].length === 30);
  }
  return (
    <div className="container">

      <InfiniteScroll
        dataLength={article.length}
        next={getData}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      > <div className='my-2 row'>
          {article.map((data) => <Blog key={data.id} data={data} onTap={() => {
            window.open(data.url ?? '', '_blank');
          }} />)}
        </div>
      </InfiniteScroll>
    </div>
  )
}
