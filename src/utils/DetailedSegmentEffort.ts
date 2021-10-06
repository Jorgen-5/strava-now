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

export interface DetailedSegmentEffort extends models.SummarySegmentEffort {
    /**
     * The name of the segment on which this effort was performed
     */
    name?: string;

    activity?: models.MetaActivity;

    athlete?: models.MetaAthlete;

    /**
     * The effort's moving time
     */
    movingTime?: number;

    /**
     * The start index of this effort in its activity's stream
     */
    startIndex?: number;

    /**
     * The end index of this effort in its activity's stream
     */
    endIndex?: number;

    /**
     * The effort's average cadence
     */
    averageCadence?: number;

    /**
     * The average wattage of this effort
     */
    averageWatts?: number;

    /**
     * For riding efforts, whether the wattage was reported by a dedicated recording device
     */
    deviceWatts?: boolean;

    /**
     * The heart heart rate of the athlete during this effort
     */
    averageHeartrate?: number;

    /**
     * The maximum heart rate of the athlete during this effort
     */
    maxHeartrate?: number;

    segment?: models.SummarySegment;

    /**
     * The rank of the effort on the global leaderboard if it belongs in the top 10 at the time of upload
     */
    komRank?: number;

    /**
     * The rank of the effort on the athlete's leaderboard if it belongs in the top 3 at the time of upload
     */
    prRank?: number;

    /**
     * Whether this effort should be hidden when viewed within an activity
     */
    hidden?: boolean;

}
