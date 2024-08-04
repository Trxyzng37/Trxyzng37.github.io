export class EmailExistResponse {
    public emailExist: boolean;
    public googleEmail: boolean;

    public constructor(emailExist: boolean, googleEmail: boolean) {
        this.emailExist = emailExist;
        this.googleEmail = googleEmail;
    }
}