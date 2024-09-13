export interface IUser {
	username: string;
	password: string;
	email: string;
}

export interface IUserLogin {
	email: string;
	password: string;
}

export interface IUserFormResponse {
	data: null | string;
	zodErrors?: {
		[key: string]: string[];
	};
	dbErrorMsg: string | null;
	message: string;
	isJSON: boolean;
}
