export interface Account {
	id?: string;
	email: string;
	nim: number;
	course: Course[];
}

export interface Course {
	id?: string;
	code: string;
	jadwal: number;
	laporan: LaporanIf[];
	modul: ModulIf[];
	tp: TpIf[];
}

export interface LaporanIf {
	deadline: number;
	file: string;
	judul: string;
	nilai: number;
}

export interface ModulIf {
	file: string;
	judul: string;
}

export interface TpIf {
	deadline: number;
	file: string;
	judul: string;
}