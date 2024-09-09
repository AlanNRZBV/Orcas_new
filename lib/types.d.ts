export interface IUser {
	name: string;
	lastName: string;
	middleName: string;
	password: string;
	email: string;
}

export interface IUserLogin {
	email: string;
	password: string;
}

export interface IErrorResponse {
	message: string;
	isJSON: boolean;
}
