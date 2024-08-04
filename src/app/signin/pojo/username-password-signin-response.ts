export class UsernamePasswordSignInResponse {
    public isSignIn: boolean;
    public passwordError: boolean;

    public constructor(isSignIn: boolean, passwordError: boolean) {
        this.isSignIn = isSignIn;
        this.passwordError = passwordError;
    }
}