export class UserProfile {
    public uid: number;
    public name: string;
    public description: string;
    public created_at: string;
    public karma: number;
    public icon_base64: string;

    public constructor(uid: number, name: string, 
                        description: string, created_at: string, 
                        karma: number, icon_base64: string) {
        this.uid = uid;
        this.name = name;
        this.description = description;
        this.created_at = created_at;
        this.karma = karma;
        this.icon_base64 = icon_base64;
    }
}