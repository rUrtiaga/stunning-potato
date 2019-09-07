import React, { Fragment, useContext, useState, useEffect } from "react";
import { LostPetsContext } from "../../utils/context/LostPets";
import getPetsSearchsFromGeo from "./request/getPetsSerachsFromGeo";

export default function() {
  const { geoLocation } = useContext(LostPetsContext);
  const [pets, setPets] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await getPetsSearchsFromGeo(geoLocation);
      if (res.length >= 0) {
        setPets(res);
      }
    }
    fetchData();
  }, [geoLocation]);

  if (pets && pets.length > 0) {
    return (
      <Fragment>
        {pets.map(p => (
          <span key={p.name}>{p.name}</span>
        ))}
      </Fragment>
    );
  }
  return <span> no hay animales perdidos registrados</span>;
}
