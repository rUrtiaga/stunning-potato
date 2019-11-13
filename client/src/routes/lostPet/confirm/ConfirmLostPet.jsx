import React, { useContext } from "react"
import { AuthContext } from "../../../utils/context/Auth"
import { Button, Container } from "@material-ui/core"

import uploadPet from "../../loadPet/request/uploadPet"
import uploadImages from "../../loadPet/request/uploadImages"
import uploadSearch from "../../loadPet/request/uploadSearch"

export default function ConfirmLostPet(props) {
  const routerState = props.location.state
  const user = useContext(AuthContext)

  const makeRequests = async () => {
    let idPet
    try {
      idPet = routerState.idPet
        ? routerState.idPet
        : await uploadPet(user, routerState.pet)
      await uploadImages(user, idPet, routerState.images)
      await uploadSearch(
        user,
        idPet,
        routerState.pointLocation,
        routerState.date
      )
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      <Button color="primary" size="large" onClick={makeRequests}>
        MAKE REQUEST
      </Button>
    </Container>
  )
}
