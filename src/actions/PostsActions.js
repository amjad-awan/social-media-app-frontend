import * as PostsApi from "../api/PostsRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const deletePost = (id, userId) => async (dispatch) => {
  try {
    await PostsApi.deletePost(id, userId);
    dispatch({ type: "DELETE_POST", data: id });
  } catch (error) {
    console.log(error);
  }
};
