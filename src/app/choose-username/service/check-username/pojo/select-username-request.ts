export class SelectUsernameRequest {
    public email: string;
    public username:string;

    public constructor(email: string, username: string) {
        this.email = email;
        this.username = username;
    }
}