import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "../../../configs/axios";
const ModalDetails = (props) => {
    const [listStaffDetails, setListStaffDetails] = useState([]);
    let { readerId, fullName, gender, phoneNumber } = props.readerInfo;
    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: "get",
                url: "/api/staffs/staff-detail/",
                headers: { username: localStorage.getItem("username") },
            })
                .then((res) => {
                    console.log("fetch from staff detail: ", res);
                    setListStaffDetails(res.data);
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
                                                <th>SL</th>
                                                <th>Ngày mượn</th>
                                                <th>Hạn trả</th>
                                                <th>Ngày trả</th>
                                                <th>Thanh toán</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listStaffDetails &&
                                                listStaffDetails.map(
                                                    (item, index) => (
                                                        <tr key={index}></tr>
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
                        className="btn btn-secondary btn-sm"
                        onClick={() => props.isClose()}
                    >
                        Đóng
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
};
export default ModalDetails;
