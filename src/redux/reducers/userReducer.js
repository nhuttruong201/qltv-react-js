const initialState = {
    isLoggedIn: false,
    userInfo: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTHENTICATE_THE_USER":
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
            };

        case "USER_LOGIN_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
            };
        case "USER_LOGIN_FAIL":
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case "USER_LOGOUT":
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };

        default:
            return state;
    }
};

export default userReducer;
