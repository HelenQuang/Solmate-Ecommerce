import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBox: React.FC = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const submitSearchHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitSearchHandler} className="nav-search-form">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className=" nav-search mt-0"
      ></input>

      <button type="submit" className="btn-header">
        <IoSearchOutline />
      </button>
    </Form>
  );
};

export default SearchBox;
