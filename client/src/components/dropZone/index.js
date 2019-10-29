import React, { useState, useEffect } from "react"
import { DropzoneArea } from "material-ui-dropzone"

export default function DropZone() {
    const [files, setfiles] = useState([])

    return (
        <DropzoneArea
            onChange={setfiles}
            acceptedFiles={["image/*"]}
            filesLimit={5}
            showPreviews={true}
            dropzoneText={"Arrastre las imagenes aquí o haga click"}
        />
    )
}
