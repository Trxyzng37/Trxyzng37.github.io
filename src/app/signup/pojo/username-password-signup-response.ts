export class UsernamePasswordSignUpResponse {
    public isSignUp: boolean;
    public usernameError: boolean;
    public emailError: boolean;

    public constructor(isSignUp: boolean, usernameError: boolean, emailError: boolean) {
        this.isSignUp = isSignUp;
        this.usernameError = usernameError;
        this.emailError = emailError;
    }
}