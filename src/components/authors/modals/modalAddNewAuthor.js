import axios from "../../../configs/axios";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalAddNewAuthor = (props) => {
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
            url: "api/authors/add-new",
            header: {
                username: localStorage.getItem("username"),
            },
            data: {
                tentacgia: titleInput,
            },
        })
            .then((res) => {
                console.log("check handleAddNewAuthor:", res.data);
                props.isSucceed(res.data.reverse());
            })
            .catch((err) => {
                console.log("check handleAddNewAuthor:", err);
            });
    };
    return (
        <>
            <Modal isOpen={true} size={"lg"} centered={true} autoFocus={false}>
                <ModalHeader>Thêm Tác giả</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-12">
                            {errMsg && <p className="text-danger">{errMsg}</p>}
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label>Tên tác giả</label>
                                <input
                                    type={"text"}
                                    value={titleInput}
                                    onChange={(e) =>
                                        setTitleInput(e.target.value)
                                    }
                                    placeholder={"tên tác giả..."}
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
                        onClick={() => props.isClose("ADD_NEW_AUTHOR")}
                    >
                        Đóng
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
};
export default ModalAddNewAuthor;
