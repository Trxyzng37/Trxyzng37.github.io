export class GetPostResponse {
    public post_id: number;
    public type: string;
    public uid: number;
    public username: string;
    public username_icon: string;
    public community_id: number;
    public community_name: string;
    public community_icon: string;
    public title: string;
    public content: string;
    public created_at: string;
    public vote: number;
    public allow: number;
    public deleted: number;

    public constructor(post_id: number, type: string, uid: number, username: string, username_icon: string, community_id: number, community_name: string, community_icon: string, title: string, content: string, created_at: string, vote: number, allow: number, deleted: number) {
        this.post_id = post_id;
        this.type = type;
        this.uid = uid;
        this.username = username;
        this.username_icon = username_icon;
        this.community_id = community_id;
        this.community_name = community_name;
        this.community_icon = community_icon;
        this.title = title;
        this.content = content;
        this.created_at = created_at;
        this.vote = vote;
        this.allow = allow;
        this.deleted = deleted;
    }
}