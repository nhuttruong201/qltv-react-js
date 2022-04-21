import axios from "../../configs/axios";
import { useEffect, useState } from "react";
import ModalPublisher from "./modals/ModalPublisher";
const PublisherArea = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [initListPublishers, setInitListPublishers] = useState([]);
    const [listPublishers, setListPublishers] = useState([]);
    const [typeView, setTypeView] = useState("all");
    const [showModalAddNewPublisher, setShowModalAddNewPublisher] =
        useState(false);
    const [showModalEditPublisher, setShowModalEditPublisher] = useState(false);

    const [dataEditPublisher, setDataEditPublisher] = useState({});

    const handleOnChangeSearch = (e) => {
        let strSearch = e.target.value.toLowerCase();
        setListPublishers(
            initListPublishers.filter((item) => {
                return item.tennxb.toLowerCase().includes(strSearch);
            })
        );
    };

    const handleChangeTypeView = (typeView) => {
        fetchData(typeView);
        setTypeView(typeView);
    };
    const handleShowModalEditPublisher = (PublisherEdit) => {
        setShowModalEditPublisher(true);
        setDataEditPublisher(PublisherEdit);
    };
    const handleShowModal = (modalName) => {
        if (modalName === "ADD_NEW_Publisher") {
            setShowModalAddNewPublisher(true);
        }
    };
    const handleCloseModal = (modalName) => {
        if (modalName === "ADD_NEW_Publisher") {
            setShowModalAddNewPublisher(false);
        }
        if (modalName === "EDIT_Publisher") {
            setShowModalEditPublisher(false);
        }
    };

    const handleEditPublishersucceed = (newListPublishers) => {
        // alert("handleEditPublishersucceed");
        console.log(">>> handleEditPublishersucceed: ", newListPublishers);
        setShowModalEditPublisher(false);
        setInitListPublishers(newListPublishers);
        setListPublishers(newListPublishers);
    };
    const handleAddNewPublishersuccesseed = (newListPublishers) => {
        // alert("handleAddNewPublishersucceed");
        console.log(">>> handleAddNewPublishersucceed: ", newListPublishers);
        setShowModalAddNewPublisher(false);
        setInitListPublishers(newListPublishers);
        setListPublishers(newListPublishers);
    };
    const fetchData = async (type) => {
        let url = null;
        if (type === "all") url = "/api/Publishers";
        console.log(">> check url from fetchData:", url);

        setIsLoading(true);

        await axios({
            method: "get",
            url: "/api/Publishers",
            headers: { username: localStorage.getItem("username") },
        })
            .then((res) => {
                console.log("fetchData: ", res);

                setTimeout(() => {
                    setListPublishers(res.data);
                    setIsLoading(false);
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: "get",
                url: "/api/Publishers",
                headers: { username: localStorage.getItem("username") },
            })
                .then((res) => {
                    console.log("useEffect fetchData: ", res);
                    const data = res.data.reverse();

                    setTimeout(() => {
                        setInitListPublishers(data);
                        setListPublishers(data);
                        setIsLoading(false);
                    }, 1000);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchData();
    }, []);
    return (
        <>
            {showModalAddNewPublisher && (
                <ModalPublisher
                    type="ADD_NEW_Publisher"
                    title="Thêm nhà xuất bản"
                    isSucceed={handleAddNewPublishersuccesseed}
                    isClose={handleCloseModal}
                />
            )}
            {showModalEditPublisher && (
                <ModalPublisher
                    type="EDIT_Publisher"
                    title="Sửa nhà xuất bản"
                    isSucceed={handleEditPublishersucceed}
                    isClose={handleCloseModal}
                    data={dataEditPublisher}
                />
            )}
            <div className="container py-3">
                <div className="row">
                    <div className="col-12">
                        <h5>
                            <i className="fab fa-elementor mr-3"></i>Quản lý nhà
                            xuất bản
                        </h5>
                        <hr></hr>
                    </div>
                    <div className="col-sm-7">
                        <button
                            className="btn btn-primary m-1 px-3"
                            onClick={() => handleShowModal("ADD_NEW_Publisher")}
                        >
                            <i className="fas fa-plus mr-2"></i>Thêm mới
                        </button>
                    </div>
                    <div className="col-sm-5">
                        <div className="input-group m-1">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm nhà xuất bản"
                                onChange={(e) => handleOnChangeSearch(e)}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-3">
                        <div className="bg-white radius p-3">
                            <div className="w-100 text-center">
                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className={
                                            "btn btn-primary " +
                                            (typeView === "all" && "active")
                                        }
                                        // onClick={() =>
                                        //     handleChangeTypeView("all")
                                        // }
                                    >
                                        Tất cả
                                    </button>
                                </div>
                            </div>

                            <div className="table-container">
                                <table className="table table-sm table-hover table-sm-responsive table-fix-head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên nhà xuất bản</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading && (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center"
                                                >
                                                    Đang tải dữ liệu...
                                                </td>
                                            </tr>
                                        )}

                                        {!isLoading &&
                                            listPublishers &&
                                            listPublishers.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.tennxb}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-primary m-1"
                                                                onClick={() =>
                                                                    handleShowModalEditPublisher(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-pen"></i>
                                                            </button>
                                                            {/* delete button*/}
                                                            {/* <button className="btn btn-sm btn-danger m-1">
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button> */}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
// const mapStateToProps = (state) => {
//     return {
//         userInfo: state.userInfo,
//     };
// };
export default PublisherArea;
