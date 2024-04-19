import { Injectable, computed, effect, inject, signal } from "@angular/core";
import { Observable, map } from "rxjs";

import { Job, JobsRepositoryService } from "../repository/jobs-repository.service";

import { DomSanitizer } from "@angular/platform-browser";
import { JobDetail, JobListItem } from "./jobs.model";

@Injectable({
	providedIn: "root"
})
export class JobsService {
	private repository = inject(JobsRepositoryService);
	private sanitizer = inject(DomSanitizer);

	jobList = signal<JobListItem[]>([]);
	favoriteJobList = computed(() =>
		this.jobList().filter(job => job.isFavorite));

	constructor() {
		effect(() => {
			// Prevent effect on initial signal value
			if (this.jobList().length > 0) {
				const favoriteJobIds = this.jobList()
					.filter(job => job.isFavorite)
					.map(job => job.id);

				this.repository.saveFavorites(favoriteJobIds);
			}
		});
	}

	getJob(jobId: number): Observable<JobDetail> {
		return this.repository.getJob(jobId).pipe(
			map(job => ({
				...job,
				// We trust HTML from repository
				description: this.sanitizer.bypassSecurityTrustHtml(job.description)
			}))
		);
	}

	fetchJobs() {
		const favoriteJobIds = this.repository.getFavorites();

		this.repository.getJobs()
			.pipe(
				map(jobs => jobs.map(job => intoJobListItem(job, favoriteJobIds)))
			)
			.subscribe(jobs => this.jobList.set(jobs));
	}

	toggleFavorite(jobId: number) {
		this.jobList.update(
			jobList => jobList.map(
				job => {
					if (job.id === jobId) {
						job.isFavorite = !job.isFavorite;
					}
					return job;
				}
			)
		);
	}
}

function intoJobListItem(job: Job, favoriteJobIds: number[]): JobListItem {
	return { ...job, isFavorite: favoriteJobIds.includes(job.id) };
}
