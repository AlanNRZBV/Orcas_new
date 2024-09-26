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
}

export interface IStudioResponse extends IActionResponse {
	data: string;
}

export interface IStaffResponse extends IActionResponse {}

export interface IStudio {
	_id: string;
	name: string;
	owner: {
		username: string;
		firstName: string;
		lastName: string;
		middleName: string;
	};
	projects: [];
	teams: [];
	tasks: [];
	staff: IStaffUnitPopulated[];
}

export interface IStaffUnitPopulated {
	userId: {
		email: string;
		username: string;
	};
	spec: {
		name: string;
		rank: string;
	};
	_id: string;
}
