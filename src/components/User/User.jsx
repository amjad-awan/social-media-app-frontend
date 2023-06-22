import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { followUser, unfollowUser } from '../../actions/UserActions'
const User = ({ Person }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer.authData)
    const [followers, setFollowers]=useState(Person.followers.includes(user._id))
    const handleFollow = async (personId) => {
       followers?dispatch(unfollowUser(Person._id, user)):dispatch(followUser(Person._id,user))
       setFollowers(!followers)
    }
    return (
        <div className="follower">
            <div>
                <img src={Person.profilePicture ? "http://localhost:3000/images/" + Person.profilePicture : "http://localhost:3000/images/" + Person.profilePicture} alt="" className="followerImg" />
                <div className="name">
                    <span>{Person.firstname}</span>
                    <span>{Person.username}</span>
                </div>
            </div>
            <button className={followers?"button fc-button unfollow-button":"button fc-button"}onClick={() => handleFollow(Person._id)}>
                {followers ? "Unfollow" : "Follow"}
            </button>
        </div>
    )
}

export default User