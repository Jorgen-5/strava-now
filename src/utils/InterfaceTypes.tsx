
export interface Athlete {
    id: number;
    username: string;
    resource_state: number;
    firstname: string;
    lastname: string;
    bio: string;
    city: string;
    state: string;
    country: string;
    sex: string;
    premium: boolean;
    summit: boolean;
    created_at: Date;
    updated_at: Date;
    badge_type_id: number;
    weight: number;
    profile_medium: string;
    profile: string;
    friend: any;
    follower: any;
}

export interface LapTimes {
    set: string;
    times: Array<number>;
}

export interface AvgTimes {
    workout: string;
    avgLapTime: number;
}

/*
export type Activities = Activity[];

export interface Activity {

}
*/

