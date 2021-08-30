import React, {useEffect, useState} from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import {Lap} from "../utils/Lap";
import {DetailedActivity} from "../utils/DetailedActivity";
import {AvgTimes, LapTimes} from "../utils/InterfaceTypes";
import "../styles/gridstyle.scss"
import Header from '../components/header'


function ShowActivity() {
    //const [laps, setLaps] = useState<Lap[]>([]);
    const [filterdLaps, setFilterdLaps] = useState<LapTimes>({
        "set": "",
        "times": [],
    });
    const [avgTime, setAvgTime] = useState<AvgTimes>({
        "workout": "",
        "avgLapTime": 0,
    });
    //const [activity, setActivity] = useState<DetailedActivity>({});
    const { activityId }: { activityId: string } = useParams();
    const accessToken = localStorage.getItem('accessToken') as string;

    useEffect(() => {
        //Gets the activity
        axios.get<DetailedActivity>(
            `https://www.strava.com/api/v3/activities/${activityId}?include_all_efforts=False`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        ).then((res) => {
            //setActivity(res.data);
        });

        //Gets the laps
        axios.get<Array<Lap>>(
            `https://www.strava.com/api/v3/activities/${activityId}/laps`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        ).then((res) => {
            //setLaps(res.data);
            if(res.data.length > 1){
                filterLaps(res.data);
                avgLaps(res.data);
            }
        });

    }, [accessToken, activityId])


    function filterLaps(lapData : Lap[]) {
        axios.post<LapTimes>('https://stravaanalysis.azurewebsites.net/api/get-all-laps?code=s8nxEZlheag4dVSXWVw7aelwPpiaSl4otjoAOqXXsdGaviNWOv7Wjg==', lapData,
            {
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
            setFilterdLaps(res.data);
        });
    }

    function avgLaps(lapData : Lap[]) {
        axios.post<AvgTimes>('https://stravaanalysis.azurewebsites.net/api/get-avg?code=hESs7AUwABUdfXdDHCgecmmotlIwstofXdqM01C9x81KceeFqNRIsw==', lapData,
            {
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
            setAvgTime(res.data);
        });
    }

    function secToMin(sec: number) {
        if (!isNaN(sec)) {
            const min = new Date(sec * 1000).toISOString().substr(14, 5)
            return min
        } return null
    }

    function handleClick(id : number){

        var lapArray : number[] = [];
        Object.values(filterdLaps).map((lap) => {
            return lapArray.push(lap.times);
        });
        console.log(lapArray[id])
        navigator.clipboard.writeText(lapArray[id].toString())
    }


    return (
        <div>
            <Header></Header>
            <div className="h-12"></div>
            <div className="font-bold text-3xl"> Lap times </div>
            {Object.values(filterdLaps).map((lap, id:number) => {
                return (
                    <div className="card shadow">
                        <button onClick={() => handleClick(id)}>
                            <div className="card-body">
                                <h2 className="card-title">Set distance: {lap.set}m</h2>
                                <div className="card text-accent-content">
                                    <div className="card-body bg-neutral">
                                        {
                                            lap.times?.map((lapTime : number, index :  number) => {
                                                const showTime = new Date(lapTime * 1000).toISOString().substr(14, 5)
                                                return (<div className="font-bold">Lap {index + 1}: {showTime}</div>)
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                )
            })}

            <i className="far fa-clone"> </i>

            <div className=" h-12 font-bold"> </div>
            <div className="font-bold text-3xl"> Avrerage times </div>
            {Object.values(avgTime).map((workout) => {
                return (
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title">{workout.workout}s</h2>
                            <div className="card text-accent-content">
                                <div className="card-body bg-neutral">
                                    <div className="font-bold"> Avg time: {secToMin(workout?.avg)}.{Math.floor(Math.abs(workout?.avg))} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

}
export default ShowActivity;