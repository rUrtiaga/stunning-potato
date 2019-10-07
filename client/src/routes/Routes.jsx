import React, { Fragment } from "react"
import { Route } from "react-router-dom"
import Home from "./home"
import LostPets from "./lostpets"
import Pet from "./pet"

export default () => {
    return (
        <Fragment>
            <Route exact path="/" component={Home} />
            <Route path="/lostpets" component={LostPets} />
            <Route path="/pet" component={Pet} />
        </Fragment>
    )
}
