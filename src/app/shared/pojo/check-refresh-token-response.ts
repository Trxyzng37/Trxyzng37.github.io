export class CheckRefreshTokenResponse {
    public exist: boolean;

    public constructor(exist: boolean) {
        this.exist = exist;
    }
}