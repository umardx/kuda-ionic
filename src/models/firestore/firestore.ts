export interface Account {

	course: string[];
	email: string;
	nim: number;

}

export interface Moduls {

	code: string;
	endTime: string;
	file: string;
	index: number;
	startTime: string;
	title: string;

}

export interface Tps {

	code: string;
	endTime: string;
	file: string;
	index: number;
	title: string;

}

export interface Uploads {

	code: string;
	createdAt: string;
	file: string;
	index: number;
	mark: number;
	nim: number;
	title: string;
	
}