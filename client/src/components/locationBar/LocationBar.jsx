import React, { useState, useContext } from "react";
import { LostPetsContext } from "../../utils/context/LostPets";
import { searchHereText } from "../../utils/here/hereService";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MapIcon from "@material-ui/icons/Map";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import FindButton from "./FindButton";
import Resultados from "./Resultados";
import { useToggle } from "../../utils/useToggle";

const useStyles = makeStyles(theme => ({
  button: { float: "right" },
  center: {
    margin: "auto",
    width: "50%"
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  }
}));

export default function(props) {
  const classes = useStyles();
  const { on, toggle } = useToggle(false);
  const [loadProgress, setLoadProgress] = useState(false);
  const [listLocations, setlistLocations] = useState([]);
  const {
    setGeoLocation,
    toggleMap,
    keyboardInput,
    setkeyboardInput
  } = useContext(LostPetsContext);

  const searchGeo = () => {
    if (keyboardInput.length > 0) {
      setLoadProgress(true);
      searchHereText(keyboardInput, onResponseSearch);
    }
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      searchGeo();
    }
  };

  const onResponseSearch = r => {
    setLoadProgress(false);
    if (r.Response.View.length > 0) {
      setlistLocations(r.Response.View[0].Result);
      toggle();
    } else {
      setlistLocations([]);
    }
  };
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12} md={10}>
        <Paper className={classes.root} xs={2}>
          <InputBase
            placeholder="Search Location"
            value={keyboardInput}
            className={classes.center}
            onChange={i => setkeyboardInput(i.target.value)}
            onKeyPress={handleKeyPress}
          />
          {/** Load a loading animation only when query is processing */}
          {loadProgress ? <CircularProgress /> : null}
          {/** a map button to toggle map and select another location */}
          <IconButton onClick={toggleMap} className={classes.button}>
            <MapIcon />
          </IconButton>
          <FindButton onClick={searchGeo} className={classes.button} />
        </Paper>

        {/*Desplegar resultados */}
        <Resultados
          open={on}
          setHide={toggle}
          list={listLocations}
          onSelect={c => {
            setGeoLocation(c.geo);
            setkeyboardInput(c.addressLabel);
          }}
        />
      </Grid>
    </Grid>
  );
}
