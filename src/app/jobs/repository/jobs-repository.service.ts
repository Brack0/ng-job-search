import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
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


@Injectable({
	providedIn: "root"
})
export class JobsRepositoryService {
	private http = inject(HttpClient);

	getJob(jobId: number) {
		return this.http.get<JobInfo>(`/jobs/${jobId}`);
	}

	getJobs(): Observable<Job[]> {
		return this.http.get<Job[]>("/jobs");
	}

	getFavorites(): number[] {
		return JSON.parse(localStorage.getItem('favorites') ?? "[]");
	}

	saveFavorites(favoriteJobIds: number[]) {
		localStorage.setItem('favorites', JSON.stringify(favoriteJobIds));
	}
}
