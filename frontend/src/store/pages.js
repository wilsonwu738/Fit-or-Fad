import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_PAGES = "pages/RECEIVE_PAGES";
const RECEIVE_USER_PAGES = "pages/RECEIVE_USER_PAGES";
const RECEIVE_NEW_PAGE = "pages/RECEIVE_NEW_PAGE";
const RECEIVE_PAGE_ERRORS = "pages/RECEIVE_PAGE_ERRORS";
const CLEAR_PAGE_ERRORS = "pages/CLEAR_PAGE_ERRORS";

const receivePages = pages => ({
    type: RECEIVE_PAGES,
    pages
});

const receiveUserPages = pages => ({
    type: RECEIVE_USER_PAGES,
    pages
});

const receiveNewPage = page => ({
    type: RECEIVE_NEW_PAGE,
    page
});

const receiveErrors = errors => ({
    type: RECEIVE_PAGE_ERRORS,
    errors
});

export const clearPageErrors = errors => ({
    type: CLEAR_PAGE_ERRORS,
    errors
});

export const fetchPages = () => async dispatch => {
    // debugger
    try {
        const res = await jwtFetch('/api/pages');
        const pages = await res.json();
        dispatch(receivePages(pages));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchUserPages = id => async dispatch => {
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

export const composePage = data => async dispatch => {
    try {
        const res = await jwtFetch('/api/pages/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const page = await res.json();
        dispatch(receiveNewPage(page));
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
    switch (action.type) {
        case RECEIVE_PAGES:
            return { ...state, ...action.pages};
        case RECEIVE_USER_PAGES:
            return { ...state, ...action.page };
        case RECEIVE_NEW_PAGE:
            // return { ...state, new: action.page };
            return { ...state,  ...action.page };
        case RECEIVE_USER_LOGOUT:
            return { ...state, user: {}, new: undefined }
        default:
            return state;
    }
};

export default pagesReducer;