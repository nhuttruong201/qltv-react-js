import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalAddNewBook = (props) => {
    const handleAddNew = () => {
        // when succeed

        let newBook = {
            masach: 2,
            tensach: "Truyện Kiều",
            soluong: 100,
            namxuatban: 2022,
            tentheloai: "Truyện",
        };

        props.isSucceed(newBook);
    };

    return (
        <>
            <Modal isOpen={true} size={"lg"} centered={true} autoFocus={false}>
                <ModalHeader>Thêm sách</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Tên sách</label>
                        <input
                            type={"text"}
                            placeholder={"nhập tên sách..."}
                            maxLength={255}
                            className="form-control"
                            autoFocus
                        />
                    </div>

                    {/* {errMsg && <ShowNoti isError={true} message={errMsg} />}
                    {okMsg && <ShowNoti isError={false} message={okMsg} />} */}
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
                        onClick={() => props.isClose("ADD_NEW_BOOK")}
                    >
                        Đóng
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ModalAddNewBook;
