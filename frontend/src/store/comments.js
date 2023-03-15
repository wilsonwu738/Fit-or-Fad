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

const removeComment = (commentId) => ({
    type: REMOVE_COMMENT,
    commentId
})


export const fetchComments = () => async (dispatch) => {
    debugger
    const res = await jwtFetch(`/api/pages/comments`);
    debugger
    if (res.ok) {
      const comments = await res.json();
      dispatch(receiveComments(comments));
    }
};

export const createComment = (data, pageId) => async dispatch => {
    const res = await jwtFetch(`/api/pages/comments/${pageId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    debugger
    const comments = await res.json();
    dispatch(receiveComments(comments))
  }

  export const deleteComment = (commentId) => async dispatch => {
    const res = await jwtFetch(`/api/pages/comments/${commentId}`, {
      method: 'DELETE'
    });
    const comment = await res.json();
    dispatch(removeComment(comment))
  }

  export const editComment = (data) => async dispatch => {
    const res = await jwtFetch(`/api/pages/comments/${data._id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const comments = await res.json();
    dispatch(receiveComments(comments));
  }

  const commentsReducer = (state = {}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return { ...state, ...action.comments };
        case REMOVE_COMMENT:
            delete newState[action.commentId]
            return newState;

        default: 
            return state;
    }
  };

  export default commentsReducer