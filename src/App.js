import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BookArea from "./components/books/BookArea";
import AuthorArea from "./components/authors/AuthorArea";
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
                        path="/authors"
                        render={() =>
                            props.isLoggedIn ? (
                                <AuthorArea />
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
