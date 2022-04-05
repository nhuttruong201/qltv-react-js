import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import userReducer from "./redux/reducers/userReducer";

const store = createStore(userReducer);

const userLogin = localStorage.getItem("username");
if (userLogin) {
    store.dispatch({
        type: "AUTHENTICATE_THE_USER",
        userInfo: { username: userLogin },
    });
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
