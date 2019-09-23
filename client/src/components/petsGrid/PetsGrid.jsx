import React, { useContext, useState, useEffect } from "react";
import { LostPetsContext } from "../../utils/context/LostPets";
import getPetsSearchsFromGeo from "./request/getPetsSerachsFromGeo";
import SearchCard from "../../components/searchCard";

import Grid from "@material-ui/core/Grid";

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
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={3}
        >
          {pets.map(p => (
            <SearchCard pet={p} key={p._id} />
          ))}
        </Grid>
      );
    } else {
      return <span> no hay mascotas perdidas</span>;
    }
  }
  return <span> Buscando </span>;
}
