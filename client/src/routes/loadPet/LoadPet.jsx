import React, { useState, useEffect, useContext } from "react"

import Chooser from "../../components/Chooser"
import { Button, Grid, TextField, Container } from "@material-ui/core"

import { DropzoneArea } from "material-ui-dropzone"

function LoadPet(props) {
    const state = props.location.state
    const isFromBack = state && state.pet
    const [screenNum, setscreenNum] = useState(isFromBack ? 2 : 0)
    //pantalla 0
    const [species, setspecies] = useState(
        state.pet && state.pet.species ? state.pet.species : null
    )
    const [age, setage] = useState(
        state.pet && state.pet.age ? state.pet.age : null
    )
    const [sex, setsex] = useState(
        state.pet && state.pet.sex ? state.pet.sex : null
    )

    const allFieldsSelected = species && age && sex
    useEffect(() => {}, [species, age, sex])
    //pantalla 1
    const [description, setdescription] = useState(
        state.pet && state.pet.description ? state.pet.description : ""
    )
    const [name, setname] = useState(
        state.pet && state.pet.name ? state.pet.name : ""
    )

    //pantalla 2
    const [files, setfiles] = useState(
        state && state.images ? state.images : []
    )

    const nextScreen = () => {
        return setscreenNum(screenNum + 1)
    }

    const prevScreen = () => {
        return setscreenNum(screenNum - 1)
    }

    const acceptPet = () => {
        switch (state.referrer) {
            case "lostPet":
                props.history.push({
                    pathname: "/lostPet",
                    state: {
                        pet: { species, age, sex, description, name },
                        images: files
                    }
                })
                break

            default:
                break
        }
    }

    switch (screenNum) {
        case 0:
            return (
                <Container component="main" maxWidth="md">
                    <Grid container align="center" justify="center">
                        <Chooser
                            title="Especie:"
                            options={["Gato", "Perro"]}
                            selected={species}
                            other="true"
                            onSelect={setspecies}
                        />
                    </Grid>
                    <Chooser
                        title="Edad:"
                        options={["Joven", "Adulto", "Anciano"]}
                        selected={age}
                        onSelect={setage}
                    />
                    <Chooser
                        title="Sexo:"
                        options={["Macho", "Hembra", "No sé"]}
                        selected={sex}
                        onSelect={setsex}
                    />
                    <div align="right">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={!allFieldsSelected}
                            onClick={() => nextScreen()}
                        >
                            Siguiente
                        </Button>
                    </div>
                </Container>
            )
            break
        case 1:
            return (
                <Container component="main" maxWidth="md">
                    <Grid container align="center" justify="center">
                        <Grid item align="left" xs={10}>
                            <TextField
                                label="Nombre"
                                placeholder="ingrese el nombre de la mascota"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                value={name}
                                onChange={e => setname(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Grid container align="center" justify="center">
                        <Grid item align="left" xs={10}>
                            <TextField
                                multiline
                                fullWidth
                                label="Descripción"
                                placeholder="describe tu mascota"
                                rows="10"
                                value={description}
                                onChange={e => setdescription(e.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid container align="center" justify="center">
                        <Grid item xs={10}>
                            <Grid container>
                                <Grid item xs={6} align="left">
                                    <Button
                                        color="primary"
                                        size="large"
                                        onClick={() => prevScreen()}
                                    >
                                        Atrás
                                    </Button>
                                </Grid>
                                <Grid item xs={6} align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        disabled={!name}
                                        onClick={() => nextScreen()}
                                    >
                                        Siguiente
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            )
            break
        case 2:
            return (
                <Container component="main" maxWidth="md">
                    <Grid container align="center" justify="center">
                        <Grid item xs={10}>
                            <DropzoneArea
                                initialFiles={files}
                                onChange={setfiles}
                                acceptedFiles={["image/*"]}
                                filesLimit={5}
                                dropzoneText={
                                    "Arrastre las imagenes aquí o haga click"
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container align="center" justify="center">
                        <Grid item xs={10}>
                            <Grid container>
                                <Grid item xs={6} align="left">
                                    <Button
                                        color="primary"
                                        size="large"
                                        onClick={() => prevScreen()}
                                    >
                                        Atrás
                                    </Button>
                                </Grid>
                                <Grid item xs={6} align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        disabled={!name}
                                        onClick={() => acceptPet()}
                                    >
                                        Siguiente
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            )
            break

        default:
            return null
            break
    }
}

export default LoadPet
