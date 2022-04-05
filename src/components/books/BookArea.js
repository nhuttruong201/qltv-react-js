import { type } from "@testing-library/user-event/dist/type";
import axios from "../../configs/axios";

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ModalAddNewBook from "./modals/ModalAddNewBook";

const BookArea = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [initListBooks, setInitListBooks] = useState([]);
    const [listBooks, setListBooks] = useState([]);
    const [typeView, setTypeView] = useState("all");
    const [showModalAddNewBook, setShowModalAddNewBook] = useState(false);

    // console.log("check userInfo: ", props.userInfo);

    const handleOnChangeSearch = (e) => {
        let strSearch = e.target.value.toLowerCase();
        setListBooks(
            initListBooks.filter((item) => {
                return (
                    item.tensach.toLowerCase().includes(strSearch) ||
                    item.tentheloai.toLowerCase().includes(strSearch) ||
                    String(item.namxuatban).includes(strSearch)
                );
            })
        );
    };

    const handleShowModal = (modalName) => {
        if (modalName === "ADD_NEW_BOOK") {
            setShowModalAddNewBook(true);
        }
    };

    const handleCloseModal = (modalName) => {
        if (modalName === "ADD_NEW_BOOK") {
            setShowModalAddNewBook(false);
        }
    };

    const handleAddNewBookSucceed = (newBook) => {
        // alert("handleAddNewBookSucceed");
        console.log(
            ">>> check newBook from handleAddNewBookSucceed: ",
            newBook
        );
        setShowModalAddNewBook(false);
        setInitListBooks((initListBooks) => [...initListBooks, newBook]);
        setListBooks((listBooks) => [...listBooks, newBook]);
    };

    const handleChangeTypeView = (typeView) => {
        fetchData(typeView);
        setTypeView(typeView);
    };

    const fetchData = async (type) => {
        let url = null;
        if (type === "all") url = "/api/books";
        if (type === "borrowed") url = "/api/books/borrowed";
        if (type === "remaining") url = "/api/books/remaining";

        console.log(">>> check url from fetchData: ", url);

        setIsLoading(true);

        await axios({
            method: "get",
            url: "/api/books",
            headers: { username: localStorage.getItem("username") },
        })
            .then((res) => {
                console.log(res);

                setTimeout(() => {
                    setInitListBooks(res.data);
                    setListBooks(res.data);
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
                url: "/api/books",
                headers: { username: localStorage.getItem("username") },
            })
                .then((res) => {
                    console.log(res);

                    setTimeout(() => {
                        setInitListBooks(res.data);
                        setListBooks(res.data);
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
            {showModalAddNewBook && (
                <ModalAddNewBook
                    isSucceed={handleAddNewBookSucceed}
                    isClose={handleCloseModal}
                />
            )}

            <div className="container py-3">
                <div className="row">
                    <div className="col-12">
                        <h5>
                            <i className="fas fa-book mr-2"></i>Quản lý sách
                        </h5>
                        <hr></hr>
                    </div>
                    <div className="col-sm-7">
                        <button
                            className="btn btn-primary m-1 px-3"
                            onClick={() => handleShowModal("ADD_NEW_BOOK")}
                        >
                            <i className="fas fa-plus mr-2"></i>Thêm mới
                        </button>
                    </div>
                    <div className="col-sm-5">
                        <div className="input-group m-1">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm sách..."
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
                                        onClick={() =>
                                            handleChangeTypeView("all")
                                        }
                                    >
                                        Tất cả
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            "btn btn-primary " +
                                            (typeView === "borrowed" &&
                                                "active")
                                        }
                                        onClick={() =>
                                            handleChangeTypeView("borrowed")
                                        }
                                    >
                                        Đang mượn
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            "btn btn-primary " +
                                            (typeView === "remaining" &&
                                                "active")
                                        }
                                        onClick={() =>
                                            handleChangeTypeView("remaining")
                                        }
                                    >
                                        Hiện còn
                                    </button>
                                </div>
                            </div>

                            <div className="table-container">
                                <table className="table table-sm table-hover table-sm-responsive table-fix-head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tiêu đề</th>
                                            <th>Thể loại</th>
                                            <th>Năm xuất bản</th>
                                            <th>Số lượng</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading && (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="text-center"
                                                >
                                                    Đang tải dữ liệu...
                                                </td>
                                            </tr>
                                        )}

                                        {!isLoading &&
                                            listBooks &&
                                            listBooks.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.tensach}</td>
                                                    <td>{item.tentheloai}</td>
                                                    <td>{item.namxuatban}</td>
                                                    <td>{item.soluong}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-success m-1">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-primary m-1">
                                                            <i className="fas fa-pen"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-danger m-1">
                                                            <i className="fas fa-trash-alt"></i>
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

export default connect(mapStateToProps)(BookArea);
