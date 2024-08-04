export class VotePostResponse {
    public post_id: number;
    public voteUpdated: boolean;

    public constructor(post_id: number,voteUpdated: boolean) {
        this.post_id = post_id;
        this.voteUpdated = voteUpdated;
    }
}