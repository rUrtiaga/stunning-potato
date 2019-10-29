import React, { useEffect } from "react"
import Button from "@material-ui/core/Button"
import { Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    bigButton: {
        padding: theme.spacing(1, 12, 1, 12)
    }
}))

function BigButton(props) {
    const classes = useStyles()

    useEffect(() => {}, [props.isSelected])

    return (
        <Button
            variant="contained"
            color={props.isSelected ? "secondary" : "inherit"}
            size="large"
            onClick={props.action}
        >
            <Typography variant="h5" className={classes.bigButton}>
                {props.children}
            </Typography>
        </Button>
    )
}

export default BigButton
