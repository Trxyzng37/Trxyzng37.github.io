export class Communities {
    public community_id: number;
    public name: string;
    public description: string;
    public created_at: string;
    public subscriber_count: number;
    public icon_base64: string;

    public constructor(community_id: number, name: string, 
                        description: string, created_at: string, 
                        subscriber_count: number, icon_base64: string) {
        this.community_id = community_id;
        this.name = name;
        this.description = description;
        this.created_at = created_at;
        this.subscriber_count = subscriber_count;
        this.icon_base64 = icon_base64;
    }
}