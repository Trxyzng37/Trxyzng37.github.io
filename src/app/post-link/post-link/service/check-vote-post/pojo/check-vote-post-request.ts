export class CheckVotePostRequest {
    public post_id: number;
    public username: string;

    public constructor(post_id: number, username: string) {
        this.post_id = post_id;
        this.username = username;
    }
}