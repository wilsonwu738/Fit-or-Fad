import jwtFetch from './jwt';

// Actions
const RECEIVE_FOLLOWS = "follows/RECEIVE_FOLLOWS";
const RECEIVE_FOLLOW = "follows/RECEIVE_FOLLOW";
const REMOVE_FOLLOW = "follows/REMOVE_FOLLOW";
const RECEIVE_ERRORS = "follows/RECEIVE_ERRORS";


const receiveFollow = user => ({
    type: RECEIVE_FOLLOW,
    user
});

const receiveFollows = users => ({
    type: RECEIVE_FOLLOWS,
    users
});

const removeFollow = userId => ({
    type: REMOVE_FOLLOW,
    userId
});

const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
});


// export const fetchFollow = (userId) => async dispatch => {
//     try {
//         const res = await jwtFetch(`/api/users/${userId}`);
//         const user = await res.json();
//         dispatch(receiveUser(user));
//     } catch (err) {
//         const resBody = await err.json();
//         if (resBody.statusCode === 400) {
//             dispatch(receiveErrors(resBody.errors));
//         }
//     }
// }

export const fetchFollows = () => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users`);
        const users = await res.json();
        dispatch(receiveFollows(users));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

const initialState = { users: [], errors: [] };

// Reducer
const followsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_FOLLOW:
            return { ...state, user: action.user};
        case RECEIVE_FOLLOWS:
            return { ...state, ...action.payload, errors: [] };
        case REMOVE_FOLLOW:
            return { ...state, users: state.users.filter(user => user.id !== action.userId) };
        case RECEIVE_ERRORS:
            return { ...state, errors: action.errors };
        default:
            return state;
    }
};

export default followsReducer;