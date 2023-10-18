import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "../../../axios";
import User from "../../userComponent/User";
const Home = () => {
  const [query, setQuery] = useState("");
  //Users fetched from the API
  const [users, setUsers] = useState([]);
  //Page
  const [page, setPage] = useState(1);
  //Per page
  const [limit, setLimit] = useState(5);

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() !== "") {
        handleSearchUsers();
    }
  };
  


  const handlePrevPage = () => {
    setPage((page) => {
      if (page === 1) return page;
      else return page - 1;
    });
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  const handlePageLimit = (e) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`/search/users?q=${query}`, {
        params: {
          sort: "followers",
          per_page: limit,
        },
      });
      return data?.items
    } catch (error) {
      return 
    }
  };
  const handleSearchUsers = async () => {
    if (query) {
      const items = await fetchUsers();
      setUsers(items);
    } else {
       return
    }
  };

  useEffect(() => {
    const displayUsersOnChange = async () => {
      if (query) {
        const items = await fetchUsers();
        setUsers(items);
      }
    };
    setTimeout(() => {
      displayUsersOnChange();
    }, 1000);
   
  }, [page, limit]);

  return (
    <div className="container">
      <div className="search-form">
        <h2>GitHub User Search</h2>
        <form>
          <input value={query} onChange={handleQueryInput} type="text" />
        </form>
      </div>
      <div className="search-results">
        <div className="more-options">
          <label>
            <small>Per Page</small>
            <select className="ml10" onChange={handlePageLimit}>
              <option value="5">5</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
          <div className="pagination">
            <button onClick={handlePrevPage}>{page}</button>
            <button onClick={handleNextPage}>{page + 1}</button>
          </div>
        </div>
        {users?.length >0 ? (
          users.map((user) => (
            <User user={user} key={user.id} />
          ))
        ) : (
          <h2>There is nothing to display...</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
