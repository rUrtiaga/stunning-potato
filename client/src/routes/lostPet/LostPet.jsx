import React, { useState, useContext } from "react"
import { Redirect } from "react-router-dom"
import { AuthContext } from "../../utils/context/Auth"
import { Button } from "@material-ui/core"

import uploadPet from "../loadPet/request/uploadPet"
import uploadImages from "../loadPet/request/uploadImages"

export default function LostPet(props) {
    const state = props.location.state

    const [pet, setpet] = useState(state && state.pet ? state.pet : {})
    const [images, setimages] = useState(
        state && state.images ? state.images : []
    )

    const user = useContext(AuthContext)

    const [screenNum, setscreenNum] = useState(0)

    const nextScreen = () => {
        return setscreenNum(screenNum + 1)
    }

    const prevScreen = () => {
        return setscreenNum(screenNum - 1)
    }

    const backWithRouter = () => {
        props.history.push({
            pathname: "/loadPet",
            state: {
                pet,
                images,
                referrer: "lostPet"
            }
        })
    }

    const makeRequests = async () => {
        let idPet
        try {
            idPet = await uploadPet(user, pet)
            await uploadImages(user, idPet, images)
        } catch (error) {
            console.log(error)
        }
    }

    if (!(state && state.pet)) {
        return (
            <Redirect
                to={{
                    pathname: "/loadPet",
                    state: { referrer: "lostPet" }
                }}
            />
        )
    } else {
        return (
            <>
                <Button onClick={() => backWithRouter()}> Back </Button>
                <Button onClick={() => makeRequests()}> SEND </Button>
            </>
        )
    }
}
