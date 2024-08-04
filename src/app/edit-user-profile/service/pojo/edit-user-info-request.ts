export class EditUserProfileRequest {
    public uid: number;
    public description: string;
    public avatar: string;

    public constructor(uid: number, description: string, avatar: string) {
        this.uid = uid;
        this.description = description;
        this.avatar = avatar;
    }
}