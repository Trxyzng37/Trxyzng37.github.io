export class CommentStatusResponse {
    public vote_type: string;
    public _id: number;
    public uid: number;

    public constructor(vote_type: string, _id: number, uid: number) {
        this.vote_type = vote_type;
        this._id = _id;
        this.uid = uid;
    }
}