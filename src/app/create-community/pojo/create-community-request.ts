export class CreateCommunityRequest {
    public uid: number;
    public name: string;
    public description: string;
    public avatar: string;
    public banner: string;
    public scope: number;

    public constructor(uid: number, name: string, description: string, avatar: string, banner: string, scope: number) {
        this.uid = uid;
        this.name = name;
        this.description = description;
        this.avatar = avatar;
        this.banner = banner;
        this.scope = scope;
    }
}