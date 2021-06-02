export function dateAsRequestString(date: Date): string {
    return date.toJSON().replace('Z', '')
}

export function now(): string {
    return new Date().toJSON().replace('Z', '')
}