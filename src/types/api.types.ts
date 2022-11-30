export enum ReqMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum ResStatus {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
}

// https://stackoverflow.com/questions/41179474/use-object-literal-as-typescript-enum-values
export class HttpErrors {
    static readonly INVALID_QUERY_ID = new HttpErrors('The query ID is invalid', 400);
    static readonly BAD_REQUEST = new HttpErrors('Invalid request', 400);
    static readonly NOT_FOUND = new HttpErrors('The requested resource could not be found', 404);
    static readonly METHOD_NOT_ALLOWED = new HttpErrors('This method is not allowed', 405);
    private constructor(public readonly message: string, public readonly statusCode: number) {}
}
