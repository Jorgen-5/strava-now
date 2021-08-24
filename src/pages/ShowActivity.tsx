import React, {useEffect, useState} from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import {Lap} from "../utils/Lap";
import {DetailedActivity} from "../utils/DetailedActivity";
import {AvgTimes, LapTimes} from "../utils/InterfaceTypes";
import "../styles/gridstyle.scss"
import {Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowActivity() {
    const [laps, setLaps] = useState<Lap[]>([]);
    const [filterdLaps, setFilterdLaps] = useState<LapTimes>({
        "set": "",
        "times": [],
    });
    const [avgTime, setAvgTime] = useState<AvgTimes>({
        "workout": "",
        "avgLapTime": 0,
    });

    const [activity, setActivity] = useState<DetailedActivity>({});
    const { activityId }: { activityId: string } = useParams();
    const accessToken = localStorage.getItem('accessToken') as string;

    useEffect(() => {
        //Gets the activity
        axios.get<DetailedActivity>(
            `https://www.strava.com/api/v3/activities/${activityId}?include_all_efforts=False`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        ).then((res) => {
            setActivity(res.data);
            console.log(res.data);
        });

        //Gets the laps
        axios.get<Array<Lap>>(
            `https://www.strava.com/api/v3/activities/${activityId}/laps`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        ).then((res) => {
            setLaps(res.data);
            filterLaps(res.data);
            avgLaps(res.data);
        });

    }, [accessToken, activityId])


    function filterLaps(lapData : Lap[]) {
        axios.post<LapTimes>('https://getalllaptimes.azurewebsites.net/api/GetAllLaps?code=pQDbaYgZAHbaQ6K9w1RieyTkEzUnRZlrDTMwOUwosj1Oef48MrP3Hg==', lapData,
            {
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
            setFilterdLaps(res.data);
            console.log(res.data)
        });
    }

    function avgLaps(lapData : Lap[]) {
        axios.post<AvgTimes>('https://getavgtimeforeachdistance.azurewebsites.net/api/HttpTrigger1?code=YTQP/jtFhrTosLCzFrqI/lkvGqfJe3q9XKoKtSdIk5hNoYO32FhF8w==', lapData,
            {
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
            setAvgTime(res.data);
            console.log(res.data)
        });
    }

    function secToMin(sec: number) {
        if (!isNaN(sec)) {
            const min = new Date(sec * 1000).toISOString().substr(14, 5)
            return min
        } return null
    }

    return(
        <div>
            <Container>
                <Row>
                    <h1>{activity.name}</h1>
                    <div>Distance: {activity.distance}</div>
                </Row>
                <Row>
                    {Object.values(filterdLaps).map((lap) => {
                        return (
                            <Col>
                                <p>{lap.set}</p>
                                {
                                    lap.times?.map((lapTime : number) => {
                                        const showTime = new Date(lapTime * 1000).toISOString().substr(14, 5)
                                        return (<div>{showTime}</div>)
                                    })
                                }
                            </Col>
                        )
                    })}
                </Row>
                <Row>
                    Avg time:
                </Row>
                <Row>
                    {Object.values(avgTime).map((workout) => {
                        console.log(avgTime)
                        return (
                            <Col>
                                <p> For {workout.workout}: {secToMin(workout?.avg)} </p>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )




    /*
    return (
        <div>
            <h1>{activity.name}</h1>
            <div>Distance: {activity.distance}</div>
            <div>Time: {activity.movingTime}</div>
            <div>
                {Object.values(filterdLaps).map((lap) => {
                    return (
                        <div>
                        <p>{lap.set}</p>
                            {
                                lap.times?.map((lapTime : number) => {
                                    const showTime = new Date(lapTime * 1000).toISOString().substr(14, 5)
                                    return (<div>{showTime}</div>)
                                })
                            }
                        </div>
                    )
                })}
            </div>
            <div>
                Avg time:
                {Object.values(avgTime).map((workout) => {
                    console.log(avgTime)
                    return (
                        <div>
                            <p> For {workout.workout}: {secToMin(workout?.avg)} </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
     */
}
export default ShowActivity;