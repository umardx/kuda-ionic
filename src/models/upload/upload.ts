export interface Upload {

	$key: string;
	file: File;
	name: string;
	url: string;
	progress: number;
	createAt: Date;

}