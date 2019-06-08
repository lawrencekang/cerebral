import { boundSetSearchResult, boundSetMapBounds } from './actionCreators';

const mapStateToProps = state => {
    console.log("MAPPING STATE")
    return {
        mapBounds: state.mapBounds,
        searchResults: state.searchResults
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log("MAPPING DISPATCH")
    return {
        boundSetSearchResult, boundSetMapBounds
    }
}

export {
    mapDispatchToProps,
    mapStateToProps
}