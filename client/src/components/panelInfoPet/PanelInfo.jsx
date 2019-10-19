import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Container } from "@material-ui/core"
import { spacing } from "@material-ui/system"
import SharePanel from "./SharePanel"

const useStyles = makeStyles(theme => ({
    section1: {
        margin: theme.spacing(3, 2)
    },
    section2: {
        margin: theme.spacing(2, 1, 1)
    },
    name: {
        margin: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(4)
    },
    centered: {
        justifyContent: "center",
        textAlign: "center"
    }
}))

export default function PanelInfo(props) {
    const classes = useStyles()
    return (
        <Container>
            <Typography variant="h3" className={classes.section1}>
                Perdido
            </Typography>
            <Divider variant="middle" />
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography
                            variant="h6"
                            color="textPrimary"
                            className={classes.section2}
                        >
                            Nombre:
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography
                            variant="h4"
                            color="textPrimary"
                            className={classes.name}
                        >
                            {props.pet.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            className={classes.section2}
                        >
                            Distancia:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            className={classes.section2}
                        >
                            Tiempo Perdido:{props.pet.time}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            className={classes.section2}
                        >
                            Especie:{props.pet.species}
                        </Typography>
                    </Grid>
                </Grid>
            </div>

            <SharePanel />

            <Typography variant="inherit">Descripción: </Typography>

            <Typography variant="body2">{props.pet.description}</Typography>

            <Container className={classes.centered}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                >
                    Contactar
                </Button>
            </Container>
        </Container>
    )
}
