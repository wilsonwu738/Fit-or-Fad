import jwtFetch from './jwt';

const RECEIVE_PAGES = "pages/RECEIVE_PAGES";
const RECEIVE_USER_PAGES = "pages/RECEIVE_USER_PAGES";
const RECEIVE_NEW_PAGE = "pages/RECEIVE_NEW_PAGE";
const RECEIVE_PAGE_ERRORS = "pages/RECEIVE_PAGE_ERRORS";
const CLEAR_PAGE_ERRORS = "pages/CLEAR_PAGE_ERRORS";
const RECEIVE_UPDATED_PAGE = "pages/RECEIVE_UPDATED_PAGE";
const RECEIVE_DELETED_PAGE = "pages/DELETE_PAGE";

const receiveUpdatedPage = page => ({
  type: RECEIVE_UPDATED_PAGE,
  page
});

const receiveDeletedPage = (pageId) => ({
    type: RECEIVE_DELETED_PAGE,
    pageId,
  });
  

const receivePages = pages => ({
    type: RECEIVE_PAGES,
    pages
});

const receiveUserPages = (pages) => ({
  type: RECEIVE_USER_PAGES,
  pages,
});

const receiveNewPage = (page) => ({
  type: RECEIVE_NEW_PAGE,
  page,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_PAGE_ERRORS,
  errors,
});

export const clearPageErrors = (errors) => ({
  type: CLEAR_PAGE_ERRORS,
  errors,
});

export const fetchPage = (id) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/pages/user/${id}`);
    const page = await res.json();
    dispatch(receiveNewPage(page));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchPages = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/pages');
        const pages = await res.json();
        // debugger
        dispatch(receivePages(pages));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
  }



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

// export const fetchUserPages = id => async dispatch => {
//     try {
//         const res = await jwtFetch(`/api/pages/user/${id}`);
//         const pages = await res.json();
//         dispatch(receiveUserPages(pages));
//     } catch (err) {
//         const resBody = await err.json();
//         if (resBody.statusCode === 400) {
//             return dispatch(receiveErrors(resBody.errors));
//         }
//     }
// };

export const editPage = (data) => async (dispatch) => {
    try {
      const res = await jwtFetch(`/api/pages/${data._id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      const page = await res.json();
      dispatch(receiveUpdatedPage(page));
      console.log("Page updated successfully");
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
      console.log("Error updating page:", err);
    }
  };


// export const deletePage = (id) => async (dispatch) => {
//     debugger
//   try {
//     const res = await jwtFetch(`/api/pages/${id}`, { 
//         method: "DELETE" 
//     });
//     debugger
//     const page = await res.json();
//     console.log("Page deleted successfully");
//     dispatch(receiveDeletedPage(page));
//     debugger
//   } catch (err) {
//     console.log("Error deleting page:", err);
//   }
// };

export const deletePage = (pageId) => async dispatch => {
    // debugger
    const res = await jwtFetch(`/api/pages/${pageId}`, {
        method: 'DELETE'
    })
    // debugger
    if (res.ok) {
        dispatch(receiveDeletedPage(pageId))
    }
    return res
}



  export const composePage = (data, images) => async dispatch => {
    const formData = new FormData();
    Array.from(images).forEach(image => formData.append("images", image));
    debugger
    try {
      const res = await jwtFetch('/api/pages/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // handle success response here
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };


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
            return { ...state, ...action.pages };
        case RECEIVE_USER_PAGES:
            return { ...state, ...action.pages };
        case RECEIVE_NEW_PAGE:
            // return { ...state, new: action.page };
            return { ...state,  ...action.page };
        case RECEIVE_UPDATED_PAGE:
            return {
                ...state,
                [action.page.id]: {
                    ...state[action.page.id],
                    ...action.page
                }
            };
        case RECEIVE_DELETED_PAGE:
                // debugger
            delete newState[action.pageId];
                // debugger
            return newState;
        default:
            return state;
    }
};

export default pagesReducer;
