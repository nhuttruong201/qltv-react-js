import axios from "../../../configs/axios";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalPayBill = (props) => {
    let { readerId, fullName, gender, phoneNumber } = props.readerInfo;

    const [listBillDetails, setListBillDetails] = useState([]);
    const [billPayId, setBillPayId] = useState(null);

    const handlePayBill = async () => {
        // alert("handlePayBill");
        // body: billPayId, readerId
        await axios({
            method: "post",
            url: "/api/bills/pay",
            headers: { username: localStorage.getItem("username") },
            data: {
                maphieumuon: billPayId,
                mathe: readerId,
            },
        })
            .then((res) => {
                console.log("handlePayBill: ", res);
                props.isSucceed();
            })
            .catch((err) => {
                console.log("handlePayBill: ", err);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: "get",
                url: "/api/bill-detail/wait-pay/" + readerId,
                headers: { username: localStorage.getItem("username") },
            })
                .then((res) => {
                    console.log("fetch from pay bill: ", res);
                    setListBillDetails(res.data);
                    setBillPayId(res.data[0].maphieumuon);
                })
                .catch((err) => {
                    console.log("fetch from pay bill: ", err);
                });
        };

        fetchData();
    }, []);

    return (
        <>
            <Modal isOpen={true} size={"lg"} centered={true} autoFocus={false}>
                <ModalHeader>Thanh toán phiếu mượn</ModalHeader>
                <ModalBody>
                    <div className="container pr-4">
                        <div className="row bg-white">
                            <div className="col-12">
                                <h6 className="text-primary">
                                    Thông tin độc giả
                                </h6>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Mã độc giả</th>
                                            <th>Họ tên</th>
                                            <th>Giới tính</th>
                                            <th>SDT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{readerId}</td>
                                            <td>{fullName}</td>
                                            <td>{gender ? "Nam" : "Nữ"}</td>
                                            <td>{phoneNumber}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12">
                                <h6 className="text-primary">
                                    Thông tin phiếu mượn
                                </h6>
                                <div>
                                    <table className="table table-sm table-hover table-sm-responsive">
                                        <thead>
                                            <tr>
                                                <th>Mã PM</th>
                                                <th>Tên sách</th>
                                                <th>Số lượng</th>
                                                <th>Ngày mượn</th>
                                                <th>Hạn trả</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listBillDetails &&
                                                listBillDetails.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {
                                                                    item.maphieumuon
                                                                }
                                                            </td>
                                                            <td>
                                                                {item.tensach}
                                                            </td>
                                                            <td>
                                                                {item.soluong}
                                                            </td>
                                                            <td>
                                                                {item.ngaymuon}
                                                            </td>
                                                            <td>
                                                                {item.hantra}
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
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-primary btn-sm px-4"
                        onClick={() => handlePayBill()}
                    >
                        Thanh toán
                    </button>{" "}
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => props.isClose()}
                    >
                        Huỷ
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ModalPayBill;
