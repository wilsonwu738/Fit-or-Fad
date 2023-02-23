import jwtFetch from './jwt';

// Actions
const RECEIVE_USER = "RECEIVE_USER";
const RECEIVE_USERS = "RECEIVE-USERS";
const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

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

const initalState = { user: null };

// Reducer
const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            return { ...state, user: action.user};
        case RECEIVE_USERS:
            return { ...state, users: action.users}
        default:
            return state;
    }
};

export default userReducer;