export class SavedPostRequest {
    public uid: number;
    public post_id: number;
    public saved: number;

    public constructor(uid: number, post_id: number, saved: number) {
        this.uid = uid;
        this.post_id = post_id;
        this.saved = saved;
    }
}