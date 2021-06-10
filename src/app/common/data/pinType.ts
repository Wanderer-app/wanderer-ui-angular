export enum PinType {
    TIP = "TIP",
    WARNING = "WARNING",
    DANGER = "DANGER",
    SIGHT = "SIGHT",
    RESTING_PLACE = "RESTING_PLACE",
    MISC_FACT = "MISC_FACT"
}

export const AVAILABLE_PIN_TYPES: PinType[] = [
    PinType.TIP,
    PinType.WARNING,
    PinType.DANGER,
    PinType.SIGHT,
    PinType.RESTING_PLACE,
    PinType.MISC_FACT
]

export const pinTypeTranslations: Map<PinType, string> = new Map([
    [PinType.TIP, "რჩევა" ],
    [PinType.WARNING, "გაფრთხილება" ],
    [PinType.DANGER, "საფრთხე" ],
    [PinType.SIGHT, "ღირსშესანიშნაობა" ],
    [PinType.RESTING_PLACE, "დასვენების ადგილი" ],
    [PinType.MISC_FACT, "ფაქტი" ]
])

export const pinTypeIcons: Map<PinType, string> = new Map([
    [PinType.TIP, "tip.png" ],
    [PinType.WARNING, "warning.png" ],
    [PinType.DANGER, "danger.png" ],
    [PinType.SIGHT, "sight.png" ],
    [PinType.RESTING_PLACE, "resting-place.png" ],
    [PinType.MISC_FACT, "fact.png" ]
])