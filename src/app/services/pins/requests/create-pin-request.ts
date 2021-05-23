import { FileData } from "src/app/common/data/file-data";
import { LatLng } from "src/app/common/data/latLng";
import { PinType } from "src/app/common/data/pinType";

export interface CreatePinRequest {
    onDate: string,
    userId: number,
    type: PinType,
    title: string,
    text: string,
    attachedFile?: FileData,
    location: LatLng
    routeCode: string
  }