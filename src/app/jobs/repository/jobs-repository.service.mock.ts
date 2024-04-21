import { Observable, of } from "rxjs";

import { ALL_JOBS, DETAILED } from "../../../mocks";

import { Job, JobInfo, JobsRepository } from "./jobs-repository.model";

export class JobsRepositoryServiceMock implements JobsRepository {
	getJobDetails(): Observable<JobInfo> {
		return of(DETAILED['98596']);
	}

	getJobs(): Observable<Job[]> {
		return of(ALL_JOBS);
	}

	getFavorites(): number[] {
		return [ALL_JOBS[0].id];
	}

	saveFavorites(): void { }
}
