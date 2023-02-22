import jwtFetch from './jwt';

const RECEIVE_USER = "RECEIVE_USER";
const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
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

const initalState = null;

const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user;
        default:
            return state;
    }
};

export default userReducer;