export class HttpError extends Error {
    status: number;
    message: string;


    constructor( status: number, message:string) {
        super(message ?? `HTTP Error ${status}`);
        this.status = status;
        this.message = message
       // this.name = "HttpError";
    }
}
