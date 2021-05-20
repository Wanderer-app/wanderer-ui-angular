import { LatLng } from "../common/data/latLng";
import { PinType } from "../common/data/pinType";

export interface NewPinInfo {
    type: PinType, 
    routeCode: string, 
    location: LatLng
}