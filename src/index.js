import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import userReducer from "./redux/reducers/userReducer";
import axios from "./configs/axios";

const store = createStore(userReducer);

const userLogin = localStorage.getItem("userLogin");

if (userLogin) {
    let username = userLogin.split(" ")[0];
    let userId = userLogin.split(" ")[1];
    store.dispatch({
        type: "AUTHENTICATE_THE_USER",
        userInfo: {
            username,
            userId,
        },
    });
}

ReactDOM.render(
    // <React.StrictMode>
    //     <Provider store={store}>
    //         <App />
    //     </Provider>
    // </React.StrictMode>,

    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
