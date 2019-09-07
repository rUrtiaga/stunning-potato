import React, { Fragment, useState, useEffect } from "react";
import LocationBar from "../../components/locationBar";
import PetsGrid from "../../components/petsGrid";
import { LostPetsProvider } from "../../utils/context/LostPets";
import { usePosition } from "../../utils/usePosition";

function validLocation(location) {
  return location.lat && location.lng;
}

function LostPets() {
  const { lat, long, error } = usePosition();
  const [geoLocation, setGeoLocation] = useState({ lat, lng: long });
  if (error) {
    console.log(error);
  }
  useEffect(() => {
    setGeoLocation({ lat, lng: long });
  }, [lat, long]);
  console.log(geoLocation);
  if (validLocation(geoLocation)) {
    return (
      <Fragment>
        <LostPetsProvider value={{ geoLocation, setGeoLocation }}>
          <LocationBar />
          <PetsGrid />
        </LostPetsProvider>
      </Fragment>
    );
  }
  return null;
}

export default LostPets;
