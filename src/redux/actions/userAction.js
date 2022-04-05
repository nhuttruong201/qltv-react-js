const userLoginSuccess = (userInfo) => {
    return {
        type: "USER_LOGIN_SUCCESS",
        userInfo: userInfo,
    };
};

const userLoginFail = () => {
    return {
        type: "USER_LOGIN_FAIL",
    };
};

const userLogout = () => {
    return {
        type: "USER_LOGOUT",
    };
};

export { userLoginSuccess, userLoginFail, userLogout };
