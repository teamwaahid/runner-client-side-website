import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import PageNotFound from "./pages/PageNotFound.js";
import AuthProvider from "./contexts/AuthProvider.js";
import Reset from "./pages/Reset.js";
import Details from "./pages/Details.js";
import PrivateRoute from "./route/PrivateRoute.js";
import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";
import AdminPanel from "./pages/AdminPanel.js";
import MyOrder from "./pages/MyOrder";
import Products from "./pages/Products";
import Payment from "./components/Payment/Payment";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Header> </Header>

          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>

            <Route path="/home">
              <Home></Home>
            </Route>

            <Route exact path="/products">
              <Products></Products>
            </Route>

            <Route exact path="/payment">
              <Payment></Payment>
            </Route>

            <Route path="/myorder">
              <MyOrder></MyOrder>
            </Route>

            <PrivateRoute path="/admin">
              <AdminPanel></AdminPanel>
            </PrivateRoute>

            <Route path="/login">
              <Login></Login>
            </Route>

            <Route path="/signup">
              <Signup></Signup>
            </Route>

            <Route path="/reset">
              <Reset></Reset>
            </Route>

            <PrivateRoute path="/products/:id">
              <Details></Details>
            </PrivateRoute>

            <Route path="*">
              <PageNotFound></PageNotFound>
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
