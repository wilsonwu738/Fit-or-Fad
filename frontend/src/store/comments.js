import jwtFetch from "./jwt";

const RECEIVE_COMMENT = "comments/RECEIVE_COMMENT"
const REMOVE_COMMENT = "comments/REMOVE_COMMENT"

export const createComment = (pageId) => async dispatch => {
    const res = await jwtFetch(`/api/pages/comment/${pageId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    })
    const page = await res.json();
    dispatch(receiveNewPage(page))
  }

  export const deleteComment = (pageId) => async dispatch => {
    const res = await jwtFetch(`/api/pages/comment/${pageId}`, {
      method: 'DELETE'
    });
    const page = await res.json();
    dispatch(receiveNewPage(page))
  }

  export const editComment = (data) => async dispatch => {
    const res = await jwtFetch(`/api/pages/${data._id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const page = await res.json();
    dispatch(receiveUpdatedPage(page));
  }