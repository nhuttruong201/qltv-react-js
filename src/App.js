import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BillArea from "./components/bills/BillArea";
import BookArea from "./components/books/BookArea";

import ReadersArea from "./components/readers/ReaderArea";
import MuonSach from "./components/books/MuonSach";
import TraSach from "./components/books/TraSach";

import Login from "./components/views/auth/Login";
import MainContainer from "./components/views/MainContainer";
import StaffArea from "./components/staff/StaffArea";

function App(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>

                <MainContainer>
                    <Route
                        exact
                        path="/"
                        render={() =>
                            props.isLoggedIn ? (
                                <h1>Home</h1>
                            ) : (
                                <Redirect to={"/login"} />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/books"
                        render={() =>
                            props.isLoggedIn ? (
                                <BookArea />
                            ) : (
                                <Redirect to={"/login"} />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/readers"
                        render={() =>
                            props.isLoggedIn ? (
                                <ReadersArea />
                            ) : (
                                <Redirect to={"/login"} />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/quan-ly-phieu-muon"
                        render={() =>
                            props.isLoggedIn ? (
                                <BillArea />
                            ) : (
                                <Redirect to={"/login"} />
                            )
                        }
                    />

                    <Route
                        exact
                        path="/muon-sach"
                        render={() =>
                            props.isLoggedIn ? (
                                <MuonSach />
                            ) : (
                                <Redirect to={"/login"} />
                            )
                        }
                    />

                    <Route
                        exact
                        path="/tra-sach"
                        render={() =>
                            props.isLoggedIn ? (
                                <TraSach />
                            ) : (
                                <Redirect to={"/login"} />
                            )
                        }
                    />

                    <Route
                        exact
                        path="/staffs"
                        render={() =>
                            props.isLoggedIn ? (
                                <StaffArea />
                            ) : (
                                <Redirect to={"/login"} />
                            )
                        }
                    />
                </MainContainer>
            </Switch>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
    };
};

export default connect(mapStateToProps)(App);
