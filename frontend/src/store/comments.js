import jwtFetch from "./jwt";

const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS"
// const RECEIVE_COMMENT = "comments/RECEIVE_COMMENT"
const REMOVE_COMMENT = "comments/REMOVE_COMMENT"


const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
});

// const receiveComment = (comment) => ({
//     type: RECEIVE_COMMENT,
//     comment
// })

const removeComment = (comment) => ({
    type: REMOVE_COMMENT,
    comment
})


export const createComment = (data) => async dispatch => {
    const res = await jwtFetch(`/api/pages/comment/${pageId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const page = await res.json();
    dispatch(receiveComments(page))
  }

  export const deleteComment = (pageId) => async dispatch => {
    const res = await jwtFetch(`/api/pages/comment/${pageId}`, {
      method: 'DELETE'
    });
    const page = await res.json();
    dispatch(removeComments(page))
  }

  export const editComment = (data) => async dispatch => {
    const res = await jwtFetch(`/api/pages/${data._id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const page = await res.json();
    dispatch(receiveUpdatedPage(page));
  }