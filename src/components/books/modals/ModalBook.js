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

const ModalBook = (props) => {
    const [errMsg, setErrMsg] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);

    const [titleInput, setTitleInput] = useState(
        props.data ? props.data.tensach : ""
    );
    const [authorInput, setAuthorInput] = useState(
        props.data ? props.data.tacgia.matacgia : ""
    );
    const [categoryInput, setCategoryInput] = useState(
        props.data ? props.data.theloai.matheloai : ""
    );
    const [publisherInput, setPublisherInput] = useState(
        props.data ? props.data.nhaxuatban.manxb : ""
    );
    const [yearOfPublication, setYearOfPublication] = useState(
        props.data ? props.data.namxuatban : 0
    );
    const [totalInput, setTotalInput] = useState(
        props.data ? props.data.soluong : 0
    );

    console.log(">> check prop data from Modal: ", props.data);

    const handleSubmit = async () => {
        if (
            !titleInput ||
            !authorInput ||
            !categoryInput ||
            !publisherInput ||
            !yearOfPublication
        ) {
            setErrMsg("Bạn chưa nhập đủ thông tin!");
            setTimeout(() => {
                setErrMsg(null);
            }, 3000);
            return;
        }

        await axios({
            method: "post",
            url: `/api/books/${
                props.type === "ADD_NEW_BOOK" ? "add-new" : "edit-book"
            }`,
            headers: {
                username: localStorage.getItem("username"),
            },
            data: {
                masach: props.data ? props.data.masach : 0,
                tensach: titleInput,
                matacgia: authorInput,
                matheloai: categoryInput,
                manxb: publisherInput,
                namxuatban: yearOfPublication,
                soluong: totalInput,
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

                    if (props.type === "ADD_NEW_BOOK") {
                        // * khởi tạo giá trị input
                        setAuthorInput(
                            res.data.authors && res.data.authors[0].matacgia
                        );
                        setCategoryInput(
                            res.data.categories &&
                                res.data.categories[0].matheloai
                        );
                        setPublisherInput(
                            res.data.publishers && res.data.publishers[0].manxb
                        );
                    }
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
                                value={authorInput}
                                className="form-control"
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
                                value={categoryInput}
                                onChange={(e) =>
                                    setCategoryInput(e.target.value)
                                }
                            >
                                {categories &&
                                    categories.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item.matheloai}
                                        >
                                            {item.tentheloai}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Nhà xuất bản</label>
                            <select
                                className="form-control"
                                value={publisherInput}
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
                    onClick={() => handleSubmit()}
                >
                    Cập nhật
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

export default ModalBook;
