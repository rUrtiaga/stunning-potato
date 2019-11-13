import React from "react"
import { Fab, makeStyles, Box, Typography } from "@material-ui/core"
import WhatsAppIcon from "@material-ui/icons/WhatsApp"
import FacebookIcon from "@material-ui/icons/Facebook"
import InstagramIcon from "@material-ui/icons/Instagram"

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2, 1, 2, 1)
  }
}))

export default function SharePanel(props) {
  const classes = useStyles()
  return (
    <Box boxShadow={1} mt={1} mb={2} mr={5} ml={5} p={1} borderRadius={8}>
      <Typography align="center">¡¡Ayuda compartiendo!!</Typography>
      <div align="center">
        <Fab
          size="small"
          aria-label="add"
          style={{ backgroundColor: "#25d366" }}
          className={classes.margin}
        >
          <WhatsAppIcon htmlColor="white" />
        </Fab>

        <Fab
          size="small"
          aria-label="add"
          style={{ backgroundColor: "#3b5998" }}
          className={classes.margin}
        >
          <FacebookIcon htmlColor="white" />
        </Fab>

        <Fab
          size="small"
          aria-label="add"
          style={{ backgroundColor: "#3f729b" }}
          className={classes.margin}
        >
          <InstagramIcon htmlColor="white" />
        </Fab>
      </div>
    </Box>
  )
}
