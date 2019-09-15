import { here } from "../../config";
import React, { useContext } from "react";
import HEREMap, { Marker } from "here-maps-react";
import { LostPetsContext } from "../../utils/context/LostPets";

export default function(props) {
  const { geoLocation, setGeoLocation } = useContext(LostPetsContext);
  if (props.hide) {
    return null;
  }
  return (
    <div style={{ width: "100%", height: "400px", marginBottom: "1em" }}>
      <HEREMap
        appId={here.id}
        appCode={here.code}
        center={geoLocation}
        zoom={14}
      >
        <Marker
          lat={geoLocation.lat}
          lng={geoLocation.lng}
          draggable
          onDragEnd={e => {
            console.log("drag");
          }}
        />
      </HEREMap>
    </div>
  );
}
