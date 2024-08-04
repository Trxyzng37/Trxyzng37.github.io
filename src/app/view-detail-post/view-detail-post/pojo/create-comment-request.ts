export class CommentRequest {
    public post_id: number;
    public uid: number;
    public parent_id: number;
    public content: string;
    public level: number;

    public constructor(post_id: number, uid: number, parent_id: number, content: string, level: number) {
        this.post_id = post_id;
        this.uid = uid;
        this.parent_id = parent_id;
        this.content = content;
        this.level = level;
    }
}