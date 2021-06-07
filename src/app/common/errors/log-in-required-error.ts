export class LogInRequiredError extends Error {

    constructor (m: string) {
        super(m)
    }
}