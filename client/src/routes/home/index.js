import React from "react"
import { Link } from "react-router-dom"
import { Button, Grid, Typography, makeStyles } from "@material-ui/core"
import bgImage from "../../assets/images/home/home.jpg"

const useStyles = makeStyles(theme => ({
    bigButton: {
        padding: theme.spacing(1, 12, 1, 12)
    },
    lowBarButtons: {
        marginTop: theme.spacing(20)
    },
    centerAbsolute: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    },
    background: {
        height: "100%",
        position: "fixed",
        width: "100%",
        backgroundImage: `url(${bgImage})`,
        opacity: "0.5",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    }
}))

export default function Home() {
    const classes = useStyles()
    return (
        <>
            {/**Este div está para tener la imagen de fondo */}
            <div className={classes.background}></div>
            <Grid container className={classes.centerAbsolute}>
                <Grid container justify="center" align="center">
                    <Grid item xs={6} align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            component={React.forwardRef((props, ref) => (
                                <Link to="/lostPet" {...props} ref={ref} />
                            ))}
                        >
                            <Typography
                                variant="h4"
                                className={classes.bigButton}
                            >
                                Perdí
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={6} align="center">
                        <Button
                            disabled
                            variant="contained"
                            color="primary"
                            size="large"
                            component={React.forwardRef((props, ref) => (
                                <Link to="/" {...props} ref={ref} />
                            ))}
                        >
                            <Typography
                                variant="h4"
                                className={classes.bigButton}
                            >
                                Encontré
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    className={classes.lowBarButtons}
                >
                    <Grid item xs={4} align="right">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            component={React.forwardRef((props, ref) => (
                                <Link to="/lostpets" {...props} ref={ref} />
                            ))}
                        >
                            <Typography variant="h6">
                                Mascotas Perdidas
                            </Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={3} align="center">
                        <Button
                            disabled
                            variant="contained"
                            color="primary"
                            size="large"
                            component={React.forwardRef((props, ref) => (
                                <Link to="/lostpets" {...props} ref={ref} />
                            ))}
                        >
                            <Typography variant="h6">Adoptá</Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={4} align="left">
                        <Button
                            disabled
                            variant="contained"
                            color="primary"
                            size="large"
                            component={React.forwardRef((props, ref) => (
                                <Link to="/lostpets" {...props} ref={ref} />
                            ))}
                        >
                            <Typography variant="h6">Voluntarios</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
