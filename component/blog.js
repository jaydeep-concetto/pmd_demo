import { useEffect, useState } from 'react';
var Meta = require('html-metadata-parser');

export default function Blog() {
  useEffect(() => {
    myFunction();
  }, []);
  return (
        <div className='col-6'>1</div>
  )
}
function myFunction() {
  Meta.parser('https://learnstartup.net/p/BJQWO5_Wnx', function (err, result) {

    console.log(result);
})
}