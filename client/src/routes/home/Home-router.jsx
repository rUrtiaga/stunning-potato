import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Fragment>
      {/* <Link>Perdí</Link>
      <Link>Encontré</Link> */}

      <Link to="/lostpets">Mascotas Perdidas</Link>
      {/* <Link>Ser Voluntario</Link>
      <Link>Adoptar</Link> */}
    </Fragment>
  );
}
