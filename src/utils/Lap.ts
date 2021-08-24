/**
 * Strava API v3
 * The [Swagger Playground](https://developers.strava.com/playground) is the easiest way to familiarize yourself with the Strava API by submitting HTTP requests and observing the responses before you write any client code. It will show what a response will look like with different endpoints depending on the authorization scope you receive from your athletes. To use the Playground, go to https://www.strava.com/settings/api and change your “Authorization Callback Domain” to developers.strava.com. Please note, we only support Swagger 2.0. There is a known issue where you can only select one scope at a time. For more information, please check the section “client code” at https://developers.strava.com/docs.
 *
 * OpenAPI spec version: 3.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface Lap {
    /**
     * The unique identifier of this lap
     */
    id?: number;

    activity?: models.MetaActivity;

    athlete?: models.MetaAthlete;

    /**
     * The lap's average cadence
     */
    averageCadence?: number;

    /**
     * The lap's average speed
     */
    averageSpeed?: number;

    /**
     * The lap's distance, in meters
     */
    distance?: number;

    /**
     * The lap's elapsed time, in seconds
     */
    elapsedTime?: number;

    /**
     * The start index of this effort in its activity's stream
     */
    startIndex?: number;

    /**
     * The end index of this effort in its activity's stream
     */
    endIndex?: number;

    /**
     * The index of this lap in the activity it belongs to
     */
    lapIndex?: number;

    /**
     * The maximum speed of this lat, in meters per second
     */
    maxSpeed?: number;

    /**
     * The lap's moving time, in seconds
     */
    movingTime?: number;

    /**
     * The name of the lap
     */
    name?: string;

    /**
     * The athlete's pace zone during this lap
     */
    paceZone?: number;

    split?: number;

    /**
     * The time at which the lap was started.
     */
    startDate?: Date;

    /**
     * The time at which the lap was started in the local timezone.
     */
    startDateLocal?: Date;

    /**
     * The elevation gain of this lap, in meters
     */
    totalElevationGain?: number;

}