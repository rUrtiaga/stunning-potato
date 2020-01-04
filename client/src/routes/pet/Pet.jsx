import React, { useEffect, useState } from "react"
import obtainPet from "./request/obtainPet"
import Loading from "../../components/loading"
import PetFullScreen from "../../components/PetFullScreen"

function Pet(props) {
  const [pet, setPet] = useState()
  useEffect(() => {
    const fetchPetData = async () => {
      let res = await obtainPet(props.location.state.petId)
      setPet(res)
    }
    fetchPetData()
  }, [])
  //Mientras hace la busqueda pongo un Loading
  if (!pet) {
    return <Loading />
  }
  return <PetFullScreen pet={pet} />
}

export default Pet
