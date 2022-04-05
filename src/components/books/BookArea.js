import { useEffect, useState } from "react";
import { connect } from "react-redux";

let initListBooks = [
    { id: 1, title: "Sách 1", category: "Tiểu thuyết", total: 100 },
    { id: 2, title: "Sách 2", category: "Truyện", total: 100 },
    { id: 3, title: "Sách 3", category: "Tiểu thuyết", total: 100 },
    { id: 4, title: "Sách 4", category: "Tiểu thuyết", total: 100 },
];

const BookArea = (props) => {
    const [listBooks, setListBooks] = useState(initListBooks);

    // console.log("check userInfo: ", props.userInfo);

    const handleOnChangeSearch = (e) => {
        let strSearch = e.target.value.toLowerCase();
        setListBooks(
            initListBooks.filter((item) => {
                return (
                    item.title.toLowerCase().includes(strSearch) ||
                    item.category.toLowerCase().includes(strSearch)
                );
            })
        );
    };

    return (
        <>
            <div className="container py-3">
                <div className="row">
                    <div className="col-12">
                        <h5>
                            <i className="fas fa-book mr-2"></i>Quản lý sách
                        </h5>
                        <hr></hr>
                    </div>
                    <div className="col-sm-7">
                        <button className="btn btn-primary m-1 px-3">
                            <i className="fas fa-plus mr-2"></i>Thêm mới
                        </button>
                    </div>
                    <div className="col-sm-5">
                        <div className="input-group m-1">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm sách..."
                                onChange={(e) => handleOnChangeSearch(e)}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-3">
                        <div className="bg-white radius p-3">
                            <div className="w-100 text-center">
                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className="btn btn-primary active"
                                    >
                                        Tất cả
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Đang mượn
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Hiện còn
                                    </button>
                                </div>
                            </div>

                            <div className="table-container">
                                <table className="table table-sm table-hover table-sm-responsive table-fix-head">
                                    <thead>
                                        <tr>
                                            <th>Tiêu đề</th>
                                            <th>Thể loại</th>
                                            <th>Số lượng</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listBooks &&
                                            listBooks.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.title}</td>
                                                    <td>{item.category}</td>
                                                    <td>{item.total}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-success m-1">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-primary m-1">
                                                            <i className="fas fa-pen"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-danger m-1">
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    };
};

export default connect(mapStateToProps)(BookArea);
