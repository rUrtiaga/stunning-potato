import React, { Fragment } from "react";
import { here } from "../../config";
import { LostPetsConsumer } from "../../utils/context/LostPets";
import Resultados from "./Resultados";

// DEPRECATED
class GeoSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", platform: "" };
  }
  //Busqueda del texto en servicio here
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

  //Manejo del imput
  handleChange(event) {
    this.setState({ value: event.target.value });
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
                  setGeoLocation(c);
                }}
              />
            );
          }}
        </LostPetsConsumer>
      </Fragment>
    );
  }
}

export default GeoSearch;
