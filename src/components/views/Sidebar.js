import { NavLink } from "react-router-dom";

const SideBar = () => {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <div className="nav">
                <NavLink
                    to="/"
                    exact={true}
                    className="nav-item"
                    activeClassName="active"
                >
                    <span className="nav-link">
                        <i className="bi bi-house-fill mr-3"></i>
                        <span className="menu-title">Trang chủ</span>
                    </span>
                </NavLink>

                <NavLink
                    to="/muon-sach"
                    exact={true}
                    className="nav-item"
                    activeClassName="active"
                >
                    <span className="nav-link">
                        <i className="fas fa-cart-plus mr-3"></i>
                        <span className="menu-title">Mượn sách</span>
                        <i className="fas fa-angle-right ml-auto"></i>
                    </span>
                </NavLink>

                <NavLink
                    to="/tra-sach"
                    exact={true}
                    className="nav-item"
                    activeClassName="active"
                >
                    <span className="nav-link">
                        <i className="fas fa-cart-plus mr-3"></i>
                        <span className="menu-title">Trả sách</span>
                        <i className="fas fa-angle-right ml-auto"></i>
                    </span>
                </NavLink>

                <NavLink
                    to="/books"
                    exact={true}
                    className="nav-item"
                    activeClassName="active"
                >
                    <span className="nav-link">
                        <i className="fas fa-book mr-3"></i>
                        <span className="menu-title">Quản lý sách</span>
                        <i className="fas fa-angle-right ml-auto"></i>
                    </span>
                </NavLink>

                <NavLink
                    to="/readers"
                    exact={true}
                    className="nav-item"
                    activeClassName="active"
                >
                    <span className="nav-link">
                        <i className="fas fa-book-reader mr-3"></i>
                        <span className="menu-title">Quản lý thẻ đọc giả</span>
                        <i className="fas fa-angle-right ml-auto"></i>
                    </span>
                </NavLink>

                <NavLink
                    to="/accounts"
                    exact={true}
                    className="nav-item"
                    activeClassName="active"
                >
                    <span className="nav-link">
                        <i className="fas fa-user mr-3"></i>
                        <span className="menu-title">Quản lý tài khoản</span>
                        <i className="fas fa-angle-right ml-auto"></i>
                    </span>
                </NavLink>

                <NavLink
                    to="/staffs"
                    exact={true}
                    className="nav-item"
                    activeClassName="active"
                >
                    <span className="nav-link">
                        <i className="fas fa-user-tie mr-3"></i>
                        <span className="menu-title">Quản lý nhân viên</span>
                        <i className="fas fa-angle-right ml-auto"></i>
                    </span>
                </NavLink>
                <NavLink
                    to="/authors"
                    exact={true}
                    className="nav-item"
                    activeClassName="active"
                >
                    <span className="nav-link">
                        <i className="fas fa-user-tie mr-3"></i>
                        <span className="menu-title">Quản lý tác giả</span>
                        <i className="fas fa-angle-right ml-auto"></i>
                    </span>
                </NavLink>
                <NavLink
                    to="/categories"
                    exact={true}
                    className="nav-item"
                    activeClassName="active"
                >
                    <span className="nav-link">
                        <i className="fab fa-elementor mr-3"></i>
                        <span className="menu-title">Quản lý thể loại</span>
                        <i className="fas fa-angle-right ml-auto"></i>
                    </span>
                </NavLink>
                <NavLink
                    to="/publishers"
                    exact={true}
                    className="nav-item"
                    activeClassName="active"
                >
                    <span className="nav-link">
                        <i className="fas fa-landmark mr-3"></i>
                        <span className="menu-title">Quản lý nhà xuất bản</span>
                        <i className="fas fa-angle-right ml-auto"></i>
                    </span>
                </NavLink>
            </div>
        </nav>
    );
};

export default SideBar;
