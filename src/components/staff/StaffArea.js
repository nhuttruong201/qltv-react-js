import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "../../configs/axios";
import ModalStaff from "./modals/ModalStaff";
const StaffArea = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [initListStaffs, setInitListStaffs] = useState([]);
    const [listStaffs, setListStaffs] = useState([]);
    const [showModalAddNewStaff, setShowModalAddNewStaff] = useState(false);
    const [showModalEditStaff, setShowModalEditStaff] = useState(false);
    const [dataEditStaff, setDataEditStaff] = useState([]);

    const handleShowModal = (modalName) => {
        if (modalName === "ADD_NEW_STAFF") {
            setShowModalAddNewStaff(true);
        }
    };
    const handleCloseModal = (modalName) => {
        if (modalName === "ADD_NEW_STAFF") {
            setShowModalAddNewStaff(false);
        }
        if (modalName === "EDIT_STAFF") {
            setShowModalEditStaff(false);
        }
    };
    const handleEditStaff = (staffEdit) => {
        setShowModalEditStaff(true);
        setDataEditStaff(staffEdit);
    };

    const onChangeInputSearch = (e) => {
        let strSearch = e.target.value.toLowerCase();
        // console.log(strSearch);
        setListStaffs(
            initListStaffs.filter((item) => {
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

    const handleAddNewStaffSucceed = (newListStaff) => {
        console.log(">>> handleAddNewStaffSucceed: ", newListStaff);
        setShowModalAddNewStaff(false);
        setInitListStaffs(newListStaff);
        setListStaffs(newListStaff);
    };

    const fetchData = async (type) => {
        let url = null;
        if (type === "all") url = "/api/staffs";
        console.log(">>> check url from fetchData: ", url);
        setIsLoading(true);
        await axios({
            method: "GET",
            url: "/api/staffs",
            headers: { username: localStorage.getItem("username") },
        })
            .then((res) => {
                console.log("fetch data readers: ", res);
                setTimeout(() => {
                    setInitListStaffs(res.data);
                    setListStaffs(res.data);
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
                url: "/api/staffs",
                headers: { username: localStorage.getItem("username") },
            })
                .then((res) => {
                    console.log("useEffect fetchData Staff:", res);
                    const data = res.data.reverse();
                    setTimeout(() => {
                        setListStaffs(data);
                        setInitListStaffs(data);
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
        setShowModalEditStaff(false);
        setIsLoading(true);
        setTimeout(() => {
            setInitListStaffs(newListReaders);
            setListStaffs(newListReaders);
            setIsLoading(false);
        }, 1000);
    };
    return (
        <>
            {showModalAddNewStaff && (
                <ModalStaff
                    type="ADD_NEW_STAFF"
                    title="Thêm nhân viên"
                    isSucceed={handleAddNewStaffSucceed}
                    isClose={handleCloseModal}
                />
            )}
            {showModalEditStaff && (
                <ModalStaff
                    type="EDIT_STAFF"
                    title="Chỉnh sửa nhân viên"
                    isSucceed={handleEditReaderSucceed}
                    isClose={handleCloseModal}
                    data={dataEditStaff}
                />
            )}
            <div className="container py-3">
                <div className="row">
                    <div className="col-12">
                        <h5>
                            <i className="fas fa-book-reader mr-3"></i>
                            Quản lý nhân viên
                        </h5>
                        <hr></hr>
                    </div>
                    <div className="col-sm-7">
                        <button
                            className="btn btn-primary mt-1 px-3"
                            onClick={() => handleShowModal("ADD_NEW_STAFF")}
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Thêm mới
                        </button>
                    </div>
                    <div className="col-sm-5">
                        <div className="input-group m-1">
                            <input
                                onChange={(e) => onChangeInputSearch(e)}
                                type="text"
                                className="form-control"
                                placeholder="tìm nhân viên"
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
                                    {/* <button className="btn btn-primary">
                                    Đang mượn
                                </button> */}
                                </div>
                            </div>

                            <div className="table-container">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Email</th>
                                            <th>Họ tên</th>
                                            <th>Giới tính</th>
                                            <th>SĐT</th>
                                            <th>Địa chỉ</th>
                                            <th>Chức vụ</th>
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
                                            listStaffs &&
                                            listStaffs.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.hoten}</td>
                                                    <td>
                                                        {item.gioitinh
                                                            ? "Nam"
                                                            : "Nữ"}
                                                    </td>
                                                    <td>{item.sdt}</td>
                                                    <td>{item.diachi}</td>
                                                    <td>
                                                        {item.chucvu.tenchucvu}
                                                    </td>
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
                                                                handleEditStaff(
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
export default connect(mapStateToProps)(StaffArea);
