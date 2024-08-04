export class VotePostRequest {
    public post_id: number;
    public vote:number;
    public uid: number;
    public type: string;

    public constructor(post_id: number, vote:number, uid: number, type: string) {
        this.post_id = post_id;
        this.vote = vote;
        this.uid = uid;
        this.type = type;
    }
}