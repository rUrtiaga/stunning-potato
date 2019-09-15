import axios from "axios";
export default async function getPetsSerachsFromGeo(coord) {
    let res;
    try {
        res = await axios.get("/lostpets", {
            params: {
                lat: coord.lat,
                long: coord.lng
            }
        });
    } catch (error) {
        console.log(error)
        //TODO 
        return error
    }
    return res.data
}