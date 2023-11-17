import React, {useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";

function SearchBar() {
  const { q } =useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const user =useSelector((store) => store.auth.user);
  const [error, setError] =useState();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (user && user.token) {
        try {
          const response = await axios.get
          (`https://medicalstore.mashupstack.com/api/medicine/search?keyword=${q}`,
            {
              headers: { Authorization: "Bearer " + user.token },
            }
          );
    
          setSearchResults(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setError("An error occurred while fetching data");
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
    
  },[q,user]);
   
  return (
    <div>
      <Navbar/>
      <h1>Search Result for "{q}"</h1>
      {loading ? (
        <p>Loading..</p>
      ):error ? (
        <p>{error}</p>
      ):(
      <div> 
        {searchResults.length === 0 ?(
          <p>No Search results found</p>
        ) : (
          <ul>
            {searchResults.filter ((result) => 
            q.trim() ==="" ? true : result.name[0]
            .toLowerCase().includes(q.toLowerCase()))
            .map((result) => (
              <li key = {result.id}>
                <strong>name: </strong> {result.name}
                <br/>
                <strong>company: </strong> {result.company}
                <br/>
                <strong>expiry_date: </strong> {result.expiry_date}
                <br/>
              </li>
            ))}
          </ul>
        )}
      </div>
      )}
    </div>
  );

        }
export default checkAuth(SearchBar);
