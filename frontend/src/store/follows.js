import jwtFetch from './jwt';

// Actions
const RECEIVE_FOLLOWS = "follows/RECEIVE_FOLLOWS";
const RECEIVE_FOLLOW = "follows/RECEIVE_FOLLOW";
const REMOVE_FOLLOW = "follows/REMOVE_FOLLOW";


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