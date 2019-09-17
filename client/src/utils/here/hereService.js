import {
    here
} from "../../config"

// import { usePlatform } from "here-maps-react";
//La librería esta implementando este uso
//   const platform = usePlatform({ app_code: here.code, app_id: here.id });
// const platform = new window.H.service.Platform({
//   app_id: here.id,
//   app_code: here.code
// });
const platform = new window.H.service.Platform({
    app_id: here.id,
    app_code: here.code
});

const geocoder = platform.getGeocodingService();

const searchHereText = function (keyboardInput, onResponseSearch, error) {
    geocoder.geocode({
            searchText: keyboardInput
        }, onResponseSearch, error ? error : e =>
        alert(e)
    );
}

const searchHereGeo = function (geoLocation, onResponseSearch, error) {
    geocoder.reverseGeocode({
            prox: geoLocation.lat + "," + geoLocation.lng,
            mode: 'retrieveAddresses',
            maxresults: '1',
            gen: '9'
        }, onResponseSearch, error ? error : e =>
        alert(e)
    );
}

export {
    platform,
    geocoder,
    searchHereText,
    searchHereGeo
}