import axios from "axios"

export default (user, pet) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: user.user.token
    }
  }
  return axios
    .post(
      `/users/${user.user._id}/pets`,
      {
        pet
      },
      config
    )
    .then(r => {
      console.log(r)
      r.status === 201
        ? console.log("Mascota creada correctamente")
        : console.log("no se pudo crear la mascota")
      return r.data.id
    })
    .catch(e => console.log(e))
}
