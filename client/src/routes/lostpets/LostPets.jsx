import React, { Fragment, useState, useEffect } from "react";
import LocationBar from "../../components/locationBar";
import PetsGrid from "../../components/petsGrid";
import { LostPetsProvider } from "../../utils/context/LostPets";
import { usePosition } from "../../utils/usePosition";
import { useToggle } from "../../utils/useToggle";
import Map from "../../components/map";
import Loading from "../../components/loading";
import { searchHereGeo } from "../../utils/here/hereService";

function validLocation(location) {
  return location.lat && location.lng;
}

function LostPets() {
  const { lat, lng } = usePosition();
  const [geoLocation, setGeoLocation] = useState({ lat, lng });
  const [keyboardInput, setkeyboardInput] = useState("");
  const { on, toggle } = useToggle(true);

  function fillInputFromGeo(loc) {
    if (loc.lat && loc.lng) {
      searchHereGeo(
        loc,
        r => {
          setkeyboardInput(r.Response.View[0].Result[0].Location.Address.Label);
        },
        e => console.log("Error Getting location from GeoLocation", e)
      );
    }
  }

  useEffect(() => {
    setGeoLocation({ lat, lng });
    fillInputFromGeo({ lat, lng });
  }, [lat, lng]);

  return (
    <Fragment>
      <LostPetsProvider
        value={{
          geoLocation,
          setGeoLocation,
          toggleMap: toggle,
          keyboardInput,
          setkeyboardInput,
          fillInputFromGeo
        }}
      >
        <LocationBar />
        {validLocation(geoLocation) ? (
          <Fragment>
            <Map hide={on} />
            <PetsGrid />
          </Fragment>
        ) : (
          <Loading />
        )}
      </LostPetsProvider>
    </Fragment>
  );
}

export default LostPets;
