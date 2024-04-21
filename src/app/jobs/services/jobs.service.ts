import { Injectable, computed, inject, signal } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable, map } from "rxjs";

import { Job } from "../repository/jobs-repository.model";
import { JobsRepositoryService } from "../repository/jobs-repository.service";

import { JobDetails, JobListItem } from "./jobs.model";

/**
 * Main jobs service
 * 
 * Handle business logic for jobs. It goes as follow :
 * 
 * - Public properties are signals that will received updates based on actions
 * (ie. public methods in this service).
 * - Public methods are simple (business oriented) actions that can be call by
 * components.
 */
@Injectable({
	providedIn: "root"
})
export class JobsService {
	private repository = inject(JobsRepositoryService);
	private sanitizer = inject(DomSanitizer);

	/**
	 * Signal that holds the list of jobs.
	 * 
	 * It is updated whenever {@link fetchJobs} is called.
	 */
	jobList = signal<JobListItem[]>([]);
	/**
	 * Signal that holds the list of jobs marked as favorites.
	 *
	 * It is updated whenever {@link fetchJobs} or {@link toggleFavorite} are called.
	 */
	favoriteJobList = computed(() => this.jobList().filter(job => job.isFavorite));

	/**
	 * Returns a job details by its id.
	 *
	 * @param jobId - The id of the job to retrieve.
	 * @returns An observable that emits the job detail when available.
	 */
	getJobDetails(jobId: number): Observable<JobDetails> {
		return this.repository.getJobDetails(jobId).pipe(
			map(job => ({
				...job,
				// We trust HTML from repository
				description: this.sanitizer.bypassSecurityTrustHtml(job.description),
			}))
		);
	}

	/**
	 * Fetches the list of jobs from the repository.
	 *
	 * @returns Nothing. This method is a side-effect function that updates
	 * {@link jobList} and {@link favoriteJobList} signal.
	 */
	fetchJobs(): void {
		const favoriteJobIds = this.repository.getFavorites();

		this.repository.getJobs()
			.pipe(
				map(jobs => jobs.map(job => intoJobListItem(job, favoriteJobIds)))
			)
			.subscribe(jobs => this.jobList.set(jobs));
	}

	/**
	 * Toggles the favorite status of a job.
	 *
	 * @param jobId - The id of the job to toggle its favorite status.
	 * @returns Nothing. This method is a side-effect function that updates
	 * {@link jobList} and {@link favoriteJobList} signal.
	 */
	toggleFavorite(jobId: number): void {
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

		this.saveFavorites();
	}

	private saveFavorites(): void {
		const favoriteJobIds = this.favoriteJobList()
			.map(job => job.id);

		this.repository.saveFavorites(favoriteJobIds);
	}
}

function intoJobListItem(job: Job, favoriteJobIds: number[]): JobListItem {
	return { ...job, isFavorite: favoriteJobIds.includes(job.id) };
}
