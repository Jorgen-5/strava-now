import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <div>
            <div className="menu w-screen items-stretch shadow-lg bg-base-100 horizontal">
                <li>
                    <div>
                        <Link to={'/'}> Home </Link>
                    </div>
                </li>
                <li>
                    <div>
                        <Link to={'/data'}> Workouts </Link>
                    </div>
                </li>
            </div>
        </div>
    );
}

export default Header;