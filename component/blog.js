import { useEffect, useState } from 'react';
import styled from "styled-components";
const CustomImg = styled.div`
  height: 300px;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
`;
export default function Blog(props) {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(async () => {
    if ((props.data.url ?? '') !== '') {
      try {
        const response = await fetch(`https://jsonlink.io/api/extract?url=${props.data.url}`);
        var d = await response.json();
        if ((d.images ?? []).length > 0) {
          setImgUrl(d.images[0]);
        }
      } catch (error) {
        return [];
      }
    }
  }, [props]);
  return (
    <div className='col-4'>
      <div className='m-2 card' style={{cursor:'pointer'}} onClick={props.onTap}>
        <CustomImg className='w-100' src={imgUrl} />
        <h5 className='mx-2'>{props.data.title}</h5>
        <h6 className='mx-2'>{props.data.text}</h6>
      </div>
    </div>
  )
}