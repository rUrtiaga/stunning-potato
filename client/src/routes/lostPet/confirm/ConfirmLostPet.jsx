import React, { useContext } from "react"
import { AuthContext } from "../../../utils/context/Auth"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Container, Box, Grid, Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"

import uploadPet from "../../loadPet/request/uploadPet"
import uploadImages from "../../loadPet/request/uploadImages"
import uploadSearch from "../../loadPet/request/uploadSearch"
import PetFullScreen from "../../../components/PetFullScreen"
import SearchCard from "../../../components/searchCard"

const useStyles = makeStyles(theme => ({
  sizing: {
    transform: `scale(0.7)`,
    transformOrigin: "top"
  }
}))

export default function ConfirmLostPet(props) {
  const routerState = props.location.state
  const user = useContext(AuthContext)
  const classes = useStyles()

  const makeRequests = async () => {
    let idPet
    try {
      idPet = routerState.idPet
        ? routerState.idPet
        : await uploadPet(user, routerState.pet)
      await uploadImages(user, idPet, routerState.images)
      await uploadSearch(
        user,
        idPet,
        routerState.pointLocation,
        routerState.date
      )
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      <Box mb="2em">
        <Typography variant="h3" align="center">
          Así se verá tu publicación:
        </Typography>
      </Box>
      <Grid container>
        <Grid item md={8}>
          <Box width="800px" height="600px" padding={2}>
            <Paper className={classes.sizing} m={2}>
              <PetFullScreen
                pet={{ ...routerState.pet, images: routerState.images }}
              />
            </Paper>
          </Box>
        </Grid>

        <Grid item md={4}>
          <SearchCard
            pet={{ ...routerState.pet, images: routerState.images }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={makeRequests}
          >
            Confirmar
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
