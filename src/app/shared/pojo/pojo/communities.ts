export class Communities {
    public id: number;
    public name: string;
    public uid: number;
    public description: string;
    public created_at: string;
    public subscriber_count: number;
    public avatar: string;
    public banner: string;
    public scope: number;
    public deleted: number;

    public constructor(id: number, name: string, uid: number,
                        description: string, created_at: string, 
                        subscriber_count: number, avatar: string,
                        banner: string, scope: number, deleted: number) {
        this.id = id;
        this.name = name;
        this.uid = uid;
        this.description = description;
        this.created_at = created_at;
        this.subscriber_count = subscriber_count;
        this.avatar = avatar;
        this.banner = banner;
        this.scope = scope;
        this.deleted = deleted;
    }
}