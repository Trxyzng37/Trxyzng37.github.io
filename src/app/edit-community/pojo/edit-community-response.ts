export class EditCommunityResponse {
    public editted: boolean;
    public error_code: number;
    
    public constructor(editted: boolean, error_code: number) {
        this.editted = editted;
        this.error_code = error_code;
    }
}