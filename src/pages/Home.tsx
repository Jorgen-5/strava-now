import React from "react";
//import '../styles/buttonstyle.scss';
import "tailwindcss/tailwind.css"
import Header from '../components/header'

const { REACT_APP_CLIENT_ID } = process.env;
const redirectUrl = process.env.NODE_ENV === "development"
    ? "http://localhost:3000/redirect"
    : "https://strava-app1998.web.app/redirect";

const handleLogin = () => {
    window.location.href = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=read_all,activity:read_all`;
};

const Home = () => {
    return (
        <div>
            <Header></Header>
            <div className="h-12"></div>
            <button onClick={handleLogin} className="btn btn-primary rounded-full">Sign in with Strava</button>
        </div>
    );
};

export default Home;