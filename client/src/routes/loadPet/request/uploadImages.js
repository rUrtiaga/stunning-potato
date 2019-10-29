import axios from "axios"

export default (user, idPet_, images) => {
    if (images.length == 0) {
        return
    }
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: user.user.token
        }
    }
    let bodyFormData = new FormData()
    images.forEach((filePath, index) => {
        bodyFormData.append(index == 0 ? "principal" : "pics", filePath)
    })
    return axios.post(
        `/users/${user.user._id}/pets/${idPet_}/pics`,
        bodyFormData,
        config
    )
}
