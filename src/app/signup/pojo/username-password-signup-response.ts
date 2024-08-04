export class UsernamePasswordSignUpResponse {
    public isSignUp: number;
    public usernameError: number;
    public emailError: number;

    public constructor(isSignUp: number, usernameError: number, emailError: number) {
        this.isSignUp = isSignUp;
        this.usernameError = usernameError;
        this.emailError = emailError;
    }
}