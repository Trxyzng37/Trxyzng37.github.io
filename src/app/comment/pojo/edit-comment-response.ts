export class EditCommentResponse {
    public edit_comment: boolean;
    public error: string;

    public constructor(edit_comment: boolean, error: string) {
        this.edit_comment = edit_comment;
        this.error = error;
    }
}