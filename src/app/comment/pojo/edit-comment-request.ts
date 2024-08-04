export class EditCommentRequest {
    public post_id: number;
    public uid: number;
    public _id: number;
    public edit_content: string;

    public constructor(post_id: number, uid: number, _id: number, edit_content: string) {
        this.post_id = post_id;
        this.uid = uid;
        this._id = _id;
        this.edit_content = edit_content;
    }
}