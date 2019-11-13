import React, { Fragment } from "react"
import { Route } from "react-router-dom"
import Home from "./home"
import LostPets from "./lostpets"
import Pet from "./pet"
import LoadPet from "./loadPet/LoadPet"
import LostPet from "./lostPet/LostPet"
import ConfirmLostPet from "./lostPet/confirm/ConfirmLostPet"

export default props => {
    return (
        <Fragment>
            <Route exact path="/" component={Home} />
            <Route path="/lostpets" component={LostPets} />
            <Route path="/pet" component={Pet} />
            <Route path="/loadPet/" component={LoadPet} />
            <Route path="/lostPet/confirm" component={ConfirmLostPet} />
            <Route exact path="/lostPet/" component={LostPet} />
            {/* TODO for 404 <Route component={NoMatch}/> */}
        </Fragment>
    )
}
