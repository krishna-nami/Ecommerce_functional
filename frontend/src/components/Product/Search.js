import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './search.css';

const Search = (props) => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else navigate('/products');
  };
  return (
    <>
      <form className="searchBox" onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="Type Product Name.."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
