import jwtFetch from "./jwt";

const LIKE_PAGE_REQUEST = "LIKE_PAGE_REQUEST";
const LIKE_PAGE_SUCCESS = "LIKE_PAGE_SUCCESS";
const UNLIKE_PAGE_REQUEST = "UNLIKE_PAGE_REQUEST";
const UNLIKE_PAGE_SUCCESS = "UNLIKE_PAGE_SUCCESS";
const RECEIVE_LIKE_ERRORS = "users/RECEIVE_LIKE_ERRORS";

const likePageRequest = () => ({ 
    type: LIKE_PAGE_REQUEST 
});
//maybe action creators need changes

const likePageSuccess = (data) => ({ 
    type: LIKE_PAGE_SUCCESS, 
    payload: data 
});

const unlikePageRequest = () => ({ 
    type: UNLIKE_PAGE_REQUEST 
});

const unlikePageSuccess = (data) => ({
    type: UNLIKE_PAGE_SUCCESS, 
    payload: data 
});


const receiveErrors = (errors) => ({
    type: RECEIVE_LIKE_ERRORS,
    payload: errors,
  });

export const likePage = (pageId, userId) => async (dispatch) => {
  debugger
  dispatch(likePageRequest());
  debugger
  const res = await jwtFetch(`/api/like/${pageId}`, "POST");
  debugger
  dispatch(likePageSuccess(res));
  debugger
}

//   try {
//     const res = await jwtFetch(`/api/like/${pageId}`, "POST");
//     dispatch(likePageSuccess(res));
//   } catch (err) {
//     console.log("error status:", err.status);
//     const resBody = await err.json();
//     if (resBody.statusCode === 400) {
//         dispatch(receiveErrors(resBody.errors));
//     }
// }
// };

export const unlikePage = (pageId, userId) => async (dispatch) => {
    debugger
  dispatch(unlikePageRequest());
  const res = await jwtFetch(`/api/like/${pageId}`, "DELETE");
  dispatch(unlikePageSuccess(res));
}
//   try {
//     const res = await jwtFetch(`/api/like/${pageId}`, "DELETE");
//     dispatch(unlikePageSuccess(res));
//   } catch (err) {
//     const resBody = await err.json();
//     console.log("error status:", err.status);
//     if (resBody.statusCode === 400) {
//         dispatch(receiveErrors(resBody.errors));
//     }
// }
// };

const initialState = {
    loading: false,
    error: null,
  };
  
  export const likeReducer = (state = initialState, action) => {
    switch (action.type) {
      case LIKE_PAGE_REQUEST:
      case UNLIKE_PAGE_REQUEST:
        return { ...state, loading: true, error: null };
      case LIKE_PAGE_SUCCESS:
      case UNLIKE_PAGE_SUCCESS:
        return { ...state, loading: false };
      case RECEIVE_LIKE_ERRORS:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

export default likeReducer;
