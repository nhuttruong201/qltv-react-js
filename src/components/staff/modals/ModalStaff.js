import { useEffect, useState } from "react";
import axios from "../../../configs/axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalNewReader = (props) => {
    const [errMsg, setErrMsg] = useState(null);
    const [position, setPosition] = useState([]);
    const [inputPassword, setInputPassword] = useState(
        props.data ? props.data.password : ""
    );
    const [inputEmail, setInputEmail] = useState(
        props.data ? props.data.email : ""
    );

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
    const [inputPosition, setInputPosition] = useState(
        props.data ? props.data.chucvu.machucvu : ""
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
            url: `/api/staffs/${
                props.type === "ADD_NEW_STAFF" ? "add-new" : "edit-staff"
            }`,
            headers: {
                username: localStorage.getItem("username"),
            },
            data: {
                manhanvien: props.data ? props.data.manhanvien : 0,
                email: inputEmail,
                matkhau: inputPassword,
                hoten: inputName,
                gioitinh: parseInt(inputGender) === 1 ? true : false,
                sdt: inputPhone,
                diachi: inputAddress,
                dabikhoa: props.data ? props.data.dabikhoa : 0,
                machucvu: inputPosition,
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
    useEffect(() => {
        const fetchDataStaffInfo = async () => {
            await axios({
                method: "get",
                url: "/api/staffs/staff-info",
                headers: { username: localStorage.getItem("username") },
            })
                .then((res) => {
                    console.log("fetchDataStaffInfo: ", res);
                    setPosition(res.data.positions);

                    if (props.type === "ADD_NEW_STAFF") {
                        // * khởi tạo giá trị input
                        setInputPosition(
                            res.data.position && res.data.position[0].machucvu
                        );
                    }
                })
                .catch((err) => {
                    console.log("fetchDataStaffInfo: ", err);
                });
        };

        fetchDataStaffInfo();
    }, []);

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
                            <label>Email</label>
                            <input
                                type={"email"}
                                value={inputEmail}
                                onChange={(e) => setInputEmail(e.target.value)}
                                placeholder={"email..."}
                                maxLength={50}
                                required
                                className="form-control"
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input
                                type={"password"}
                                value={inputPassword}
                                onChange={(e) =>
                                    setInputPassword(e.target.value)
                                }
                                placeholder={"mật khẩu..."}
                                maxLength={50}
                                required
                                className="form-control"
                                autoFocus
                            />
                        </div>
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
                    <div className="col-12">
                        <div className="form-group">
                            <label>Chức vụ</label>
                            <select
                                value={inputPosition}
                                onChange={(e) => {
                                    setInputPosition(e.target.value);
                                }}
                                className="form-control"
                            >
                                {position &&
                                    position.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item.machucvu}
                                        >
                                            {item.tenchucvu}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button
                    className="btn btn-primary btn-sm px-4"
                    onClick={() => handleSubmit()}
                >
                    {props.type === "ADD_NEW_STAFF" ? "Thêm mới" : "Cập nhập"}
                </button>

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
