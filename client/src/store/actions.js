import { SET_SEARCH_RESULTS, SET_MAP_BOUNDS } from './actionTypes'

function setSearchResult(result){
    console.log("ACTION", result, SET_SEARCH_RESULTS);
    return { 
        type: SET_SEARCH_RESULTS,
        result }
}

function setMapBounds(bounds){
    console.log("MAPBOUNDS", bounds);
    return {
        type: SET_MAP_BOUNDS,
        bounds
    }
}

export {
    setSearchResult,
    setMapBounds
}