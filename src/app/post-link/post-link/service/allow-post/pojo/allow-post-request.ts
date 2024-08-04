export class AllowPostRequest {
    public post_id: number;
    public allow: number;

    public constructor(post_id: number, allow: number) {
        this.post_id = post_id;
        this.allow = allow;
    }
}