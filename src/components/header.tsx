import React from 'react';
import {LapTimes} from "../utils/InterfaceTypes";
import {Link} from 'react-router-dom';

function Header() {
    return (
        <div>
            <ul className="menu w-screen items-stretch shadow-lg bg-base-100 horizontal">
                <li>
                    <a >
                        <Link to={'/'}> Home </Link>
                    </a>
                </li>
                <li>
                    <a>
                        <Link to={'/data'}> Workouts </Link>
                    </a>
                </li>
                <li>
                    <a>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Header;