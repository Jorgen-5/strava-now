import React, { useEffect, useState } from "react";
import { useStateManager } from "../utils/StateManager";
import { Link } from "react-router-dom";
import axios from "axios";
import { SummaryActivity } from "../utils/SummaryActivity";
import { Button } from "react-bootstrap";
import "../styles/data.scss";
import Header from "../components/header";

function Data() {
  const { athlete } = useStateManager();
  const [activities, setActivities] = useState<SummaryActivity[]>([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") as string;
    //const allActivities = getAllActivities(accessToken);
    console.log("Data token: " + accessToken);
    axios
      .get<Array<SummaryActivity>>(
        `https://www.strava.com/api/v3/athlete/activities?&page=1&per_page=10`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        setActivities(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <div>
      <Header></Header>
      {activities.map((activity, i) => {
        return (
          <div className="container mx-auto ">
            <div className="card w-full h-full">
              <div className="card w-auto bordered text-primary-content m-2 bg-neutral">
                <div className="card-title"> {activity.name} </div>
                <div className="card-body">
                  <div className="flex flex-row w-full">
                    <div className="grid flex-grow place-items-center">
                      Distance: {activity.distance}m
                    </div>
                    <div className="divider divider-vertical"></div>
                    <div className="grid flex-grow place-items-center">
                      Time: {activity.moving_time}s
                    </div>
                    <div className="divider divider-vertical"></div>
                    <div className="grid flex-grow place-items-center">
                      Pace: {activity.average_speed}
                    </div>
                  </div>
                  <div className="justify-center card-actions">
                    <Link to={`/showactivity/${activities[i].id}`}>
                      <button className="btn btn-wide bg-neutral-focus">
                        Click here for more info
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    /*
        <div>

            <div className="h-12"></div>
            {activities.map((activity, i) => {
                return(
                    <ul key={i} className="menu h-16">
                        <li key={i} className="menu-title">
                            <div className="h-12">
                                <Link to={`/showactivity/${activities[i].id}`}>
                                    <Button variant='primary btn-wide btn-sm'>
                                        {activities[i].name + ",     Distance: " + activities[i].distance}
                                    </Button>
                                </Link>
                            </div>
                        </li>
                    </ul>
                )
            })}
        </div>
        */
  );
}
export default Data;
