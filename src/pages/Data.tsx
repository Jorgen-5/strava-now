import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SummaryActivity } from "../utils/SummaryActivity";
import Header from "../components/header";
import {Button, Row, Col, Navbar, Container} from 'react-bootstrap';
import Moment from 'moment';

//Convert seconds to minutes
function secToMin(sec: number) {
    if (!isNaN(sec)) {
      const min = new Date(sec * 1000).toISOString().substr(14, 5);
      return min;
    }
    return "";
}

//Convert meters to kilometers
function mToKm(m: number) {
    if (!isNaN(m)) {
      const min = (m / 1000).toFixed(2);;
      return min;
    }
    return "";
}

function Data() {
  const [activities, setActivities] = useState<SummaryActivity[]>([]);
  const [pageNum, setPageNum] = useState(70); 

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") as string;
    axios
      .get<Array<SummaryActivity>>(
        `https://www.strava.com/api/v3/athlete/activities?&page=${pageNum}&per_page=10`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        setActivities(res.data);
      });
  }, [pageNum]);

  return (
    <div>
        <Header></Header>
        {activities.map((activity, i) => { // Iterates all activities and displays data for each activity
            return (
                <Navbar expand="lg" className="border-bottom border-dark">
                    <Container>
                        <span>
                            <div className=""> 
                                {activity.name} 
                            </div>
                            <div className=""> 
                                <Row>
                                    <Col> Date: </Col>
                                    <Col> {Moment(activity.start_date).format('MM/DD/YYYY')} </Col>
                                </Row>
                            </div>
                            <div>
                                <Row>
                                    <Col> Distance: </Col>
                                    <Col> {mToKm(activity.distance!)}km </Col>
                                </Row>
                            </div>
                            <div>
                                <Row>
                                    <Col> Time: </Col>
                                    <Col > {secToMin(activity.moving_time!)}min </Col>
                                </Row>
                            </div>
                        </span>
                        <Link to={`/showactivity/${activities[i].id}`}>
                            <Button className="btn-dark btn-wide">
                                Click here for more info
                            </Button>
                        </Link>
                    </Container>
            </Navbar>
            );
        })}
        
    </div>
  );
}
export default Data;
