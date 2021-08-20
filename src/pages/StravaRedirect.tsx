import React, {useEffect} from "react";
import _ from "lodash";

import {cleanUpAuthToken, testAuthGetter, getUserData,} from "../utils/functions";
import { useHistory, useLocation } from "react-router-dom";
import { useStateManager } from "../utils/StateManager";



function StravaRedirect() {
    const location = useLocation();
    const history = useHistory();
    const { athlete, setAthlete } = useStateManager();


    useEffect(() => {
        const authenticate = async () => {
            //const { history, location } = props;


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

                //console.log(localStorage.getItem('accessToken'))

                //console.log("Tokens: " + tokens.data)
                setAthlete(tokens.athlete);
                //const accessToken = tokens.access_token;
                //console.log("Access token: " + accessToken)
                //console.log("Local storage token: " + localStorage.getItem('accessToken'));

                //const userID = tokens.athlete.id;

                // Axios request to get users info
                //const user = await getUserData(userID, accessToken);
                //console.log(user)
                //setUserActivities(user);

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


/*
class StravaRedirect extends React.Component {
    componentDidMount() {
        const authenticate = async () => {
            const { history, location } = this.props;
            try {
                // If not redirected to Strava, return to home
                if (_.isEmpty(location)) {
                    return history.push("/");
                }

                // Save the Auth Token to the Store (it's located under 'search' for some reason)
                const stravaAuthToken = cleanUpAuthToken(location.search);

                // Post Request to Strava (with AuthToken) which returns Refresh Token and and Access Token
                const tokens = await testAuthGetter(stravaAuthToken);
                this.props.setUser(tokens);
                const accessToken = tokens.access_token;
                const userID = tokens.athlete.id;

                // Axios request to get users info
                const user = await getUserData(userID, accessToken);
                this.props.setUserActivities(user);

                // Once complete, go to display page
                history.push("/yourdistance");
            } catch (error) {
                history.push("/");
            }
        };
        authenticate();
    }

    render() {
        return <div>Loading</div>;
    }
}
*/
/*
const mapStateToProps = (state) => {
    return { authTokenURL: state.authTokenURL };
};
*/


export default StravaRedirect;
