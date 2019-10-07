import axios from "axios"
export default async function obtainPet(petId) {
    let res
    try {
        res = await axios.get(`/pets/${petId}`)
    } catch (error) {
        console.log(error)
        //TODO
        return error
    }
    return res.data
}
