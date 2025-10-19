import React from 'react'
import { PostsData } from '../../Data/PostsData'
import "./Posts.css"
import Post from '../Post/Post'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getTimelinePosts, deletePostFromStore } from "../../actions/PostsActions";
import { useState } from 'react'
const Posts = () => {
	const dispatch = useDispatch()
	const { user } = useSelector(state => state.authReducer.authData)
	const { posts, loading } = useSelector(state => state.postReducer)
	console.log("posts", posts)


	useEffect(() => {
		dispatch(getTimelinePosts(user._id))
	}, [])
	if (!posts.length === 0) return "no posts"
	return (
		<div className='Posts'>
			{
				loading ? "Fetching Posts...." :
					posts.map((post, id) => {
						return <Post data={post} id={id}  />
					})
			}
		</div>
	)
}

export default Posts