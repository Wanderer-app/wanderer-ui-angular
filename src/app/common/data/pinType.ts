export enum PinType {
    TIP = "რჩევა",
    WARNING = "გაფრთხილება",
    DANGER = "საფრთხე",
    SIGHT = "ღირსშესანიშნაობა",
    RESTING_PLACE = "დასვენების ადგილი",
    MISC_FACT = "ფაქტი"
}

export const AVAILABLE_PIN_TYPES: PinType[] = [
    PinType.TIP,
    PinType.WARNING,
    PinType.DANGER,
    PinType.SIGHT,
    PinType.RESTING_PLACE,
    PinType.MISC_FACT
]

export const pinTypeNames: Map<PinType, string> = new Map([
    [PinType.TIP, "TIP" ],
    [PinType.WARNING, "WARNING" ],
    [PinType.DANGER, "DANGER" ],
    [PinType.SIGHT, "SIGHT" ],
    [PinType.RESTING_PLACE, "RESTING_PLACE" ],
    [PinType.MISC_FACT, "MISC_FACT" ]
])