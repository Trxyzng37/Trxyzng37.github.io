export class PostResponse {
    public post_id: number;
    public communityName: string;
    public userName: string;
    public created_at: string;
    public vote: number;
    public communityIcon: string;

    public constructor(post_id: number, communityName: string, userName: string, created_at: string, vote: number, communityIcon: string) {
        this.post_id = post_id;
        this.communityName = communityName;
        this.userName = userName;
        this.created_at = created_at;
        this.vote = vote;
        this.communityIcon = communityIcon;
    }
}