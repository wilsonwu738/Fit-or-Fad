import jwtFetch from "./jwt";

const LIKE_PAGE_REQUEST = "LIKE_PAGE_REQUEST";
const LIKE_PAGE_SUCCESS = "LIKE_PAGE_SUCCESS";
const UNLIKE_PAGE_REQUEST = "UNLIKE_PAGE_REQUEST";
const UNLIKE_PAGE_SUCCESS = "UNLIKE_PAGE_SUCCESS";
const RECEIVE_LIKE_ERRORS = "users/RECEIVE_LIKE_ERRORS";

const likePageRequest = () => ({ 
    type: LIKE_PAGE_REQUEST 
});

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
    errors,
  });

export const likePage = (pageId, userId) => async (dispatch) => {
  dispatch(likePageRequest());

  try {
    const res = await jwtFetch(`/api/pages/like/${pageId}`, "POST");
    dispatch(likePageSuccess(res));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
    }
}
};

export const unlikePage = (pageId, userId) => async (dispatch) => {
  dispatch(unlikePageRequest());

  try {
    const res = await jwtFetch(`/api/pages/like/${pageId}`, "DELETE");
    dispatch(unlikePageSuccess(res));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
    }
}
};

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
