import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BillArea from "./components/bills/BillArea";
import BookArea from "./components/books/BookArea";
import AuthorArea from "./components/authors/AuthorArea";
import ReadersArea from "./components/readers/ReaderArea";
import MuonSach from "./components/books/MuonSach";
import TraSach from "./components/books/TraSach";
import CategoryArea from "./components/categories/CategoryArea";
import PublisherArea from "./components/publishers/publisherArea";

import Login from "./components/views/auth/Login";
import MainContainer from "./components/views/MainContainer";

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
                        path="/authors"
                        render={() =>
                            props.isLoggedIn ? (
                                <AuthorArea />
                            ) : (
                                <Redirect to={"/login"} />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/categories"
                        render={() =>
                            props.isLoggedIn ? (
                                <CategoryArea />
                            ) : (
                                <Redirect to={"/login"} />
                            )
                        }
                    />

                    <Route
                        exact
                        path="/publishers"
                        render={() =>
                            props.isLoggedIn ? (
                                <PublisherArea />
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
