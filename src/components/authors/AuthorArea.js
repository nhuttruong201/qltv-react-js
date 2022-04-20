import axios from "../../configs/axios";
import { useEffect, useState } from "react";
import ModalAuthor from "./modals/modalAuthor";
const AuthorArea = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [initListAuthors, setInitListAuthors] = useState([]);
    const [listAuthors, setListAuthors] = useState([]);
    const [typeView, setTypeView] = useState("all");
    const [showModalAddNewAuthor, setShowModalAddNewAuthor] = useState(false);
    const [showModalEditAuthor, setShowModalEditAuthor] = useState(false);

    const [dataEditAuthor, setDataEditAuthor] = useState({});

    const handleOnChangeSearch = (e) => {
        let strSearch = e.target.value.toLowerCase();
        setListAuthors(
            initListAuthors.filter((item) => {
                return item.tentacgia.toLowerCase().includes(strSearch);
            })
        );
    };

    const handleChangeTypeView = (typeView) => {
        fetchData(typeView);
        setTypeView(typeView);
    };
    const handleShowModalEditAuthor = (authorEdit) => {
        setShowModalEditAuthor(true);
        setDataEditAuthor(authorEdit);
    };
    const handleShowModal = (modalName) => {
        if (modalName === "ADD_NEW_AUTHOR") {
            setShowModalAddNewAuthor(true);
        }
    };
    const handleCloseModal = (modalName) => {
        if (modalName === "ADD_NEW_AUTHOR") {
            setShowModalAddNewAuthor(false);
        }
        if (modalName === "EDIT_AUTHOR") {
            setShowModalEditAuthor(false);
        }
    };

    const handleEditAuthorSucceed = (newListAuthors) => {
        // alert("handleEditAuthorSucceed");
        console.log(">>> handleEditAuthorSucceed: ", newListAuthors);
        setShowModalEditAuthor(false);
        setInitListAuthors(newListAuthors);
        setListAuthors(newListAuthors);
    };
    const handleAddNewAuthorSuccesseed = (newListAuthors) => {
        // alert("handleAddNewAuthorSucceed");
        console.log(">>> handleAddNewAuthorSucceed: ", newListAuthors);
        setShowModalAddNewAuthor(false);
        setInitListAuthors(newListAuthors);
        setListAuthors(newListAuthors);
    };
    const fetchData = async (type) => {
        let url = null;
        if (type === "all") url = "/api/authors";
        console.log(">> check url from fetchData:", url);

        setIsLoading(true);

        await axios({
            method: "get",
            url: "/api/authors",
            headers: { username: localStorage.getItem("username") },
        })
            .then((res) => {
                console.log("fetchData: ", res);

                setTimeout(() => {
                    setListAuthors(res.data);
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
                url: "/api/authors",
                headers: { username: localStorage.getItem("username") },
            })
                .then((res) => {
                    console.log("useEffect fetchData: ", res);
                    const data = res.data.reverse();

                    setTimeout(() => {
                        setInitListAuthors(data);
                        setListAuthors(data);
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
            {showModalAddNewAuthor && (
                <ModalAuthor
                    type="ADD_NEW_AUTHOR"
                    title="Thêm Tác giả"
                    isSucceed={handleAddNewAuthorSuccesseed}
                    isClose={handleCloseModal}
                />
            )}
            {showModalEditAuthor && (
                <ModalAuthor
                    type="EDIT_AUTHOR"
                    title="Sửa tác giả"
                    isSucceed={handleEditAuthorSucceed}
                    isClose={handleCloseModal}
                    data={dataEditAuthor}
                />
            )}
            <div className="container py-3">
                <div className="row">
                    <div className="col-12">
                        <h5>
                            <i className="fas fa-user-tie mr-2"></i>Quản lý tác
                            giả
                        </h5>
                        <hr></hr>
                    </div>
                    <div className="col-sm-7">
                        <button
                            className="btn btn-primary m-1 px-3"
                            onClick={() => handleShowModal("ADD_NEW_AUTHOR")}
                        >
                            <i className="fas fa-plus mr-2"></i>Thêm mới
                        </button>
                    </div>
                    <div className="col-sm-5">
                        <div className="input-group m-1">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm tác giả"
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
                                            <th>Tên tác giả</th>
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
                                            listAuthors &&
                                            listAuthors.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.tentacgia}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-primary m-1"
                                                            onClick={() =>
                                                                handleShowModalEditAuthor(
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
// const mapStateToProps = (state) => {
//     return {
//         userInfo: state.userInfo,
//     };
// };
export default AuthorArea;
