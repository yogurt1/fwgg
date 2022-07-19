export class SwapiError extends Error {
    static isSwapiError(error: unknown): error is SwapiError {
        return error instanceof this;
    }

    constructor(public readonly status: number, public readonly result: unknown) {
        super();
        this.name = "SwapiRequestError";
    }

    isUnknown(): boolean {
        return this.status === 0;
    }
    
    isNotFound(): boolean {
        return this.status === 404;
    }
}