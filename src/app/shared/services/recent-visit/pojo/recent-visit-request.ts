export class RecentVisitRequest {
    public uid: number;
    public visit_id: number;

    public constructor(uid: number, visit_id: number) {
        this.uid = uid;
        this.visit_id = visit_id;
    }
}