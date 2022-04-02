const SideBar = () => {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item active">
                    <a className="nav-link" href="!#">
                        <i class="bi bi-house-fill mr-3"></i>
                        <span className="menu-title">Trang chủ</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="!#">
                        <i class="fas fa-cart-plus mr-3"></i>
                        <span className="menu-title">Mượn sách</span>
                        <i class="fas fa-angle-right ml-auto"></i>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="!#">
                        <i class="fas fa-cart-plus mr-3"></i>
                        <span className="menu-title">Trả sách</span>
                        <i class="fas fa-angle-right ml-auto"></i>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="!#">
                        <i class="fas fa-book mr-3"></i>
                        <span className="menu-title">Quản lý sách</span>
                        <i class="fas fa-angle-right ml-auto"></i>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="!#">
                        <i class="fas fa-book-reader mr-3"></i>
                        <span className="menu-title">Quản lý thẻ đọc giả</span>
                        <i class="fas fa-angle-right ml-auto"></i>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="!#">
                        <i class="fas fa-user mr-3"></i>
                        <span className="menu-title">Quản lý tài khoản</span>
                        <i class="fas fa-angle-right ml-auto"></i>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="!#">
                        <i class="fas fa-user-tie mr-3"></i>
                        <span className="menu-title">Quản lý nhân viên</span>
                        <i class="fas fa-angle-right ml-auto"></i>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default SideBar;
