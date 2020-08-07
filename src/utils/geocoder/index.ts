import NodeGeocoder from 'node-geocoder';
import { GEOCODER_PROVIDER, GEOCODER_API_KEY } from '../../../APP_KEYS';

const options: NodeGeocoder.Options = {
    provider: GEOCODER_PROVIDER,
    apiKey: GEOCODER_API_KEY,
    formatter: null
}

export const geocoder = NodeGeocoder(options);
