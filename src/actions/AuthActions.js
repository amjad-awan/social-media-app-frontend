import * as AuthApi from "../api/AuthRequests";
 
export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data });
  } catch (error) {
    console.log("Login error:", error.response?.data || error.message);

    dispatch({
      type: "AUTH_FAIL",
      error: error.response?.data?.message || "Login failed. Please try again.",
    });
  }
};


export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};


export const logOut = ()=> async(dispatch)=> {
  console.log("here 27")
  dispatch({type: "LOG_OUT"})
}