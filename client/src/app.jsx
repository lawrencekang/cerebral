import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import { createStore } from 'redux';
import mapFunctions from './store/reducers';
import { setSearchResult } from './store/actionCreators';
import { Provider, connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './store/index'

const store = createStore(mapFunctions, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// for logging purposes
const unsubscribe = store.subscribe(() => console.log(store.getState()))

class SearchBox extends React.Component {
  constructor(props){
    super(props);

    this.onPlacesChanged = this.onPlacesChanged.bind(this);
  }
  render() {
    return <input id='autocomplete' ref='input' {...this.props} type='text'/>;
  }

  onPlacesChanged() {
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    } else {
      console.log("PLACES", this.searchBox.getPlaces());
    }

  }
  componentDidMount() {
    var input = ReactDOM.findDOMNode(this.refs.input);
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }
  componentWillUnmount() {
    // https://developers.google.com/maps/documentation/javascript/events#removing
    google.maps.event.clearInstanceListeners(this.searchBox);
  }
}

const AnyReactComponent = ({ text }) => <div>{text}</div>;
 

class MapApp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 37.794100,
        lng: -122.277470
      },
      zoom: 11
    }
  }

  
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '250px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB2XVrEfHWuqP96HePO6IoWEOA59eFdPtE' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.props.handleMapsApi(map,maps)}
        >
          <AnyReactComponent
            lat={37.794100}
            lng={-122.277470}
            text={'Hawk & Pony!'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

 MapApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapApp)

class Landing extends React.Component {

  constructor(props) {
    super(props);
  }

  handleMapsApi(map, maps) {
    console.log("GOT THE MAP", map)
  }

  componentDidMount(){
    console.log(this.props);
  }
  render() {
      return <div>
          <MapApp
            handleMapsApi={this.handleMapsApi}
            />
          <SearchBox
            
          />
      </div>;
  }
}

Landing = connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing)

ReactDOM.render(
  <Provider store={store}>
    <Landing/>
    </Provider>,
  document.getElementById('react')
  );
