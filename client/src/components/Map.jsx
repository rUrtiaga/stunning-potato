import React, { useRef } from "react"
import { Map, TileLayer, Marker } from "react-leaflet"

export default props => {
  //necesario para el marcador
  let markerRef = useRef()

  let updatePosition = () => {
    const marker = markerRef.current
    if (marker != null) {
      const latLng = marker.leafletElement.getLatLng()
      props.setPointLocation({
        lat: latLng.lat,
        lng: latLng.lng
      })
    }
  }

  return (
    <Map
      center={props.zoomLocation}
      zoom={8}
      style={{
        position: "relative",
        height: "inherit",
        width: "inherit"
      }}
    >
      <Marker
        draggable={true}
        onDragend={updatePosition}
        position={props.pointLocation}
        ref={markerRef}
      />
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  )
}
