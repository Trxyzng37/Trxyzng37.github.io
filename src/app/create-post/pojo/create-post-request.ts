export class CreatePostRequest {
    public type: string;
    public uid: number;
    public community_id: number;
    public title: string;
    public content: string;
    public created_at: Date;
    public allow: number;

    public constructor(type: string, uid: number, community_id: number, title: string, content: string, created_at: Date, allow: number) {
        this.type = type;
        this.community_id = community_id;
        this.uid = uid;
        this.title = title;
        this.content = content;
        this.created_at = created_at;
        this.allow = allow;
    }
}