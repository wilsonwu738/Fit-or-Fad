import jwtFetch from './jwt';

export const LIKE_PAGE_REQUEST = 'LIKE_PAGE_REQUEST';
export const LIKE_PAGE_SUCCESS = 'LIKE_PAGE_SUCCESS';
export const LIKE_PAGE_FAILURE = 'LIKE_PAGE_FAILURE';
export const UNLIKE_PAGE_REQUEST = 'UNLIKE_PAGE_REQUEST';
export const UNLIKE_PAGE_SUCCESS = 'UNLIKE_PAGE_SUCCESS';
export const UNLIKE_PAGE_FAILURE = 'UNLIKE_PAGE_FAILURE';

export const likePageRequest = () => ({
    type: LIKE_PAGE_REQUEST,
    payload: null,
  });
  
  export const likePageSuccess = () => ({
    type: LIKE_PAGE_SUCCESS,
    payload: null,
  });
  
  export const likePageFailure = (errors) => ({
    type: LIKE_PAGE_FAILURE,
    payload: errors,
  });
  
  export const unlikePageRequest = () => ({
    type: UNLIKE_PAGE_REQUEST,
    payload: null,
  });
  
  export const unlikePageSuccess = () => ({
    type: UNLIKE_PAGE_SUCCESS,
    payload: null,
  });
  
  export const unlikePageFailure = (errors) => ({
    type: UNLIKE_PAGE_FAILURE,
    payload: errors,
  });

export const likePage = (pageId) => async (dispatch) => {
    try {
      dispatch({ type: LIKE_PAGE_REQUEST });
  
      const response = await jwtFetch.post(`/api/like/${pageId}`);
  
      dispatch({
        type: LIKE_PAGE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: LIKE_PAGE_FAILURE,
        payload: error.response.data.message || error.message,
      });
    }
  };
  
  export const unlikePage = (pageId) => async (dispatch) => {
    try {
      dispatch({ type: UNLIKE_PAGE_REQUEST });
  
      const response = await jwtFetch.delete(`/api/like/${pageId}`);
  
      dispatch({
        type: UNLIKE_PAGE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UNLIKE_PAGE_FAILURE,
        payload: error.response.data.message || error.message,
      });
    }
  };

  const initialState = {
  likingPage: false,
  unlikingPage: false,
  error: null,
};

const likePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_PAGE_REQUEST:
      return { ...state, likingPage: true };
    case LIKE_PAGE_SUCCESS:
      return { ...state, likingPage: false, error: null };
    case LIKE_PAGE_FAILURE:
      return { ...state, likingPage: false, error: action.payload };
    case UNLIKE_PAGE_REQUEST:
      return { ...state, unlikingPage: true };
    case UNLIKE_PAGE_SUCCESS:
      return { ...state, unlikingPage: false, error: null };
    case UNLIKE_PAGE_FAILURE:
      return { ...state, unlikingPage: false, error: action.payload };
    default:
      return state;
  }
};


export default likePageReducer;