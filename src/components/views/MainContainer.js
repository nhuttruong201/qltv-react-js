import Navbar from "./Navbar";
import SideBar from "./Sidebar";

const MainContainer = (props) => {
    return (
        <>
            <Navbar />
            <div className="container-fluid m-0 p-0 h-100">
                <div className="row h-100">
                    <div className="col-md-4 col-lg-3 d-none d-sm-none d-md-block h-100">
                        <SideBar />
                    </div>
                    <div className="col-12 col-md-8 col-lg-9 bg-light-blue">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainContainer;
