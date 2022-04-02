import { useState } from "react";

let initListBooks = [
    { id: 1, title: "Sách 1", category: "Tiểu thuyết", total: 100 },
    { id: 2, title: "Sách 2", category: "Tiểu thuyết", total: 100 },
    { id: 3, title: "Sách 3", category: "Tiểu thuyết", total: 100 },
    { id: 4, title: "Sách 4", category: "Tiểu thuyết", total: 100 },
    { id: 1, title: "Sách 1", category: "Tiểu thuyết", total: 100 },
    { id: 2, title: "Sách 2", category: "Tiểu thuyết", total: 100 },
    { id: 3, title: "Sách 3", category: "Tiểu thuyết", total: 100 },
    { id: 4, title: "Sách 4", category: "Tiểu thuyết", total: 100 },
    { id: 1, title: "Sách 1", category: "Tiểu thuyết", total: 100 },
    { id: 2, title: "Sách 2", category: "Tiểu thuyết", total: 100 },
    { id: 3, title: "Sách 3", category: "Tiểu thuyết", total: 100 },
    { id: 4, title: "Sách 4", category: "Tiểu thuyết", total: 100 },
];

const BookArea = () => {
    const [listBooks, setListBooks] = useState(initListBooks);

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
                        <button className="btn btn-primary px-3">
                            <i className="fas fa-plus mr-2"></i>Thêm mới
                        </button>
                    </div>
                    <div className="col-sm-5">
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Tìm sách..."
                            />
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="submit">
                                    {/* Tìm */}
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-3">
                        <div className="bg-white radius p-3">
                            <div className="w-100 text-center">
                                <div class="btn-group">
                                    <button
                                        type="button"
                                        class="btn btn-primary active"
                                    >
                                        Tất cả
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                    >
                                        Đang mượn
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                    >
                                        Hiện còn
                                    </button>
                                </div>
                            </div>

                            <div className="table-container">
                                <table class="table table-sm table-hover table-sm-responsive table-fix-head">
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
                                            listBooks.map((item) => (
                                                <tr>
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

export default BookArea;
