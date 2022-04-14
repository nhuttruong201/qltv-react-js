import { useState } from "react";
import axios from "../../../configs/axios";
import "./Auth.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
    userLoginFail,
    userLoginSuccess,
} from "../../../redux/actions/userAction";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState(null);

    const history = useHistory();

    // console.log(">> check user info from redux: ", props.userInfo);

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            alert("Bạn chưa điền đủ thông tin!");
            return;
        }

        await axios
            .post("/login", {
                email: username,
                matkhau: password,
            })
            .then((res) => {
                console.log("login res data: ", res.data);

                if (res.data.status === 200) {
                    props.userLoginSuccess({
                        username: res.data.data.email,
                        userId: res.data.data.manhanvien,
                    });
                    localStorage.setItem("username", username);
                    localStorage.setItem(
                        "userLogin",
                        username + " " + res.data.data.manhanvien
                    );

                    history.replace("/");

                    return;
                }

                if (res.data.status === 403) {
                    setErrMsg("Tài khoản đã bị khoá!");
                    return;
                }

                setErrMsg("Tài khoản hoặc mật khẩu không đúng!");
            })
            .catch((err) => {
                setErrMsg("Đã xảy ra lỗi!");
                props.userLoginFail();
            });
    };

    return (
        <>
            <div className="auth-container">
                <div className="logo-container">
                    <img
                        src="/img/logo.png"
                        alt="logo"
                        height={"100"}
                        width={"100"}
                    />
                    <h6 className="text-primary mt-2">Thư viện TTV</h6>
                </div>
                <form>
                    {errMsg && (
                        <>
                            <p className="text-danger">{errMsg}</p>
                        </>
                    )}
                    <div className="form-group">
                        <input
                            type={"text"}
                            value={username}
                            placeholder="Tên tài khoản"
                            autoFocus
                            className="form-control"
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type={"password"}
                            value={password}
                            placeholder="Mật khẩu"
                            className="form-control"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            onClick={(event) => handleLogin(event)}
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userLoginSuccess: (userInfo) => dispatch(userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
