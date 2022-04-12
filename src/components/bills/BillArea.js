import axios from "../../configs/axios";
import { useEffect, useState } from "react";
import ModalPayBill from "../books/modals/ModalPayBIll";
import { Link } from "react-router-dom";
import ModalViewBillDetail from "./modals/ModalViewBillDetail";

const BillArea = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [initListBills, setInitListBills] = useState([]);
    const [listBills, setListBills] = useState([]);
    const [typeView, setTypeView] = useState("all");
    const [readerInfo, setReaderInfo] = useState({});
    const [showModalPayBill, setShowModalPayBill] = useState(false);
    const [showModalViewBillDetail, setShowModalViewBillDetail] =
        useState(false);
    const [billDetail, setBillDetail] = useState({});

    const handleChangeTypeView = (typeView) => {
        // fetchData(typeView);
        setTypeView(typeView);
        setIsLoading(true);

        if (typeView === "wait-pay") {
            setListBills(
                initListBills.filter((item) => item.dathanhtoan === false)
            );
        }

        if (typeView === "all") {
            setListBills(initListBills);
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleOnChangeSearch = (e) => {
        const strSearch = String(e.target.value).toLowerCase();
        setListBills(
            initListBills.filter((item) => {
                let isPayed = item.dathanhtoan ? "Đã thanh toán" : "Đang chờ";
                let ngaytra = item.ngaytra ? item.ngaytra : "Đang chờ";
                return (
                    isPayed.toLowerCase().includes(strSearch) ||
                    ngaytra.toLowerCase().includes(strSearch) ||
                    item.ngaymuon.toLowerCase().includes(strSearch) ||
                    item.hantra.toLowerCase().includes(strSearch) ||
                    String(item.mathe).toLowerCase().includes(strSearch) ||
                    String(item.manhanvien).toLowerCase().includes(strSearch) ||
                    String(item.maphieumuon).toLowerCase().includes(strSearch)
                );
            })
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: "get",
                url: "/api/bills",
                headers: { username: localStorage.getItem("username") },
            })
                .then((res) => {
                    console.log("BillArea fetchData: ", res);
                    const data = res.data.reverse();

                    setTimeout(() => {
                        setInitListBills(data);
                        setListBills(data);
                        setIsLoading(false);
                    }, 1000);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchData();
    }, []);

    const handlePayBillSucceed = async () => {
        setShowModalPayBill(false);
        setIsLoading(true);

        await axios({
            method: "get",
            url: "/api/bills",
            headers: { username: localStorage.getItem("username") },
        })
            .then((res) => {
                console.log("handlePayBillSucceed: ", res);
                const data = res.data.reverse();

                setTimeout(() => {
                    setInitListBills(data);
                    setListBills(data);
                    setIsLoading(false);
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getReaderInfo = async (readerId) => {
        await axios({
            method: "get",
            url: "/api/readers/" + readerId,
            headers: { username: localStorage.getItem("username") },
        })
            .then((res) => {
                //* checked
                // lưu thông tin độc giả
                setReaderInfo({
                    readerId: res.data.mathe,
                    fullName: res.data.hoten,
                    gender: res.data.gioitinh,
                    phoneNumber: res.data.sdt,
                });
            })
            .catch((err) => {
                console.log("getReaderInfo err: ", err);
            });
    };

    const handleShowModalPayBill = async (objBill) => {
        await getReaderInfo(objBill.mathe);
        setShowModalPayBill(true);
    };

    const handleViewBillDetail = async (objBill) => {
        await getReaderInfo(objBill.mathe);
        setBillDetail(objBill);
        setShowModalViewBillDetail(true);
    };

    return (
        <>
            {showModalPayBill && (
                <ModalPayBill
                    readerInfo={readerInfo}
                    isClose={() => setShowModalPayBill(false)}
                    isSucceed={handlePayBillSucceed}
                />
            )}

            {showModalViewBillDetail && (
                <ModalViewBillDetail
                    readerInfo={readerInfo}
                    billDetail={billDetail}
                    isClose={() => setShowModalViewBillDetail(false)}
                />
            )}

            <div className="container py-3">
                <div className="row">
                    <div className="col-12">
                        <h5>
                            <i className="fas fa-id-card-alt mr-3"></i>Quản lý
                            phiếu mượn
                        </h5>
                        <hr></hr>
                    </div>
                    <div className="col-sm-7">
                        <Link to={"muon-sach"}>
                            <button className="btn btn-primary m-1 px-3">
                                <i className="fas fa-plus mr-2"></i>Thêm mới
                            </button>
                        </Link>
                    </div>
                    <div className="col-sm-5">
                        <div className="input-group m-1">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm phiếu mượn..."
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
                                            (typeView === "wait-pay" &&
                                                "active")
                                        }
                                        onClick={() =>
                                            handleChangeTypeView("wait-pay")
                                        }
                                    >
                                        Chưa thanh toán
                                    </button>
                                </div>
                            </div>

                            <div className="table-container">
                                <table className="table table-sm table-hover table-sm-responsive table-fix-head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Mã PM</th>
                                            <th>Ngày mượn</th>
                                            <th>Hạn trả</th>
                                            <th>Ngày trả</th>
                                            <th>Thanh toán</th>
                                            <th>Mã ĐG</th>
                                            <th>Mã NV</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading && (
                                            <tr>
                                                <td
                                                    colSpan="9"
                                                    className="text-center"
                                                >
                                                    Đang tải dữ liệu...
                                                </td>
                                            </tr>
                                        )}

                                        {!isLoading &&
                                            listBills &&
                                            listBills.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.maphieumuon}</td>
                                                    <td>{item.ngaymuon}</td>
                                                    <td>{item.hantra}</td>
                                                    <td>
                                                        {item.ngaytra
                                                            ? item.ngaytra
                                                            : "Đang chờ"}
                                                    </td>
                                                    <td
                                                        className={
                                                            item.dathanhtoan
                                                                ? "text-success"
                                                                : "text-danger"
                                                        }
                                                    >
                                                        {item.dathanhtoan
                                                            ? "Đã thanh toán"
                                                            : "Đang chờ"}
                                                    </td>
                                                    <td>{item.mathe}</td>
                                                    <td>{item.manhanvien}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-success m-1"
                                                            onClick={() => {
                                                                handleViewBillDetail(
                                                                    item
                                                                );
                                                            }}
                                                        >
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        {typeView ===
                                                            "wait-pay" && (
                                                            <button
                                                                className="btn btn-sm btn-primary m-1"
                                                                onClick={() =>
                                                                    handleShowModalPayBill(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-cart-plus"></i>
                                                            </button>
                                                        )}
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

export default BillArea;
