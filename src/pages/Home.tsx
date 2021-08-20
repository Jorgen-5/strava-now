import React from "react";

const { REACT_APP_CLIENT_ID } = process.env;
const redirectUrl = process.env.NODE_ENV === "development"
    ? "http://localhost:3000/redirect"
    : "https://appfrontendsa.z6.web.core.windows.net/redirect";

const handleLogin = () => {
    window.location.href = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=read_all,activity:read_all`;
};

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleLogin}>Connect with Strava</button>
        </div>
    );
};

export default Home;