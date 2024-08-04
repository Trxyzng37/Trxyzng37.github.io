export class Img {
    public data: string;
    public caption: string;
    public link: string;

    public constructor(data: string) {
        this.data = data;
        this.caption = "";
        this.link = "";
    }
}