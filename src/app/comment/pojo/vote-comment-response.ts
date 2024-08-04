export class VoteCommentResponse {
    vote_updated: boolean;
    error: string;

    public constructor(vote_updated: boolean, error: string) {
        this.vote_updated = vote_updated;
        this.error = error;
    }
}