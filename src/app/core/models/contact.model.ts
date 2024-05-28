export interface IContact {
    id: number;
    firstName: string;
    lastName: string
    doB: string;
    address?: IAddress;
    emailAddresses?: IEmailAddress[];
    phoneNumber?: IPhoneNumber;
}

export interface IAddress {
    id: number;
    contactId: number;
    address1: string;
    address2?: string;
    address3?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

export interface IEmailAddress {
    id: number;
    contactId: number;
    email: string;
}

export interface IPhoneNumber {
    id: number;
    contactId: number;
    mobile: string;
    business?: string;
    work?: string;
}