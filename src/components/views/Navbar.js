import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../../redux/actions/userAction";

const Navbar = (props) => {
    const handleLogout = () => {
        localStorage.clear();
        props.userLogout();
    };

    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="!#">
                    <img
                        src="/img/logo.png"
                        alt="logo"
                        height={"40"}
                        width={"40"}
                    />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapsibleNavbar"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="collapsibleNavbar"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {/* <a className="nav-link" href="!#">
                                Trang chủ
                            </a> */}
                            <Link to={"/"} className="nav-link">
                                Trang chủ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                Làm thẻ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/muon-sach"} className="nav-link">
                                Mượn sách
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/tra-sach"} className="nav-link">
                                Trả sách
                            </Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="!#"
                                role="button"
                                data-toggle="dropdown"
                            >
                                Quản lý
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link
                                        to={"/quan-ly-phieu-muon"}
                                        className="dropdown-item"
                                    >
                                        Quản lý phiếu mượn
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={"/books"}
                                        className="dropdown-item"
                                    >
                                        Quản lý sách
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"} className="dropdown-item">
                                        Quản lý thẻ độc giả
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"} className="dropdown-item">
                                        Quản lý tác giả
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"} className="dropdown-item">
                                        Quản lý thể loại
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"} className="dropdown-item">
                                        Quản lý tài khoản
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="!#"
                                role="button"
                                data-toggle="dropdown"
                            >
                                <img
                                    className="rounded-circle mr-2"
                                    src="/img/avt.jpg"
                                    alt="avatar"
                                    height={"30"}
                                    width={"30"}
                                />
                                <span>
                                    {(props.userInfo &&
                                        props.userInfo.username) ||
                                        "Null"}
                                </span>
                            </a>

                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="!#">
                                        Tài khoản
                                    </a>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={handleLogout}
                                    >
                                        Đăng xuất
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: () => dispatch(userLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
