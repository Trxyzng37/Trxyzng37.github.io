export class JoinCommunityResponse {
    public join_community: number;
    public error_code: number;

    public constructor(join_community: number, error_code: number) {
        this.join_community = join_community;
        this.error_code = error_code;
    }
}