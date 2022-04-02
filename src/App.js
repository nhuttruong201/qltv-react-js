import Navbar from "./components/views/Navbar";
import SideBar from "./components/views/Sidebar";

function App() {
    return (
        <div className="container-fluid m-0 p-0 h-100">
            <Navbar />
            <div className="row h-100">
                <div className="col-md-4 col-lg-3 d-none d-sm-none d-md-block h-100">
                    <SideBar />
                </div>
                <div className="col-12 col-md-8 col-lg-9 bg-light"></div>
            </div>
        </div>
    );
}

export default App;
