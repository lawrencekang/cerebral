import { setSearchResult, setMapBounds } from './actions'

const boundSetSearchResult = result => dispatch(setSearchResult(result));
const boundSetMapBounds = bounds => dispatch(setMapBounds(bounds));

export {
    boundSetSearchResult, boundSetMapBounds
}