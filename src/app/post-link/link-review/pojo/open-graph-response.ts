export class OpenGraphResponse {
    public link: string;
    public title: string;
    public image: string;
    public url: string;

    public constructor(link: string, title: string, image: string, url: string) {
        this.link = link;
        this.title = title;
        this.image = image;
        this.url = url;
    }
}