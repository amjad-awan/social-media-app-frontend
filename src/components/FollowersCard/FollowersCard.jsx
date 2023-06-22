import React from "react";
import "./FollowersCard.css";
import { Followers } from "../../Data/FollowersData";
import User from "../User/User";
import { useSelector } from "react-redux"
import { useState } from "react";
import { useEffect } from "react";
import { getAllUser } from "../../api/UserRequest";
const FollowersCard = () => {
  const [persons, setPersons] = useState([])
  const { user } = useSelector(state => state.authReducer.authData)
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser()
      console.log("data 15", data)
      setPersons(data)
    }
    fetchPersons()
  }, [])
  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {persons.map((Person, id) => {
        if (Person._id !== user._id) {
          return (
            <User Person={Person} key={id} />
          );
        }
      })}
    </div>
  );
};

export default FollowersCard;
