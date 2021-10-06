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

export interface SummarySegment {
    /**
     * The unique identifier of this segment
     */
    id?: number;

    /**
     * The name of this segment
     */
    name?: string;

    activityType?: SummarySegment.ActivityTypeEnum;

    /**
     * The segment's distance, in meters
     */
    distance?: number;

    /**
     * The segment's average grade, in percents
     */
    averageGrade?: number;

    /**
     * The segments's maximum grade, in percents
     */
    maximumGrade?: number;

    /**
     * The segments's highest elevation, in meters
     */
    elevationHigh?: number;

    /**
     * The segments's lowest elevation, in meters
     */
    elevationLow?: number;

    startLatlng?: models.LatLng;

    endLatlng?: models.LatLng;

    /**
     * The category of the climb [0, 5]. Higher is harder ie. 5 is Hors catégorie, 0 is uncategorized in climb_category.
     */
    climbCategory?: number;

    /**
     * The segments's city.
     */
    city?: string;

    /**
     * The segments's state or geographical region.
     */
    state?: string;

    /**
     * The segment's country.
     */
    country?: string;

    /**
     * Whether this segment is private.
     */
    _private?: boolean;

    athletePrEffort?: models.SummarySegmentEffort;

    athleteSegmentStats?: models.SummaryPRSegmentEffort;

}
export namespace SummarySegment {
    export enum ActivityTypeEnum {
        Ride = <any> 'Ride',
        Run = <any> 'Run'
    }
}
