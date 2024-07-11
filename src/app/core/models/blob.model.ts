export interface IBlob {
    uri?: string;
    uriWithSasToken?: string;
    name?: string
    contentType?: string;
    content?: string;
    metaData?: IBlobMetaData;
}

export interface IBlobResponse {
    status?: string;
    error: boolean;
    blob?: IBlob;
}

export interface IBlobRequest {
    fileName: string;
    metaData?: IBlobMetaData;
}

export interface IBlobMetaData {
    title?: string;
    description?: string;
}