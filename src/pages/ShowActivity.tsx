import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Lap } from "../utils/Lap";
import { DetailedActivity } from "../utils/DetailedActivity";
import { AvgTimes, LapTimes } from "../utils/InterfaceTypes";
//import "../styles/gridstyle.scss";
import Header from "../components/header";
import {Row, Col, Nav, Navbar, Container} from 'react-bootstrap';

function ShowActivity() {
  const [filterdLaps, setFilterdLaps] = useState<LapTimes>({
    set: "",
    times: [],
  });
  const [avgTime, setAvgTime] = useState<AvgTimes>({
    workout: "",
    avgLapTime: 0,
  });

  const [activity, setActivity] = useState<DetailedActivity>({});
  const { activityId }: { activityId: string } = useParams();
  const accessToken = localStorage.getItem("accessToken") as string;
  const [multipleLaps, setMultipleLaps] = useState(false);
  const [avgLoaded, setAvgLoaded] = useState(false);
  const [timesLoaded, setTimesLoaded] = useState(false);
  const [lapsExist, setLapsExists] = useState(true);

  useEffect(() => {
    setAvgLoaded(false);
    setTimesLoaded(false);

    //Gets the activity
    axios
      .get<DetailedActivity>(
        `https://www.strava.com/api/v3/activities/${activityId}?include_all_efforts=False`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        setActivity(res.data);
      });

    //Gets the laps
    axios
      .get<Array<Lap>>(
        `https://www.strava.com/api/v3/activities/${activityId}/laps`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        //setLaps(res.data);
        if (res.data.length > 1) {
          filterLaps(res.data);
          avgLaps(res.data);
          setMultipleLaps(true);
        } else {
          setLapsExists(false);
          //setFilterdLaps({ set: "", times: [activity?.elapsedTime] });
        }
      });
  }, [accessToken, activityId]);

  function filterLaps(lapData: Lap[]) {
    axios
      .post<LapTimes>("https://strava.mangodune-83589044.northeurope.azurecontainerapps.io/getAllLaps", lapData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setFilterdLaps(res.data);
        setTimesLoaded(true);
      });
  }

  function avgLaps(lapData: Lap[]) {
    axios
      .post<AvgTimes>("https://strava.mangodune-83589044.northeurope.azurecontainerapps.io/getAvgLaps", lapData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setAvgTime(res.data);
        setAvgLoaded(true);
      });
  }

  function secToMin(sec: number) {
    if (!isNaN(sec)) {
      const min = new Date(sec * 1000).toISOString().substr(14, 5);
      return min;
    }
    return "";
  }

  function handleClick(id: number) {
    //Gets the laps from state
    var lapArray: number[] = [];
    Object.values(filterdLaps).map((lap) => {
      return lapArray.push(lap.times);
    });
    //Converts laps from lap array
    var currentLap = Object.values(lapArray[id]);

    //Converts secconds to minute of each lap
    for (let i = 0; i < currentLap.length; i++) {
      currentLap[i] = secToMin(currentLap[i]);
    }
    navigator.clipboard.writeText(currentLap.join(" "));
  }


  return (
    <div>
      <Header></Header>
      <div className=""></div>
      {lapsExist ? (
        <div>
          {timesLoaded ? (
            // Lap times loaded
            <Navbar className="border-bottom border-dark">
                <Container>
                    <Nav className="me-auto my-2 my-lg-0">
                        <Row className="gap-3">
                        {Object.values(filterdLaps).map((lap, id: number) => {
                            // Maps over all set and displays them
                            return (
                                <div >
                                    <h2 className="">Set distance: {lap.set}m</h2>
                                    {lap.times?.map(
                                        // Maps over all laps and displays them
                                        (lapTime: number, index: number) => {
                                        const showTime = new Date(lapTime * 1000)
                                            .toISOString()
                                            .substr(14, 5);
                                        return (
                                            <Row>
                                                <Col> Lap {index + 1}: </Col>
                                                <Col>{showTime}</Col>
                                            </Row>
                                        );
                                        }
                                    )}
                                </div>
                            );
                        })}
                        </Row>
                    </Nav>
                </Container>
            </Navbar>
          ) : (
            <div> Loading... </div>
          )}

          {avgLoaded ? (
            <Navbar className="border-bottom border-dark">
                <Container>
                    <Nav className="me-auto my-2 my-lg">
                        <Row className="gap-3">
                            {Object.values(avgTime).map((workout) => {
                                // Maps all sets in the workout and displays the avg time for each set
                                return (
                                    <div className="">
                                        <h2 className="">{workout.workout} meters</h2>
                                            {" "}
                                            Avg time: {secToMin(workout?.avg)}.
                                            {Math.floor(Math.abs(workout?.avg))}{" "}
                                    </div>
                                );
                            })}
                        </Row>
                    </Nav>
                </Container>
            </Navbar>
          ) : (
            <div></div> //Avg time dont exist
          )}
        </div>
        ) : (
            <div> No laps to show :( </div> //Laps dont exitst
        )}

    </div>
  );
}
export default ShowActivity;
