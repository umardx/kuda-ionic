export interface Account {

	course: string[];
	email: string;
	nim: number;

}

export interface Moduls {

	code: string;
	endTime: Date;
	file: string;
	index: number;
	startTime: Date;
	title: string;

}

export interface Tps {

	code: string;
	endTime: Date;
	file: string;
	index: number;
	title: string;

}

export interface Uploads {

	code: string;
	file: string;
	index: number;
	mark: number;
	nim: number;
	
}