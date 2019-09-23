import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  card: {
    maxWidth: 300
  },
  media: {
    height: 140
  }
});

export default function SearchCard(props) {
  const classes = useStyles();
  const pet = props.pet;

  useEffect(() => {
    console.log(pet);
  }, [pet]);

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            // image={imagepath}
            // title=""
          />
          <CardContent>
            <Typography gutterBottom align="center" variant="h5" component="h2">
              {pet.name}
            </Typography>
            <Grid container spacing={1}>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Distancia: {pet.distance}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Especie: {pet.species}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Edad: {pet.age}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Compartir
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
