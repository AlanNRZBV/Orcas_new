export type UserData = {
	username: string;
	password: string;
	email: string;
};

export interface IUserLogin {
	email: string;
	password: string;
}

export interface IActionResponse {
	message: string | null;
	errorMsg: string | null;
	dbErrorMsg: string | null;
	zodErrors?: {
		[key: string]: string[];
	};
	isJSON?: boolean;
}

export interface IUserFormResponse extends IActionResponse {
	data: null | string;
	isJSON: boolean;
}

export interface IStudioResponse extends IActionResponse {
	data: null | string;
}

export interface IStudio {
	_id: string;
	name: string;
	owner: string;
	projects: [];
	teams: [];
	tasks: [];
	staff: [];
}
