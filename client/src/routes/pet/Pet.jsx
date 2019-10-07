import React, { useEffect, useState } from "react"
import Grid from "@material-ui/core/Grid"
import ImageViewer from "../../components/imageViewer"
import PanelInfo from "../../components/panelInfoPet"
import obtainPet from "./request/obtainPet"
import Loading from "../../components/loading"

function Pet(props) {
    const [pet, setPet] = useState()
    useEffect(() => {
        const fetchPetData = async () => {
            let res = await obtainPet(props.location.state.petId)
            setPet(res)
        }
        fetchPetData()
    }, [])
    //Mientras hace la busqueda pongo un Loading
    if (!pet) {
        return <Loading />
    }
    return (
        <div>
            <Grid container spacing={5} direction="row">
                <Grid item md={6}>
                    <ImageViewer pics={pet.pics} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <PanelInfo pet={pet} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Pet
