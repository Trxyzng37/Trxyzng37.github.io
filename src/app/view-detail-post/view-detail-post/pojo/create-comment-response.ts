export class CreateCommentResponse {
    comment_created: boolean;

    public constructor(comment_created: boolean) {
        this.comment_created = comment_created;
    }
}