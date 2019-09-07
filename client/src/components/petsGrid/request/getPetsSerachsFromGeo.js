import axios from "axios";
export default async function getPetsSerachsFromGeo(coord) {
    const res = await axios.get("/lostpets", {
        params: {
            lat: coord.lat,
            long: coord.lng
        }
    });
    console.log(res.data)
    return res.data
}