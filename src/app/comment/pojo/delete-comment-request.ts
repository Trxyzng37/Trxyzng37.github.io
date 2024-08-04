export class DeleteCommentRequest {
    public post_id: number;
    public _id: number;

    public constructor(post_id: number, _id: number) {
        this.post_id = post_id;
        this._id = _id;
    }
}