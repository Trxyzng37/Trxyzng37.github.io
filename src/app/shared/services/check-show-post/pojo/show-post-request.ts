export class ShowPostRequest {
    public uid: number;
    public post_id: number;
    public show: number;

    public constructor(uid: number, post_id: number, show: number) {
        this.uid = uid;
        this.post_id = post_id;
        this.show = show;
    }
}