import React, { Fragment, useState, useEffect } from "react";
import LocationBar from "../../components/locationBar";
import PetsGrid from "../../components/petsGrid";
import { LostPetsProvider } from "../../utils/context/LostPets";
import { usePosition } from "../../utils/usePosition";
import { useToggle } from "../../utils/useToggle";
import Map from "../../components/map";

function validLocation(location) {
  return location.lat && location.lng;
}

function LostPets() {
  const { lat, lng, error } = usePosition();
  const [geoLocation, setGeoLocation] = useState({ lat, lng });
  const { on, toggle } = useToggle();
  if (error) {
    console.log(error);
  }
  useEffect(() => {
    setGeoLocation({ lat, lng });
  }, [lat, lng]);

  if (validLocation(geoLocation)) {
    return (
      <Fragment>
        <LostPetsProvider value={{ geoLocation, setGeoLocation, toggle }}>
          <LocationBar />
          <Map hide={on} />
          <PetsGrid />
        </LostPetsProvider>
      </Fragment>
    );
  }
  return null;
}

export default LostPets;
