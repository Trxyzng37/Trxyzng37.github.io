export class UsernamePasswordSignInResponse {
    public isSignIn: boolean;
    public passwordError: boolean;
    public uid: number;

    public constructor(isSignIn: boolean, passwordError: boolean, uid: number) {
        this.isSignIn = isSignIn;
        this.passwordError = passwordError;
        this.uid = uid;
    }
}