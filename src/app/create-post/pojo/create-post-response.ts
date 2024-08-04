export class CreatePostResponse {
    public CREATED: boolean;
    public POST_ID: number;

    public constructor(CREATED: boolean, POST_ID: number) {
        this.CREATED = CREATED;
        this.POST_ID = POST_ID;
    }
}