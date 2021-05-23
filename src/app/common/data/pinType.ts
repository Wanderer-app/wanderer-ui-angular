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