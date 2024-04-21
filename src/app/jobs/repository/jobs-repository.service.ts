import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { Job, JobInfo, JobsRepository } from "./jobs-repository.model";

@Injectable({
	providedIn: "root"
})
export class JobsRepositoryService implements JobsRepository {
	private http = inject(HttpClient);

	getJobDetails(jobId: number): Observable<JobInfo> {
		return this.http.get<JobInfo>(`/jobs/${jobId}`);
	}

	getJobs(): Observable<Job[]> {
		return this.http.get<Job[]>("/jobs");
	}

	getFavorites(): number[] {
		return JSON.parse(localStorage.getItem('favorites') ?? "[]");
	}

	saveFavorites(favoriteJobIds: number[]): void {
		localStorage.setItem('favorites', JSON.stringify(favoriteJobIds));
	}
}
