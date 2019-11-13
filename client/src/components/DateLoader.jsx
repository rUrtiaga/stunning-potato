//Libreria para manejo de fechas
import "date-fns"
//Importo y uso el formato para hispanohablantes
import dateLocaleES from "date-fns/locale/es"
import React from "react"
import DateFnsUtils from "@date-io/date-fns"
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers"

export default function DateLoader(props) {
    const handleDate = date => {
        props.setSelectedDate(date)
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLocaleES}>
            <KeyboardDatePicker
                disableToolbar
                variant="static"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Fecha"
                value={props.selectedDate}
                onChange={handleDate}
                KeyboardButtonProps={{
                    "aria-label": "Seleccione una fecha"
                }}
            />
        </MuiPickersUtilsProvider>
    )
}
