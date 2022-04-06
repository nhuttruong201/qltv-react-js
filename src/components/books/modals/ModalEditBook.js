import axios from "../../../configs/axios";
import { Modal } from "reactstrap";
import { useEffect, useState } from "react";
import { ModalBody, ModalFooter, ModalHeader } from "reactstrap";

/**
    Tên sách
    Thể Loại
    Tác giả
    Năm xuất bản
    Nhà xuất bản
    Số lượng
     */

const ModalEditBook = (props) => {
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);

    const [titleInput, setTitleInput] = useState("");
    const [authorInput, setAuthorInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [publisherInput, setPublisherInput] = useState("");
    const [yearOfPublication, setYearOfPublication] = useState(0);
    const [totalInput, setTotalInput] = useState(0);

    const [errMsg, setErrMsg] = useState(null);

    console.log(">> check prop data: ", props.data);

    useEffect(() => {
        let {
            masach,
            tensach,
            tacgia,
            theloai,
            nhaxuatban,
            namxuatban,
            soluong,
        } = props.data;
        setTitleInput(tensach);
        setAuthorInput(tacgia.matacgia);
        setCategoryInput(theloai.matheloai);
        setPublisherInput(nhaxuatban.manxb);
        setYearOfPublication(namxuatban);
        setTotalInput(soluong);
    }, [props]);

    useEffect(() => {
        const fetchDataBookInfo = async () => {
            await axios({
                method: "get",
                url: "/api/books/book-info",
                headers: { username: localStorage.getItem("username") },
            })
                .then((res) => {
                    // console.log("fetchDataBookInfo: ", res);
                    setAuthors(res.data.authors);
                    setCategories(res.data.categories);
                    setPublishers(res.data.publishers);

                    // setAuthorInput(
                    //     res.data.authors && res.data.authors[0].matacgia
                    // );
                    // setCategoryInput(
                    //     res.data.categories && res.data.categories[0].matheloai
                    // );
                    // setPublisherInput(
                    //     res.data.publishers && res.data.publishers[0].manxb
                    // );
                })
                .catch((err) => {
                    console.log("fetchDataBookInfo: ", err);
                });
        };

        fetchDataBookInfo();
    }, []);

    return (
        <Modal isOpen={true} size={"lg"} centered={true} autoFocus={false}>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-12">
                        {errMsg && <p className="text-danger">{errMsg}</p>}
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label>Tên sách</label>
                            <input
                                type={"text"}
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                                placeholder={"tên sách..."}
                                maxLength={255}
                                required
                                className="form-control"
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Tác giả</label>
                            <select
                                className="form-control"
                                defaultValue={authorInput}
                                onChange={(e) => setAuthorInput(e.target.value)}
                            >
                                {authors &&
                                    authors.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item.matacgia}
                                        >
                                            {item.tentacgia}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Thể loại</label>
                            <select
                                className="form-control"
                                // defaultValue={categoryInput}
                                onChange={(e) =>
                                    setCategoryInput(e.target.value)
                                }
                            >
                                {categories &&
                                    categories.map((item, index) =>
                                        item.matheloai === categoryInput ? (
                                            <option
                                                key={index}
                                                value={item.matheloai}
                                                selected
                                            >
                                                {item.tentheloai}
                                            </option>
                                        ) : (
                                            <option
                                                key={index}
                                                value={item.matheloai}
                                            >
                                                {item.tentheloai}
                                            </option>
                                        )
                                    )}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Nhà xuất bản</label>
                            <select
                                className="form-control"
                                defaultValue={publisherInput}
                                onChange={(e) =>
                                    setPublisherInput(e.target.value)
                                }
                            >
                                {publishers &&
                                    publishers.map((item, index) => (
                                        <option key={index} value={item.manxb}>
                                            {item.tennxb}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Năm xuất bản</label>
                            <input
                                type={"number"}
                                value={yearOfPublication}
                                onChange={(e) =>
                                    setYearOfPublication(e.target.value)
                                }
                                min={"2000"}
                                max={"2022"}
                                placeholder="năm xuất bản..."
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Số lượng</label>
                            <input
                                type={"number"}
                                value={totalInput}
                                onChange={(e) => setTotalInput(e.target.value)}
                                min={"1"}
                                max={"1000"}
                                placeholder="số lượng..."
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button
                    className="btn btn-primary btn-sm px-4"
                    // onClick={() => handleEdit()}
                >
                    Cập nhật
                </button>{" "}
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => props.isClose("EDIT_BOOK")}
                >
                    Đóng
                </button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalEditBook;
