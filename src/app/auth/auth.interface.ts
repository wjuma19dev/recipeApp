export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export interface loadedUser {
    email: string,
    id: string;
    _token: string;
    _tokenExpirationDate: Date
}