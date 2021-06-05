import { formatDate } from "@angular/common"

export function dateAsRequestString(date: Date): string {
    return georgianStandartTime(date)
}

export function now(): string {
    return georgianStandartTime(new Date())
}

function georgianStandartTime(date: Date): string {
    return formatDate(date, "YYYY-MM-ddTHH:mm:ss", "en-US", "GMT+4")
}