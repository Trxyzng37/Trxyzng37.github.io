export class voteCommentRequest {
    post_id: number;
    uid: number;
    _id: number;
    vote: number;
    vote_type: string;

    public constructor(post_id: number, uid: number, _id: number, vote: number, vote_type: string) {
        this.post_id = post_id;
        this.uid = uid;
        this._id = _id;
        this.vote = vote;
        this.vote_type = vote_type;
    }
}