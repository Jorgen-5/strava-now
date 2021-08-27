
import React from 'react';
import {LapTimes} from "../utils/InterfaceTypes";

interface Props {
    lap: LapTimes;
}

function Activity(lap : Props) {
    return (
        <div>
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="card-title">lap.distance</h2>
                    <p>Rerum reiciendis beatae tenetur excepturi</p>
                </div>
            </div>
        </div>
    );
}

export default Activity;
