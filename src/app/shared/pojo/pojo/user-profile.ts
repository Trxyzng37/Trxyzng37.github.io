export class UserProfile {
    public uid: number;
    public username: string;
    public description: string;
    public created_at: string;
    public post_karma: number;
    public comment_karma: number;
    public avatar: string;

    public constructor(uid: number, username: string, 
                        description: string, created_at: string, 
                        post_karma: number, comment_karma: number, avatar: string) {
        this.uid = uid;
        this.username = username;
        this.description = description;
        this.created_at = created_at;
        this.post_karma = post_karma;
        this.comment_karma = comment_karma;
        this.avatar = avatar;
    }
}