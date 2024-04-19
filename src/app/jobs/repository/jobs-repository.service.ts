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

@Injectable({
	providedIn: "root"
})
export class JobsRepositoryService {
	private http = inject(HttpClient);

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
