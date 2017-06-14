import { observable, action } from 'mobx';
import { PORTRAIT, GEOCODEAPI, WEATHERAPI } from '../const';

class Store {
    @observable orientation = PORTRAIT;
    @observable latitude = null;
    @observable longitude = null;
    @observable error = null;
    @observable country = null;

    @action
    changeOrientation(orientation) {
        this.orientation = orientation;
    }

    @action
    getCoords() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.error = null;
                this.getAddress(this.latitude, this.longitude);
            },
            (err) => {
                this.latitude = null;
                this.longitude = null;
                this.error = err;
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    @action
    getAddress(lat, lng) {
        const req = GEOCODEAPI + lat + ',' + lng;
        fetch(req)
            .then((response) => response.json())
            .then((responseJson) => {
                this.country = responseJson.results[0].address_components[6].long_name;
            })
            .catch((err) => {
                this.country = null;
            });
    }
}

export default new Store();