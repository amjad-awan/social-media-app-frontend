import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { followUser, unfollowUser } from '../../actions/UserActions'
import { getImageUrl } from '../../utils/getImageUrl'
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
                
                <img src={Person?.profilePictureId?getImageUrl(Person.profilePictureId): "https://social-media-app-frontend-azure.vercel.app/images/" + "profile.jpeg"} alt="" className="followerImg" />
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