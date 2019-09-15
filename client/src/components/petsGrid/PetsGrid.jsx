import React, { Fragment, useContext, useState, useEffect } from "react";
import { LostPetsContext } from "../../utils/context/LostPets";
import getPetsSearchsFromGeo from "./request/getPetsSerachsFromGeo";
import MiniPet from "../../components/miniPet";

export default function() {
  const { geoLocation } = useContext(LostPetsContext);
  const [pets, setPets] = useState();

  useEffect(() => {
    async function fetchData() {
      let res = await getPetsSearchsFromGeo(geoLocation);

      if (res && res.length >= 0) {
        setPets(res);
      }
    }
    fetchData();
    return;
  }, [geoLocation]);

  if (pets) {
    if (pets.length > 0) {
      return (
        <Fragment>
          {pets.map(p => (
            <MiniPet pet={p} key={p._id} />
          ))}
        </Fragment>
      );
    } else {
      return <span> no hay mascotas perdidas</span>;
    }
  }
  return <span> Buscando </span>;
}
