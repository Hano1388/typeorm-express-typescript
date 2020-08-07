import { geocoder } from '../../utils/geocoder/index';

export const setAddressFields = async function (entity) {
    // this if statement is just for testing, it needs to be removed
    if (!entity.address) {
        entity.address = 'Vancouver BC';
    }
    if (entity.address) {
        const addressFields = await geocoder.geocode(entity.address);
        const { formattedAddress: address, latitude, longitude } = addressFields[0];
        entity.address = address;
        entity.latitude = latitude;
        entity.longitude = longitude;
    }
}