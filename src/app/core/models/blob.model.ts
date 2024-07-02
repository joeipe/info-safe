export interface IBlob {
    uri?: string;
    name?: string
    contentType?: string;
    content?: string;
}

export interface IBlobResponse {
    status?: string;
    error: boolean;
    blob?: IBlob;
}

export interface IBlobRequest {
    fileName: string;
}