import { useEffect, useState } from "react";
import "../cssReaders.css";
import axios from "../../../configs/axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
const ModalNewReader = (props) => {
    const [errMsg, setErrMsg] = useState(null);
    const [inputName, setInputName] = useState(
        props.data ? props.data.hoten : ""
    );
    const [inputPhone, setInputPhone] = useState(
        props.data ? props.data.sdt : ""
    );
    const [inputAddress, setInputAddress] = useState(
        props.data ? props.data.diachi : ""
    );
    const [inputGender, setInputGender] = useState(
        props.data ? props.data.gioitinh : 1
    );
    const [inputCCCD, setInputCCCD] = useState(
        props.data ? props.data.cccd : ""
    );
    console.log(">> check prop data from Modal: ", props);
    const handleSubmit = async () => {
        if (!inputName || !inputPhone || !inputAddress) {
            setErrMsg("Bạn chưa nhập đủ thông tin!");
            setTimeout(() => {
                setErrMsg("null");
            }, 1000);
            return;
        }
        await axios({
            method: "post",
            url: `/api/readers/${
                props.type === "ADD_NEW_READER" ? "add-new" : "edit-reader"
            }`,
            headers: {
                username: localStorage.getItem("username"),
            },
            data: {
                mathe: props.data ? props.data.mathe : 0,
                dabikhoa: props.data ? props.data.dabikhoa : 0,
                hoten: inputName,
                gioitinh: parseInt(inputGender) === 1 ? true : false,
                sdt: inputPhone,
                diachi: inputAddress,
                cccd: inputCCCD,
            },
        })
            .then((res) => {
                console.log("handleSubmit: ", res.data);
                props.isSucceed(res.data.reverse());
            })
            .catch((err) => {
                console.log("handleSubmit: ", err);
            });
    };

    return (
        <Modal isOpen={true} size={"lg"} centered={true} autoFocus={false}>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-12">
                        {errMsg && <p className="text-danger">{errMsg}</p>}
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Họ tên</label>
                            <input
                                type={"text"}
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                                placeholder={"họ tên..."}
                                maxLength={50}
                                required
                                className="form-control"
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Giới tính</label>
                            <select
                                value={inputGender}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setInputGender(e.target.value);
                                }}
                                className="form-control"
                            >
                                <option value="1">Nam</option>
                                <option value="0">Nữ</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-group">
                            <label>SĐT</label>
                            <input
                                value={inputPhone}
                                onChange={(e) => setInputPhone(e.target.value)}
                                type="number"
                                placeholder="sdt..."
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input
                                value={inputAddress}
                                onChange={(e) =>
                                    setInputAddress(e.target.value)
                                }
                                type="text"
                                placeholder="địa chỉ..."
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>CCCD</label>
                            <input
                                value={inputCCCD}
                                onChange={(e) => setInputCCCD(e.target.value)}
                                type="text"
                                placeholder="CCCD..."
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button
                    className="btn btn-primary btn-sm px-4"
                    onClick={() => handleSubmit()}
                >
                    Cập nhập mới
                </button>{" "}
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => props.isClose(props.type)}
                >
                    Đóng
                </button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalNewReader;
