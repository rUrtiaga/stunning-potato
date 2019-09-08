import React, { Fragment } from "react";
export default class Resultados extends React.Component {
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
