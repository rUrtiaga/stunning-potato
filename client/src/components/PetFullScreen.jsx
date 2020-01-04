import React from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import ImageViewer from "./imageViewer"
import PanelInfo from "./panelInfoPet"

export default function PetFullScreen(props) {
  return (
    <Grid container spacing={5} direction="row">
      <Grid item md={6}>
        <ImageViewer pics={props.pet.pics} />
      </Grid>
      <Grid item md={6} xs={12}>
        <PanelInfo pet={props.pet} />
      </Grid>
    </Grid>
  )
}
