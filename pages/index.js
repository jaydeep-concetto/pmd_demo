import Head from 'next/head'
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import { useEffect, useState } from 'react';
import Blog from "../component/blog";
export default function Home() {
  const [article, setArticle] = useState([]);
  const [page, setPage] = useState(1);



  useEffect(() => {
    getData();
  }, [page]);

  const getData = async() => {

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
  console.log(data);
    setArticle([...article,...data['retrievePageArticles']]);
  }
  return (
    <div className="container">
      <div className='my-2 row'>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
        </div>
    </div>
  )
}
