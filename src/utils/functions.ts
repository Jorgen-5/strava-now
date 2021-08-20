import axios from "axios";

const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

/*
export const getParamValues = (url : string) => {
    return url
        .slice(1)
        .split("&")
        .reduce((prev, curr) => {
            const [title, value] = curr.split("=");
            prev[title] = value;
            return prev;
        }, {});
};
 */

export const cleanUpAuthToken = (str : string) => {
    return str.split("&")[1].slice(5);
};

export const testAuthGetter = async (authTok : string) => {
    try {
        const res = await axios.post(
            `https://www.strava.com/api/v3/oauth/token?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&code=${authTok}&grant_type=authorization_code`
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUserData = async (userID : string, accessToken : string) => {
    try {
        const res = await axios.get(
            `https://www.strava.com/api/v3/athletes/${userID}/stats`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getAllActivities = async (accessToken : string) => {
    try {
        const res = await axios.get(
            `https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return res;
    } catch (error) {
        console.log(error);
    }
}