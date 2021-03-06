import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import Booking from './booking/Booking';
import Home from './home/Home';
import AllRooms from './rooms/AllRooms';
import Services from './services/Services';
import SignIn from './signIn/SignIn';
import SignUp from './signIn/SignUp'
import Admin from './admin/rooms/admin';
import AdminBooking from './admin/booking/adminBooking';
import Payment from './booking/Payment';
import Footer from '../components/footer';
import Header from '../components/header';
import React, { useState } from 'react';
import AppProvider from '../components/AppProvider';
import Cookies from 'js-cookie';
import AdminAccount from './admin/accounts/adminAccount';
import Account from './account/account';
import ClubRoom from './rooms/ClubRoom';
import DeluxeRoom from './rooms/DeluxeRoom'
import SuperiorRoom from "./rooms/SuperiorRoom";
import ScrollToTop from "./rooms/ScrollToTop";
var isLogin = Cookies.get('id');
var isAdmin = Cookies.get('isAdmin');


// Condition for authentication
if(isLogin) {
  isLogin = true;
}
else {
  isLogin = false;
}

if(isAdmin === "1") {
  isAdmin = true;
}
else {
  isAdmin = false;
}

const ProtectedRoute = (props) => {
  if(isAdmin) { //admin vào được mọi trang trừ trang booking,payment,signin và signup
    if(props.path === "/booking") {
      return <Redirect to="/" />
    }
    else if(props.path === "/payment") {
      return <Redirect to="/" />
    }
    else if(props.path === "/signin") {
      return <Redirect to="/" />
    }
    else if(props.path === "/signup") {
      return <Redirect to="/" />
    }
    else {
      return <Route path={props.path} component={props.component}></Route>
    }
  }

  else if(isLogin) { // user vào được mọi trang trừ trang sign in, sign up, admin, addBooking
    if(props.path === "/signin") {
      return <Redirect to="/" />
    }
    else if(props.path === "/signup") {
      return <Redirect to="/" />
    }
    else if(props.path === "/adminRoom") {
      return <Redirect to="/" />
    }
    else if(props.path === "/adminAccount") {
      return <Redirect to="/" />
    }
    else if(props.path === "/adminBooking") {
      return <Redirect to="/" />
    }
    else {
      return <Route path={props.path} component={props.component}></Route>
    }
  }
  else {// chưa đăng nhập thì không vào được trang admin, payment
    if(props.path === "/adminRoom") {
      return <Redirect to ="/" />
    }
    else if(props.path === "/adminBooking") {
      return <Redirect to ="/" />
    }
    else if(props.path === "/adminAccount") {
      return <Redirect to ="/" />
    }
    else if(props.path === "/payment") { //chuyển sang trang sign in
      return <Redirect to = "/signin" />
    }
    else if(props.path === "/account") {
      return <Redirect to="/signin"/>
    }
    else {
      return <Route path={props.path} component={props.component}></Route>
    }
  }
}


export default function Routes(){
  return(
    <div>
      <AppProvider>
      <Router>
        <ScrollToTop/>
        <Header/>
        {/* <Link to="/">Home</Link>
      
        <Link to="/booking">Booking</Link>
    
        <Link to="/rooms">Rooms</Link>
      
        <Link to="/services">Services</Link>
      
        <Link to="/signin">SignIn</Link> */}
     
        <Switch>   
          <ProtectedRoute exact path="/booking" component={Booking} />
          <ProtectedRoute exact path="/payment" component={Payment} />
          <ProtectedRoute exact path="/rooms" component={AllRooms} />
          <ProtectedRoute exact path="/services" component={Services} />
          <ProtectedRoute exact path="/signup" component={SignUp} />
          <ProtectedRoute exact path="/signin" component={SignIn} />
          <ProtectedRoute exact path="/adminRoom" component={Admin} />
          <ProtectedRoute exact path="/adminBooking" component = {AdminBooking} />
          <ProtectedRoute exact path="/adminAccount" component = {AdminAccount} />
          <ProtectedRoute exact path ="/account" component={Account}/>
          <ProtectedRoute exact path ="/ClubRoom" component = {ClubRoom} />
          <ProtectedRoute exact path ="/DeluxeRoom" component = {DeluxeRoom} />
          <ProtectedRoute exact path ="/SuperiorRoom" component = {SuperiorRoom} />
          <ProtectedRoute exact path="/"component={Home} />
        </Switch>
        <div className="footer">
          <Footer/>
        </div>
      </Router>
      
      </AppProvider>
    </div>
  );
}