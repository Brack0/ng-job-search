import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { JobListItem } from "./jobs.model";

@Injectable({
	providedIn: "root"
})
export class JobsRepositoryService {
	private http = inject(HttpClient);

	getListItems(): Observable<JobListItem[]> {
		return this.http.get<JobListItem[]>("/jobs");
	}
}
