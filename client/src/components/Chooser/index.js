import React from "react"
import BigButton from "../Buttons/BigButton"
import { Grid, Typography } from "@material-ui/core"

const Chooser = props => {
  return (
    <div style={{ paddingBottom: 30 }}>
      <Grid container spacing={3} align="center" justify="center">
        <Grid item xs={12}>
          <Typography variant="h5">{props.title}</Typography>
        </Grid>

        {props.options.map(option => {
          return (
            <Grid item key={option} sm={12} md={"auto"}>
              <BigButton
                isSelected={props.selected === option}
                action={() => props.onSelect(option)}
              >
                {option}
              </BigButton>
            </Grid>
          )
        })}
        {/* {props.other?<OtherItem/>:null} */}
      </Grid>
    </div>
  )
}

export default Chooser
