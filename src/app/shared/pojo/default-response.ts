export class DefaultResponse {
    public error_code: number;
    public error_description: string;

    public constructor(error_code: number, error_description: string) {
        this.error_code = error_code;
        this.error_description = error_description;
    }
}