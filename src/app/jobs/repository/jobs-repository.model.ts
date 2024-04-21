import { Observable } from "rxjs";

export interface Job {
	id: number;
	companyName: string;
	title: string;
	companyLogo: string;
	reference: string;
}

type UnsafeHTML = string;

export interface JobInfo {
	id: number;
	companyName: string;
	title: string;
	companyLogo: string;
	reference: string;
	location: string;
	industries: string[],
	types: string[],
	description: UnsafeHTML,
	publishDate: string,
}

export interface JobsRepository {
	getJobDetails(jobId: number): Observable<JobInfo>;
	getJobs(): Observable<Job[]>;
	getFavorites(): number[];
	saveFavorites(favoriteJobIds: number[]): void;
}
