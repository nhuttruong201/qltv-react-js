import axios from "../../../configs/axios";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalAddNewCategory = (props) => {
    const [errMsg, setErrMsg] = useState(null);

    const [titleInput, setTitleInput] = useState("");

    const handleAddNew = async () => {
        if (!titleInput) {
            setErrMsg("Bạn chưa nhập đủ thông tin!");
            setTimeout(() => {
                setErrMsg(null);
            }, 3000);
            return;
        }
        await axios({
            method: "post",
            url: "api/Categories/add-new",
            header: {
                username: localStorage.getItem("username"),
            },
            data: {
                tentheloai: titleInput,
            },
        })
            .then((res) => {
                console.log("check handleAddNewCategory:", res.data);
                props.isSucceed(res.data.reverse());
            })
            .catch((err) => {
                console.log("check handleAddNewCategory:", err);
            });
    };
    return (
        <>
            <Modal isOpen={true} size={"lg"} centered={true} autoFocus={false}>
                <ModalHeader>Thêm thể loại</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-12">
                            {errMsg && <p className="text-danger">{errMsg}</p>}
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label>Tên thể loại</label>
                                <input
                                    type={"text"}
                                    value={titleInput}
                                    onChange={(e) =>
                                        setTitleInput(e.target.value)
                                    }
                                    placeholder={"tên thể loại..."}
                                    maxLength={255}
                                    required
                                    className="form-control"
                                    autoFocus
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-primary btn-sm px-4"
                        onClick={() => handleAddNew()}
                    >
                        Thêm mới
                    </button>{" "}
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => props.isClose("ADD_NEW_Category")}
                    >
                        Đóng
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
};
export default ModalAddNewCategory;
