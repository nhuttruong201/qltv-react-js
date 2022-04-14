import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalViewBookDetail = (props) => {
    // console.log("props book detail: ", props);
    let { bookDetail } = props;

    return (
        <>
            <Modal isOpen={true} size={"lg"} centered={true} autoFocus={false}>
                <ModalHeader>Chi tiết sách</ModalHeader>
                <ModalBody>
                    <h5 className="text-center">{bookDetail.tensach}</h5>
                    <h6 className="text-center">
                        {bookDetail.tacgia.tentacgia}
                    </h6>
                    <table className="table table-sm table-hover table-sm-responsive table-fix-head mt-4">
                        <thead>
                            <tr>
                                <th>Mã sách</th>
                                <th>Thể loại</th>
                                <th>Nhà XB</th>
                                <th>Năm XB</th>
                                <th>SL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{bookDetail.masach}</td>
                                <td>{bookDetail.theloai.tentheloai}</td>
                                <td>{bookDetail.nhaxuatban.tennxb}</td>
                                <td>{bookDetail.namxuatban}</td>
                                <td>{bookDetail.soluong}</td>
                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-primary btn-sm px-4"
                        onClick={() => props.editBook()}
                    >
                        Sửa sách
                    </button>{" "}
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => props.isClose(props.type)}
                    >
                        Đóng
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ModalViewBookDetail;
