import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userURL } from '../../Base/Constent';
import axios from 'axios';

function SearchBarPage() {
  const { query } = useParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    axios.get(`${userURL}/product/${query}`)
      .then((response) => setResults(response.data))
      .catch((error) => console.error(error));
  }, [query]);

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{results.productName}</h2>
      {/* Display other details of the search result */}
    </div>
  );
}

export default SearchBarPage;
