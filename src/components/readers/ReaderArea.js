import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "../../configs/axios";
import ModalDetails from "./modals/ModalDetails";
import ModalReader from "./modals/ModalReader";
const ReaderArea = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [initListReaders, setInitListReaders] = useState([]);
    const [listReaders, setListReaders] = useState([]);
    const [typeView, setTypeView] = useState("all");
    const [showModalAddNewReaders, setShowModalAddNewBook] = useState(false);
    const [showModalEditReaders, setShowModalEditReaders] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [dataDetails, setDetails] = useState([]);
    const [dataEditReader, setDataEditReader] = useState([]);

    const handleEditReader = (readerEdit) => {
        setShowModalEditReaders(true);
        setDataEditReader(readerEdit);
    };
    const handleDetails = (item) => {
        setShowModalDetails(true);
        setDetails(item);
    };

    const handleShowModal = (modalName) => {
        if (modalName === "ADD_NEW_READER") {
            setShowModalAddNewBook(true);
        }
    };

    const handleCloseModal = (modalName) => {
        if (modalName === "ADD_NEW_READER") {
            setShowModalAddNewBook(false);
        }
        if (modalName === "EDIT_READERS") {
            setShowModalEditReaders(false);
        }
    };
    const onChangeInputSearch = (e) => {
        let strSearch = e.target.value.toLowerCase();
        // console.log(strSearch);
        setListReaders(
            initListReaders.filter((item) => {
                let gender = item.gioitinh ? "Nam" : "Nữ";
                return (
                    item.hoten.toLowerCase().includes(strSearch) ||
                    item.diachi.toLowerCase().includes(strSearch) ||
                    gender.toLowerCase().includes(strSearch) ||
                    String(item.sdt).includes(strSearch)
                );
            })
        );
    };

    const handleChangeTypeView = (typeView) => {
        fetchData(typeView);
        setTypeView(typeView);
    };

    const handleAddNewBookSucceed = (newListBooks) => {
        // alert("handleAddNewBookSucceed");
        console.log(">>> handleAddNewBookSucceed: ", newListBooks);
        setShowModalAddNewBook(false);
        setInitListReaders(newListBooks);
        setListReaders(newListBooks);
    };
    const fetchData = async (type) => {
        let url = null;
        if (type === "all") url = "/api/readers";
        console.log(">>> check url from fetchData: ", url);
        setIsLoading(true);
        await axios({
            method: "GET",
            url: "/api/readers",
            headers: { username: localStorage.getItem("username") },
        })
            .then((res) => {
                console.log("fetch data readers: ", res);
                setTimeout(() => {
                    setInitListReaders(res.data);
                    setListReaders(res.data);
                    setIsLoading(false);
                }, 1000);
            })
            .catch((err) => {
                console.log("fetchData err:", err);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: "get",
                url: "/api/readers",
                headers: { username: localStorage.getItem("username") },
            })
                .then((res) => {
                    console.log("useEffect fetchData Readers:", res);
                    const data = res.data.reverse();
                    setTimeout(() => {
                        setListReaders(data);
                        setInitListReaders(data);
                        setIsLoading(false);
                    }, 500);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchData();
    }, []);

    const handleEditReaderSucceed = (newListReaders) => {
        setShowModalEditReaders(false);
        setIsLoading(true);
        setTimeout(() => {
            setInitListReaders(newListReaders);
            setListReaders(newListReaders);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <>
            {showModalAddNewReaders && (
                <ModalReader
                    type="ADD_NEW_READER"
                    title="Thêm độc giả"
                    isSucceed={handleAddNewBookSucceed}
                    isClose={handleCloseModal}
                />
            )}

            {showModalEditReaders && (
                <ModalReader
                    type="EDIT_READERS"
                    title="Chỉnh sửa độc giả"
                    isSucceed={handleEditReaderSucceed}
                    isClose={handleCloseModal}
                    data={dataEditReader}
                />
            )}
            {showModalDetails && (
                <ModalDetails
                    title="Chi tiết độc giả"
                    isClose={handleCloseModal}
                    data={dataDetails}
                />
            )}

            <div className="container py-3">
                <div className="row">
                    <div className="col-12">
                        <h5>
                            <i className="fas fa-book-reader mr-3"></i>
                            Quản lý độc giả
                        </h5>
                        <hr></hr>
                    </div>
                    <div className="col-sm-7">
                        <button
                            className="btn btn-primary mt-1 px-3"
                            onClick={() => handleShowModal("ADD_NEW_READER")}
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Thêm mới
                        </button>
                    </div>
                    <div className="col-sm-5">
                        <div className="input-group m-1">
                            <input
                                // value={inputSearch}
                                onChange={(e) => onChangeInputSearch(e)}
                                type="text"
                                className="form-control"
                                placeholder="tìm thẻ độc giả..."
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-3">
                        <div className="radius p-3">
                            <div className="text-center">
                                <div className="btn-group">
                                    <button className="btn btn-primary">
                                        Tất cả
                                    </button>
                                    <button className="btn btn-primary">
                                        Hiện mượn
                                    </button>
                                    <button className="btn btn-primary">
                                        Đang mượn
                                    </button>
                                </div>
                            </div>

                            <div className="table-container">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Họ tên</th>
                                            <th>Giới tính</th>
                                            <th>SĐT</th>
                                            <th>Địa chỉ</th>
                                            <th>Thao tác</th>
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
                                            listReaders &&
                                            listReaders.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.hoten}</td>
                                                    <td>
                                                        {item.gioitinh
                                                            ? "Nam"
                                                            : "Nữ"}
                                                    </td>
                                                    <td>{item.sdt}</td>
                                                    <td>{item.diachi}</td>
                                                    <td>
                                                        {/* <button
                                                            onClick={() =>
                                                                handleDetails(
                                                                    item
                                                                )
                                                            }
                                                            className="btn btn-sm btn-success m-1"
                                                        >
                                                            <i className="fas fa-eye"></i>
                                                        </button> */}
                                                        <button
                                                            onClick={() =>
                                                                handleEditReader(
                                                                    item
                                                                )
                                                            }
                                                            className="btn btn-sm btn-primary m-1"
                                                            // onClick={() =>
                                                            //     handleShowModalEditBook(
                                                            //         item
                                                            //     )
                                                            // }
                                                        >
                                                            <i className="fas fa-pen"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
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
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    };
};
export default connect(mapStateToProps)(ReaderArea);
