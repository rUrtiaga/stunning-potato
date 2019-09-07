import React, { Fragment } from "react";
import HereMap from "./HereMap";
import { here } from "../../config";
import axios from "axios";
import { LostPetsConsumer } from "../../utils/context/LostPets";

class Resultados extends React.Component {
  render() {
    let l = this.props.list;
    if (l) {
      return (
        <Fragment>
          {l.map(element => (
            <button
              onClick={() =>
                this.props.onSelect({
                  lat: element.Location.DisplayPosition.Latitude,
                  lng: element.Location.DisplayPosition.Longitude
                })
              }
              id={element.Location.Address.Label}
              key={element.Location.Address.Label}
            >
              * {element.Location.Address.Label}
            </button>
          ))}
        </Fragment>
      );
    } else {
      return null;
    }
  }
}

class GeoSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", platform: "" };
  }
  searchGeo(text) {
    var platform = new window.H.service.Platform({
      app_id: here.id,
      app_code: here.code
    });

    this.setState({ platform: platform });

    var geocoder = platform.getGeocodingService();

    var geocodingParams = {
      searchText: text
    };

    geocoder.geocode(geocodingParams, r => this.onGeocodeChange(r), function(
      e
    ) {
      alert(e);
    });
  }

  onGeocodeChange(r) {
    return this.setState({
      list: r.Response.View[0].Result
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleMapSelect(coord) {
    if (this.state.map) {
      this.state.map.setCenter(coord);
    } else {
      let map = HereMap(this.state.platform, coord);
      this.setState({ selectCoord: coord, map });
    }
  }

  render() {
    return (
      <Fragment>
        <input
          type="text"
          name="addressname"
          id="addressname"
          value={this.state.value}
          onChange={e => this.handleChange(e)}
        />
        <button onClick={() => this.searchGeo(this.state.value)}>Buscar</button>
        {/*Desplegar resultados */}
        <LostPetsConsumer>
          {({ setGeoLocation }) => {
            return (
              <Resultados
                list={this.state.list}
                onSelect={c => {
                  this.handleMapSelect(c);
                  setGeoLocation(c);
                }}
              />
            );
          }}
        </LostPetsConsumer>
        <div id="mapContainer" style={{ width: "100%", height: "400px" }} />
      </Fragment>
    );
  }
}

export default GeoSearch;
