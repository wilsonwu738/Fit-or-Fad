import jwtFetch from "./jwt";

const RECEIVE_PAGES = "pages/RECEIVE_PAGES";
const RECEIVE_USER_PAGES = "pages/RECEIVE_USER_PAGES";
const RECEIVE_NEW_PAGE = "pages/RECEIVE_NEW_PAGE";
const RECEIVE_PAGE_ERRORS = "pages/RECEIVE_PAGE_ERRORS";
const CLEAR_PAGE_ERRORS = "pages/CLEAR_PAGE_ERRORS";
const RECEIVE_UPDATED_PAGE = "pages/RECEIVE_UPDATED_PAGE";
const RECEIVE_DELETED_PAGE = "pages/DELETE_PAGE";


const receiveUpdatedPage = (page) => ({
  type: RECEIVE_UPDATED_PAGE,
  page,
});

const receiveDeletedPage = (pageId) => ({
  type: RECEIVE_DELETED_PAGE,
  pageId,
});

const receivePages = (pages) => ({
  type: RECEIVE_PAGES,
  pages,
});

const receiveUserPages = (pages) => ({
  type: RECEIVE_USER_PAGES,
  pages,
});

const receiveNewPage = (page) => {
  return {
    type: RECEIVE_NEW_PAGE,
    page,
  };
};

const receiveErrors = (errors) => ({
  type: RECEIVE_PAGE_ERRORS,
  errors,
});


export const clearPageErrors = (errors) => ({
  type: CLEAR_PAGE_ERRORS,
  errors,
});



export const fetchPage = (id) => async (dispatch) => {
  const res = await jwtFetch(`/api/pages/${id}`);

  const page = await res.json();

  dispatch(receiveNewPage(page));
};

export const fetchPages = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/pages");
    const pages = await res.json();

    dispatch(receivePages(pages));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserPages = (id) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/pages/user/${id}`);
    const pages = await res.json();
    dispatch(receiveUserPages(pages));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};



export const editPage = (data) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/pages/${data._id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const page = await res.json();
    dispatch(receiveUpdatedPage(page));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};


export const deletePage = (pageId) => async (dispatch) => {
  const res = await jwtFetch(`/api/pages/${pageId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(receiveDeletedPage(pageId));
  }
  return res;
};

export const composePage = (data, images) => async (dispatch) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  Array.from(images).forEach((image) => formData.append("images", image));
  try {
    const res = await jwtFetch("/api/pages/", {
      method: "POST",
      body: formData,
    });
    //hi

    const page = await res.json();
    dispatch(receiveNewPage(page));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};


export const likePage = (pageId) => async dispatch => {
  const res = await jwtFetch(`/api/users/like/${pageId}`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    }
  })
  const page = await res.json();
  dispatch(receiveNewPage(page));
}

export const deleteLike = (pageId) => async dispatch => {
  const res = await jwtFetch(`/api/users/like/${pageId}`, {
    method: 'DELETE'
  });
  const page = await res.json();
  dispatch(receiveNewPage(page))
}


const nullErrors = null;

export const pageErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_PAGE_ERRORS:
      return action.errors;
    case RECEIVE_NEW_PAGE:
    case CLEAR_PAGE_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const pagesReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_PAGES:
      return { ...action.pages };
    case RECEIVE_USER_PAGES:
      return { ...action.pages };
    case RECEIVE_NEW_PAGE:
      // return { ...state, new: action.page };
      return { ...action.page };
    case RECEIVE_UPDATED_PAGE:
      return {
        ...state,
        [action.page.id]: {
          ...state[action.page.id],
          ...action.page,
        },
      };
    case RECEIVE_DELETED_PAGE:
      delete newState[action.pageId];
      return newState;

    default:
      return state;
  }
};

export default pagesReducer;
