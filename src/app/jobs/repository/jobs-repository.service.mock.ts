import { of } from "rxjs";

import { ALL_JOBS } from "../../../mocks";

export class JobsRepositoryServiceMock {
	getJob() {
		return of(ALL_JOBS[0]);
	}

	getJobs() {
		return of(ALL_JOBS);
	}

	getFavorites() {
		return [ALL_JOBS[0].id];
	}

	saveFavorites() { }
}
