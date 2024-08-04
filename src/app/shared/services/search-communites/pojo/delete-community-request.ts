export class DeleteCommunityRequest {
    public id: number;
    public uid: number;
    public deleted: number;

    public constructor(id: number, uid: number, deleted: number) {
        this.id = id;
        this.uid = uid;
        this.deleted = deleted;
    }
}