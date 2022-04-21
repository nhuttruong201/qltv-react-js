import axios from "../../configs/axios";
import { useEffect, useState } from "react";
import ModalCategory from "./modals/ModalCategory";
const CategoryArea = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [initListCategories, setInitListCategories] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [typeView, setTypeView] = useState("all");
    const [showModalAddNewCategory, setShowModalAddNewCategory] =
        useState(false);
    const [showModalEditCategory, setShowModalEditCategory] = useState(false);

    const [dataEditCategory, setDataEditCategory] = useState({});

    const handleOnChangeSearch = (e) => {
        let strSearch = e.target.value.toLowerCase();
        setListCategories(
            initListCategories.filter((item) => {
                return item.tentheloai.toLowerCase().includes(strSearch);
            })
        );
    };

    const handleChangeTypeView = (typeView) => {
        fetchData(typeView);
        setTypeView(typeView);
    };
    const handleShowModalEditCategory = (CategoryEdit) => {
        setShowModalEditCategory(true);
        setDataEditCategory(CategoryEdit);
    };
    const handleShowModal = (modalName) => {
        if (modalName === "ADD_NEW_Category") {
            setShowModalAddNewCategory(true);
        }
    };
    const handleCloseModal = (modalName) => {
        if (modalName === "ADD_NEW_Category") {
            setShowModalAddNewCategory(false);
        }
        if (modalName === "EDIT_Category") {
            setShowModalEditCategory(false);
        }
    };

    const handleEditCategoriesucceed = (newListCategories) => {
        // alert("handleEditCategoriesucceed");
        console.log(">>> handleEditCategoriesucceed: ", newListCategories);
        setShowModalEditCategory(false);
        setInitListCategories(newListCategories);
        setListCategories(newListCategories);
    };
    const handleAddNewCategoriesuccesseed = (newListCategories) => {
        // alert("handleAddNewCategoriesucceed");
        console.log(">>> handleAddNewCategoriesucceed: ", newListCategories);
        setShowModalAddNewCategory(false);
        setInitListCategories(newListCategories);
        setListCategories(newListCategories);
    };
    const fetchData = async (type) => {
        let url = null;
        if (type === "all") url = "/api/Categories";
        console.log(">> check url from fetchData:", url);

        setIsLoading(true);

        await axios({
            method: "get",
            url: "/api/Categories",
            headers: { username: localStorage.getItem("username") },
        })
            .then((res) => {
                console.log("fetchData: ", res);

                setTimeout(() => {
                    setListCategories(res.data);
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
                url: "/api/Categories",
                headers: { username: localStorage.getItem("username") },
            })
                .then((res) => {
                    console.log("useEffect fetchData: ", res);
                    const data = res.data.reverse();

                    setTimeout(() => {
                        setInitListCategories(data);
                        setListCategories(data);
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
            {showModalAddNewCategory && (
                <ModalCategory
                    type="ADD_NEW_Category"
                    title="Thêm thể loại"
                    isSucceed={handleAddNewCategoriesuccesseed}
                    isClose={handleCloseModal}
                />
            )}
            {showModalEditCategory && (
                <ModalCategory
                    type="EDIT_Category"
                    title="Sửa thể loại"
                    isSucceed={handleEditCategoriesucceed}
                    isClose={handleCloseModal}
                    data={dataEditCategory}
                />
            )}
            <div className="container py-3">
                <div className="row">
                    <div className="col-12">
                        <h5>
                            <i className="fab fa-elementor mr-3"></i>Quản lý thể
                            loại
                        </h5>
                        <hr></hr>
                    </div>
                    <div className="col-sm-7">
                        <button
                            className="btn btn-primary m-1 px-3"
                            onClick={() => handleShowModal("ADD_NEW_Category")}
                        >
                            <i className="fas fa-plus mr-2"></i>Thêm mới
                        </button>
                    </div>
                    <div className="col-sm-5">
                        <div className="input-group m-1">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm thể loại"
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
                                            <th>Tên thể loại</th>
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
                                            listCategories &&
                                            listCategories.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {item.tentheloai}
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-primary m-1"
                                                                onClick={() =>
                                                                    handleShowModalEditCategory(
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
export default CategoryArea;
