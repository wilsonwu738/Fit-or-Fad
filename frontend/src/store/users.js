import jwtFetch from './jwt';

// Actions
const RECEIVE_USER = "RECEIVE_USER";
const RECEIVE_USERS = "RECEIVE_USERS";
const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

const RECEIVE_FOLLOW = "follows/RECEIVE_FOLLOW";
const REMOVE_FOLLOW = "follows/REMOVE_FOLLOW";


const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

const receiveErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors
});

const receiveFollow = user => ({
    type: RECEIVE_FOLLOW,
    user
});

const removeFollow = userId => ({
    type: REMOVE_FOLLOW,
    userId
});




export const fetchUser = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/${userId}`);
        const user = await res.json();
        dispatch(receiveUser(user));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const fetchUsers = () => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users`);
        const users = await res.json();
        dispatch(receiveUsers(users));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}



export const followUser = (userId) => async dispatch => {
   debugger
    const res = await jwtFetch(`/api/users/follow/${userId}`, {        
    method: 'POST', 
    headers: {
        "Content-Type": "application/json",
    }
});
 debugger
    const user = await res.json();
    dispatch(receiveUser(user));
    debugger
};


export const deleteFollow = (userId) => async dispatch => {

const res = await jwtFetch(`/api/users/unfollow/${userId}`, {
    method: 'DELETE'
});

const user = await res.json();

dispatch(receiveUser(user));
};







const initalState = {};

// Reducer
const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            return { ...state, user: action.user};
        case RECEIVE_USERS:
            return { ...state, users: action.users}
        case RECEIVE_FOLLOW:
            return { ...state, ...action.user}
        case REMOVE_FOLLOW:
            return {
                  ...state, users: state.users.filter((user) => user._id !== action.userId),
                };
        default:
            return state;
    }
};

export default userReducer;