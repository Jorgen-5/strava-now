import React, {useEffect} from "react";
import _ from "lodash";

import {cleanUpAuthToken, testAuthGetter} from "../utils/functions";
import { useHistory, useLocation } from "react-router-dom";


function StravaRedirect() {
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const authenticate = async () => {

            try {
                // If not redirected to Strava, return to home
                if (_.isEmpty(location)) {
                    return history.push("/");
                }

                // Save the Auth Token to the Store (it's located under 'search' for some reason)
                const stravaAuthToken = cleanUpAuthToken(location.search);

                // Post Request to Strava (with AuthToken) which returns Refresh Token and and Access Token
                const tokens = await testAuthGetter(stravaAuthToken);
                console.log(tokens)
                localStorage.setItem('refreshToken', tokens.refresh_token);
                localStorage.setItem('accessToken', tokens.access_token);

                // Once complete, go to display page
                history.push("/data");
            } catch (error) {
                history.push("/");
            }
        };
        authenticate();
    }, []);

    return (<div>Loading</div>);
}

export default StravaRedirect;
