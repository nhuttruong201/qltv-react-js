import axios from "../../../configs/axios";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalCategory = (props) => {
    const [errMsg, setErrMsg] = useState(null);
    const [titleInput, setTitleInput] = useState(
        props.data ? props.data.tentheloai : ""
    );
    console.log("check prop data from Modal: ", props.data);
    const handleSubmit = async () => {
        if (!titleInput) {
            setErrMsg("Bạn chưa điền đủ thông tin");
            setTimeout(() => {
                setErrMsg(null);
            }, 3000);
            return;
        }
        await axios({
            method: "post",
            url: `/api/Categories/${
                props.type === "ADD_NEW_Category" ? "add-new" : "edit-Category"
            }`,
            headers: {
                username: localStorage.getItem("username"),
            },
            data: {
                matheloai: props.data ? props.data.matheloai : 0,
                tentheloai: titleInput,
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
        <Modal isOpen={true} size={"lg"} cetered={true} autoFocus={false}>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-12">
                        {errMsg && <p className="text-danger">{errMsg}</p>}
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label>Tên thể loại </label>
                            <input
                                type={"text"}
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                                placeholder={"tên thể loại"}
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
                    onClick={() => handleSubmit()}
                >
                    {props.type === "ADD_NEW_Category"
                        ? "Thêm mới"
                        : "Cập nhật"}
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
export default ModalCategory;
