import {
    useEffect
} from "react";
import {
    useGeoPositionHTML5
} from "./useGeoPositionHTML5"
export const usePosition = () => {
    const {
        lat,
        lng,
        setPosition,
        setError,
        error
    } = useGeoPositionHTML5();
    useEffect(() => {
        if (error) {
            fetch('https://ipapi.co/json')
                .then(res => res.json())
                .then(location => setPosition({
                    lat: location.latitude,
                    lng: location.longitude
                })).catch(e => {
                    console.log("error getting ipapi location");
                    setError("error getting ipapi location")
                })
        }
    }, [error, setError, setPosition])
    return {
        lat,
        lng,
        error
    }
}