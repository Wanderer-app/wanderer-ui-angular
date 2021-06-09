import { formatDate } from "@angular/common"


export function now(): string {
    return georgianStandartTime(new Date())
}

export function georgianStandartTime(date: Date): string {
    return formatDate(date, "YYYY-MM-ddTHH:mm:ss", "en-US", "GMT+4")
}

