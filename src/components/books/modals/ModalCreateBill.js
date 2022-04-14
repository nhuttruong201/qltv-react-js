import axios from "../../../configs/axios";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { connect } from "react-redux";

const ModalCreateBill = (props) => {
    let { readerId, fullName, gender, phoneNumber } = props.readerInfo;

    const [errMsg, setErrMsg] = useState(null);

    const [listBooks, setListBooks] = useState([]);
    const [listBookInBill, setListBookInBill] = useState([]);

    const [total, setTotal] = useState(1);
    const [bookAddBill, setBookAddBill] = useState({});
    // const [bookNameAddBill, setBook]

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: "get",
                url: "/api/books",
                headers: { username: localStorage.getItem("username") },
            })
                .then((res) => {
                    console.log("useEffect fetchData: ", res);
                    const data = res.data.reverse();
                    setListBooks(data);

                    setBookAddBill({
                        masach: data[0].masach,
                        tensach: data[0].tensach,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchData();
    }, []);

    const handleSelectBookToBill = (e) => {
        console.log(e.target.options[e.target.selectedIndex].text);
        let id = parseInt(e.target.value);
        let text = e.target.options[e.target.selectedIndex].text;
        setBookAddBill({ masach: id, tensach: text });
    };

    const handleAddBookToBill = () => {
        console.log("Book add bill: ", bookAddBill);
        console.log("Total: ", total);

        // check số lượng
        for (let i = 0; i < listBooks.length; i++) {
            if (listBooks[i].masach === bookAddBill.masach) {
                if (listBooks[i].soluong < parseInt(total)) {
                    setErrMsg(
                        "Số lượng sách không đủ! Hiện còn: " +
                            listBooks[i].soluong
                    );

                    setTimeout(() => {
                        setErrMsg(null);
                    }, 3000);

                    return;
                }
            }
        }

        // check exist
        let isExist = false;
        for (let i = 0; i < listBookInBill.length; i++) {
            if (listBookInBill[i].masach === bookAddBill.masach) {
                isExist = true;
                break;
            }
        }

        // exist
        if (isExist) {
            setListBookInBill(
                listBookInBill.filter((item) => {
                    if (item.masach === bookAddBill.masach) {
                        return (item.soluong += parseInt(total));
                    }
                    return item;
                })
            );
            return;
        }

        // not exist
        setListBookInBill((listBookInBill) => [
            ...listBookInBill,
            {
                masach: parseInt(bookAddBill.masach),
                tensach: bookAddBill.tensach,
                soluong: parseInt(total),
            },
        ]);
    };

    const handleDeleteBookInBill = (id) => {
        console.log("delete: ", id);
        setListBookInBill(listBookInBill.filter((item) => item.masach !== id));
    };

    const handleCreateBill = async () => {
        if (listBookInBill.length === 0) {
            alert("Vui lòng chọn sách mượn!");
            return;
        }

        console.log("handleCreateBill: ", listBookInBill);

        let billInfo = "";
        listBookInBill.map(
            (item) => (billInfo += item.masach + "@" + item.soluong + "-")
        );

        console.log("billInfo: ", billInfo);

        await axios({
            method: "post",
            url: "/api/bills/create",
            headers: { username: localStorage.getItem("username") },
            data: {
                mathe: readerId,
                manhanvien: props.userInfo.userId,
                billInfo: billInfo,
            },
        })
            .then((res) => {
                console.log("handleCreateBill res: ", res);
                props.isSucceed();
            })
            .catch((err) => {
                console.log("handleCreateBill ERR: ", err);
            });
    };

    console.log("userInfo create bill: ", props.userInfo);

    return (
        <>
            <Modal isOpen={true} size={"lg"} centered={true} autoFocus={false}>
                <ModalHeader>Lập phiếu mượn</ModalHeader>
                <ModalBody>
                    <div className="container">
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
                            <div className="col-6">
                                <div>
                                    <h6 className="d-inline text-primary">
                                        Phiếu mượn
                                    </h6>
                                    <button
                                        className="btn btn-sm text-danger float-right"
                                        onClick={() => setListBookInBill([])}
                                    >
                                        <i className="fas fa-broom mr-2"></i>
                                        Làm mới
                                    </button>
                                </div>

                                <div>
                                    <table className="table table-sm table-hover table-sm-responsive">
                                        <thead>
                                            <tr>
                                                <th>Tên sách</th>
                                                <th>SL</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listBookInBill &&
                                                listBookInBill.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {item.tensach}
                                                            </td>
                                                            <td>
                                                                {item.soluong}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn text-danger btn-sm"
                                                                    onClick={() =>
                                                                        handleDeleteBookInBill(
                                                                            item.masach
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="col-6">
                                <h6 className="text-primary">Chọn sách mượn</h6>

                                <div className="form-group">
                                    <label>Tên sách</label>
                                    <select
                                        value={
                                            bookAddBill && bookAddBill.masach
                                        }
                                        className="form-control"
                                        onChange={(e) =>
                                            handleSelectBookToBill(e)
                                        }
                                    >
                                        {listBooks &&
                                            listBooks.map((item, index) => (
                                                <option
                                                    key={index}
                                                    value={item.masach}
                                                >
                                                    {item.tensach}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Số lượng sách mượn</label>
                                    <select
                                        value={total}
                                        className="form-control"
                                        onChange={(e) =>
                                            setTotal(parseInt(e.target.value))
                                        }
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    {errMsg && (
                                        <p className="text-danger">{errMsg}</p>
                                    )}
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleAddBookToBill()}
                                    >
                                        Thêm vào phiếu mượn
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-primary btn-sm px-4"
                        onClick={() => handleCreateBill()}
                    >
                        Lập phiếu mượn
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

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    };
};

export default connect(mapStateToProps)(ModalCreateBill);
