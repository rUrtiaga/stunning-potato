import React, { Fragment, useState, useEffect } from "react";
import LocationBar from "../../components/locationBar";
import PetsGrid from "../../components/petsGrid";
import { LostPetsProvider } from "../../utils/context/LostPets";
import { usePosition } from "../../utils/usePosition";
import { useToggle } from "../../utils/useToggle";
import Map from "../../components/map";
import Loading from "../../components/loading";

function validLocation(location) {
  return location.lat && location.lng;
}

function LostPets() {
  const { lat, lng } = usePosition();
  const [geoLocation, setGeoLocation] = useState({ lat, lng });
  const { on, toggle } = useToggle(true);

  useEffect(() => {
    setGeoLocation({ lat, lng });
  }, [lat, lng]);

  return (
    <Fragment>
      <LostPetsProvider
        value={{ geoLocation, setGeoLocation, toggleMap: toggle }}
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
