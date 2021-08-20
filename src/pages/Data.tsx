import React, {useEffect, useState} from "react";
import { useStateManager } from "../utils/StateManager";
import {Link} from "react-router-dom";
import axios from "axios";
import {SummaryActivity} from "../utils/SummaryActivity";

function Data() {
    const { athlete } = useStateManager();
    const [activities, setActivities] = useState<SummaryActivity[]>([]);


    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken') as string;
        //const allActivities = getAllActivities(accessToken);
        console.log("Data token: " + accessToken);
        axios.get<Array<SummaryActivity>>(
            `https://www.strava.com/api/v3/athlete/activities?&page=1&per_page=10`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        ).then((res) => {
            setActivities(res.data)
            console.log(res.data)
        });
    }, [])

    return (
        <div>
            <h1>Hi, {athlete?.firstname}!</h1>

            {activities.map((activity, i) => {
                return(
                    <li key={i}>
                        <Link to={  `/showactivity/${activities[i].id}` }>
                            {activities[i].name}
                        </Link>
                    </li>
                )
            })}
        </div>
    )
}

/*
const YourDistance = ({ user : User, returnTokens  : string}) => {
    return (
        <div>
            <h1>Hi, {returnTokens.athlete.firstname}!</h1>
            <h2>{user.data.all_run_totals.distance}</h2>
            <h2>{user.data.all_ride_totals.distance}</h2>
            <h2>{user.data.all_swim_totals.distance}</h2>
        </div>
    );
};
*/
export default Data;