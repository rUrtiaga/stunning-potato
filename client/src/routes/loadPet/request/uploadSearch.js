import axios from "axios"

export default (user, pet, location, date) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: user.user.token
    }
  }

  return axios
    .post(
      `/users/${user.user._id}/pets/${pet}/search`,
      {
        location: {
          type: "Point",
          coordinates: [location.lat, location.lng]
        },
        date
      },
      config
    )
    .then(r => {
      console.log(r)
      r.status === 201
        ? console.log("Busqueda creada correctamente")
        : console.log("no se pudo crear la busqueda")
      return r.data.id
    })
    .catch(e => console.log(e))
}
