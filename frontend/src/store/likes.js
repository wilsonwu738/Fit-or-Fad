import jwtFetch from "./jwt";

export const LIKE_PAGE_REQUEST = 'LIKE_PAGE_REQUEST';
export const LIKE_PAGE_SUCCESS = 'LIKE_PAGE_SUCCESS';
export const LIKE_PAGE_FAILURE = 'LIKE_PAGE_FAILURE';
export const UNLIKE_PAGE_REQUEST = 'UNLIKE_PAGE_REQUEST';
export const UNLIKE_PAGE_SUCCESS = 'UNLIKE_PAGE_SUCCESS';
export const UNLIKE_PAGE_FAILURE = 'UNLIKE_PAGE_FAILURE';
export const UPDATE_USER_LIKED_PAGES = 'UPDATE_USER_LIKED_PAGES';

// action creators
export const likePageRequest = () => ({
  type: LIKE_PAGE_REQUEST,
});

export const likePageSuccess = (pageId) => ({
  type: LIKE_PAGE_SUCCESS,
  payload: pageId,
});

export const likePageFailure = (error) => ({
  type: LIKE_PAGE_FAILURE,
  payload: error,
});

export const unlikePageRequest = () => ({
  type: UNLIKE_PAGE_REQUEST,
});

export const unlikePageSuccess = (pageId) => ({
  type: UNLIKE_PAGE_SUCCESS,
  payload: pageId,
});

export const unlikePageFailure = (error) => ({
  type: UNLIKE_PAGE_FAILURE,
  payload: error,
});

export const updateUserLikedPages = (likedPage) => ({
  type: UPDATE_USER_LIKED_PAGES,
  payload: likedPage,
});

// thunks
export const likePage = (pageId, userId) => async (dispatch) => {
  try {
    dispatch(likePageRequest());

    const response = await jwtFetch.post(`/api/like/${pageId}`);
    console.log('likePage response:', response);

    dispatch(likePageSuccess(pageId));

    const { user } = response.data;
    const updatedLikedPages = [...user.likedPage, pageId];
    dispatch(updateUserLikedPages(updatedLikedPages));
  } catch (error) {
    dispatch(likePageFailure(error.response.data.message || error.message));
  }
};

export const unlikePage = (pageId, userId) => async (dispatch) => {
  try {
    dispatch(unlikePageRequest());

    const response = await jwtFetch.delete(`/api/like/${pageId}`);
    console.log('unlikePage response:', response);

    dispatch(unlikePageSuccess(pageId));

    const { user } = response.data;
    const updatedLikedPages = user.likedPage.filter((id) => id !== pageId);
    dispatch(updateUserLikedPages(updatedLikedPages));
  } catch (error) {
    dispatch(unlikePageFailure(error.response.data.message || error.message));
  }
};

// reducer
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
      return { ...state, likingPage: false };
    case LIKE_PAGE_FAILURE:
      return { ...state, likingPage: false, error: action.payload };
    case UNLIKE_PAGE_REQUEST:
      return { ...state, unlikingPage: true };
    case UNLIKE_PAGE_SUCCESS:
      return { ...state, unlikingPage: false };
    case UNLIKE_PAGE_FAILURE:
      return { ...state, unlikingPage: false, error: action.payload };
    case UPDATE_USER_LIKED_PAGES:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default likePageReducer;
