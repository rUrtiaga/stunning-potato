import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { Button, Container, Grid, Typography, Box } from "@material-ui/core"
import DateLoader from "../../components/DateLoader"
import Map from "../../components/Map"

import { usePosition } from "../../utils/usePosition"

function validLocation(location) {
  return location.lat && location.lng
}

export default function LostPet(props) {
  const state = props.location.state

  const [pet, setpet] = useState(state && state.pet ? state.pet : {})
  const [images, setimages] = useState(
    state && state.images ? state.images : []
  )
  const [date, setdate] = useState(Date.now())
  const { lat, lng } = usePosition()
  const [pointLocation, setPointLocation] = useState({})
  const [zoomLocation, setZoomLocation] = useState({})

  // const user = useContext(AuthContext)

  useEffect(() => {
    setZoomLocation({ lat, lng })
    setPointLocation({ lat, lng })
  }, [lat, lng])

  const backWithRouter = () => {
    props.history.push({
      pathname: "/loadPet",
      state: {
        pet,
        images,
        referrer: "lostPet"
      }
    })
  }

  const toAcceptScreen = () => {
    props.history.push({
      pathname: "/lostPet/confirm",
      state: {
        pet,
        images,
        date,
        pointLocation,
        referrer: "lostPet"
      }
    })
  }

  if (!(state && state.pet)) {
    return (
      <Redirect
        to={{
          pathname: "/loadPet",
          state: { referrer: "lostPet" }
        }}
      />
    )
  } else {
    return (
      <Container component="main" maxWidth="md">
        {/* <Grid container align="center" justify="center"> */}
        <Box mb="2em">
          <Typography variant="h4" align="center">
            ¿Cuando y donde se perdió?
          </Typography>
        </Box>
        <Grid container align="center" justify="center">
          <Grid item>
            <DateLoader setSelectedDate={setdate} selectedDate={date} />
          </Grid>
          <Grid
            item
            md={6}
            style={{
              position: "relative",
              height: "600px",
              width: "600px"
            }}
          >
            {validLocation(zoomLocation) && validLocation(pointLocation) ? (
              <Map
                pointLocation={pointLocation}
                zoomLocation={zoomLocation}
                setPointLocation={setPointLocation}
                setZoomLocation={setZoomLocation}
              />
            ) : null}
          </Grid>
        </Grid>
        <Grid container align="center" justify="center">
          <Grid item xs={10}>
            <Grid container>
              <Grid item xs={6} align="left">
                <Button
                  color="primary"
                  size="large"
                  onClick={() => backWithRouter()}
                >
                  Atrás
                </Button>
              </Grid>
              <Grid item xs={6} align="right">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => toAcceptScreen()}
                >
                  Aceptar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    )
  }
}
