import React, { useState, useContext, Fragment } from "react";
import { LostPetsContext } from "../../utils/context/LostPets";
// import { usePlatform } from "here-maps-react";
import { here } from "../../config";
import Resultados from "./Resultados";

export default function(props) {
  const [keyboardInput, setkeyboardInput] = useState("");
  const [listLocations, setlistLocations] = useState([]);
  const { setGeoLocation, toggle } = useContext(LostPetsContext);
  //La libreria esta implementadno este uso
  //   const platform = usePlatform({ app_code: here.code, app_id: here.id });
  const platform = new window.H.service.Platform({
    app_id: here.id,
    app_code: here.code
  });
  const geocoder = platform.getGeocodingService();

  const searchGeo = () => {
    if (keyboardInput.length > 0) {
      geocoder.geocode({ searchText: keyboardInput }, onResponseSearch, e =>
        alert(e)
      );
    }
  };

  const onResponseSearch = r => {
    setlistLocations(r.Response.View[0].Result);
  };
  return (
    <Fragment>
      <input
        type="text"
        name="addressname"
        id="addressname"
        value={keyboardInput}
        onChange={i => setkeyboardInput(i.target.value)}
      />
      <button onClick={toggle}>map</button>
      <button onClick={searchGeo}>Buscar</button>
      {/*Desplegar resultados */}
      <Resultados
        list={listLocations}
        onSelect={c => {
          setGeoLocation(c);
        }}
      />
    </Fragment>
  );
}
