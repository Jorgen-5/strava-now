import React from 'react';
import {LapTimes} from "../utils/InterfaceTypes";

interface Props {
    lap: LapTimes;
}

function Header() {
    return (
        <div>
            <ul className="menu w-screen items-stretch shadow-lg bg-base-100 horizontal">
                <li>
                    <a>
                        With link
                    </a>
                </li>
                <li>
                    <a>
                        Bordered
                    </a>
                </li>
                <li>
                    <a>

                        With icon

                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Header;