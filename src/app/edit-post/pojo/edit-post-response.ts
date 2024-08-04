export class EditPostResponse {
    public edit_post: boolean;
    public error: string;

    public constructor(edit_post: boolean, error: string) {
        this.edit_post = edit_post
        this.error = error;
    }
}