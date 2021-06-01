export function dateAsRequestString(date: Date): string {
    return date.toJSON().replace('Z', '')
}