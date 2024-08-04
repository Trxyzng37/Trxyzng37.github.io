export class JoinCommunityRequest {
    public uid: number;
    public community_id: number;
    public subscribed: number;

    public constructor(uid: number, community_id: number,subscribed: number) {
        this.uid = uid;
        this.community_id = community_id;
        this.subscribed = subscribed;
    }
}