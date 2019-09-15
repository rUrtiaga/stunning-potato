import {
  useState,
  useEffect
} from "react";

//Use GeoPosition From HTML5
export const useGeoPositionHTML5 = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({
    coords
  }) => {
    setPosition({
      lat: coords.latitude,
      lng: coords.longitude
    });
  };

  const onError = error => {
    console.log(error.message)
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    // let watcher = geo.watchPosition(onChange, onError);
    // return () => geo.clearWatch(watcher);
    geo.getCurrentPosition(onChange, onError)
  }, []);

  return {
    ...position,
    position,
    setPosition,
    setError,
    error
  };
};