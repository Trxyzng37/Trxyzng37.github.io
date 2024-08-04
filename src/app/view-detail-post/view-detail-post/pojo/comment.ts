export class Comment {
    public _id: number;
    public post_id: number;
    public uid: number;
    public username: string;
    public user_icon: string;
    public parent_id: number;
    public content: string;
    public level: number;
    public created_at: string;
    public vote: number;
    public deleted: boolean;

    public constructor(_id: number, post_id: number, uid: number, username: string, user_icon: string, parent_id: number, content: string, level: number, created_at: string, vote: number, deleted: boolean) {
        this._id = _id;
        this.post_id = post_id;
        this.uid = uid;
        this.username = username;
        this.user_icon = user_icon;
        this.parent_id = parent_id;
        this.content = content;
        this.level = level;
        this.created_at = created_at;
        this.vote = vote;
        this.deleted = deleted;
    }
}