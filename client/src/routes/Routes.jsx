import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Home from "./home";
import LostPets from "./lostpets";

export default () => {
  return (
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route path="/lostpets" component={LostPets} />
    </Fragment>
  );
};
