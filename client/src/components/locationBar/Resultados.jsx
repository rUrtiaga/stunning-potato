import React, { useRef } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

//despliega una lista de opciones debajo de un input
export default function(props) {
  const anchorRef = useRef(null);

  function handleMenuItemClick(event, index, element) {
    props.onSelect({
      lat: element.Location.DisplayPosition.Latitude,
      lng: element.Location.DisplayPosition.Longitude
    });
    props.setHide();
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    props.setHide();
  }

  if (props.open) {
    return (
      <Paper id="menu-list-grow">
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList>
            {props.list.map((element, index) => (
              <MenuItem
                key={element.Location.Address.Label}
                onClick={event => handleMenuItemClick(event, index, element)}
              >
                {element.Location.Address.Label}
              </MenuItem>
            ))}
          </MenuList>
        </ClickAwayListener>
      </Paper>
    );
  }
  return null;
}
