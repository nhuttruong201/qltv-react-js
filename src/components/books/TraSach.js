import axios from "../../configs/axios";
import { useState } from "react";
import ModalPayBill from "./modals/ModalPayBIll";

const TraSach = () => {
    const [succeedMsg, setSucceedMsg] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [inputReader, setInputReader] = useState("");
    const [readerInfo, setReaderInfo] = useState({});
    const [showModalPayBill, setShowModalPayBill] = useState(false);

    const handleCheckReader = async (e) => {
        e.preventDefault();
        if (!inputReader) {
            setErrMsg("Vui lòng nhập thông tin độc giả!");
            return;
        }

        await axios({
            method: "get",
            url: "/api/readers/" + inputReader,
            headers: { username: localStorage.getItem("username") },
        })
            .then((res) => {
                console.log("handleCheckReader res: ", res);
                if (!res.data) {
                    setErrMsg("Thẻ độc giả không tồn tại!");
                    return;
                }

                if (res.data.dabikhoa) {
                    setErrMsg("Thẻ độc giả đã bị khoá!");
                    return;
                }

                if (!res.data.dangmuon) {
                    setErrMsg("Thẻ độc giả chưa có phiếu mượn!");
                    return;
                }

                //* checked
                // lưu thông tin độc giả
                setReaderInfo({
                    readerId: res.data.mathe,
                    fullName: res.data.hoten,
                    gender: res.data.gioitinh,
                    phoneNumber: res.data.sdt,
                });

                setShowModalPayBill(true);
            })
            .catch((err) => {
                console.log("handleCheckReader err: ", err);
            });
    };

    const handlePayBillSucceed = () => {
        // alert("handlePayBillSucceed");
        setShowModalPayBill(false);
        setSucceedMsg("Thanh toán thành công!");
        setInputReader("");
        setTimeout(() => {
            setSucceedMsg(null);
        }, 3000);
    };

    return (
        <>
            {showModalPayBill && (
                <ModalPayBill
                    readerInfo={readerInfo}
                    isClose={() => setShowModalPayBill(false)}
                    isSucceed={handlePayBillSucceed}
                />
            )}

            <div className="container">
                {succeedMsg && (
                    <h5 className="text-success mt-4">{succeedMsg}</h5>
                )}
                <div className="row pt-5">
                    <div className="col-sm-10 col-md-8 col-lg-6 bg-white mx-auto p-4 radius border">
                        <h5 className="mb-4">Kiểm tra thẻ độc giả trả sách</h5>
                        <form>
                            {errMsg && <p className="text-danger">{errMsg}</p>}
                            <div className="form-group">
                                <label>Mã thẻ hoặc số điện thoại độc giả</label>
                                <input
                                    type="number"
                                    value={inputReader}
                                    min="1"
                                    placeholder="mã thẻ hoặc sdt..."
                                    className="form-control"
                                    autoFocus
                                    onChange={(e) =>
                                        setInputReader(e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn btn-primary px-5"
                                    onClick={(e) => handleCheckReader(e)}
                                >
                                    Kiểm tra
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TraSach;
