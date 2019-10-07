import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    section1: {
        margin: theme.spacing(3, 2)
    },
    section2: {
        margin: theme.spacing(2, 2, 2)
    },
    section3: {
        margin: theme.spacing(3, 1, 1)
    }
}))

export default function PanelInfo(props) {
    const classes = useStyles()
    return (
        <div>
            <Typography variant="h3" className={classes.section1}>
                Perdido
            </Typography>
            <Divider variant="middle" />
            <div style={{ margin: 2 + "em" }}>
                <Grid container>
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
                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            className={classes.section2}
                        >
                            Nombre:{props.pet.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
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

            <Typography variant="inherit">Descripción: </Typography>

            <Typography variant="body2">{props.pet.description}</Typography>
        </div>
    )
}
