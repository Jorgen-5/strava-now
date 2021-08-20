import React, { createContext, useContext, useState } from "react";
import { Athlete } from "./InterfaceTypes";

/** @summary The state manager for the project. Handles stores and items. */

/** Default values for the store and athlete, which should be of type Store and Athlete. */
const defaultValues: {  athlete?: Athlete } = {
    athlete: undefined,
};

interface Props {
    children: any;
}

/**
 * @interface StateManager - the props and methods necessary for the state manager.
 * @param store - A store object as defined in the interface
 * @param athlete - An athlete object as defined in the interface
 * @method setStore - A method for setting the store with params
 * @method fetchStore - A method for retrieving the store
 * @method setItem - A method for setting the athlete with params
 * @method fetchItme - A method for retrieving the athlete.
 */
export interface StateManager {

    athlete?: Athlete;
    setAthlete: (item: Athlete) => void;
}

/** Creates a context for this state manager using the interface above.
 * Store&athlete is retrieved from the default values.
 * setStore/Athlete is an empty array
 * fetchStore/Items returns a new promise.*/
const StateContext = createContext<StateManager>({
    athlete: defaultValues.athlete,
    setAthlete: () => {},
});

/** creates a hook for using this state manager elsewhere, with the specified context. */
export const useStateManager = (): StateManager => useContext(StateContext);

/** Defines the setStore/Athlete as a useState, and the fetchStore/Athlete as an Axios call to the backend.
 * Uses slugs to fetch both store and athlete.  */
export const StateProvider = ({ children }: Props) => {
    const [athlete, setAthlete] = useState<Athlete | undefined>(defaultValues.athlete);

    /** returns the context for all children. */
    return (
        <StateContext.Provider
            value={{
                athlete,
                setAthlete
            }}
        >
            {children}
        </StateContext.Provider>
    );
};