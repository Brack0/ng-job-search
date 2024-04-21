import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

import { ALL_JOBS } from '../../../mocks';
import { JobsRepositoryService } from '../repository/jobs-repository.service';
import { JobsRepositoryServiceMock } from '../repository/jobs-repository.service.mock';

import { JobListItem } from './jobs.model';
import { JobsService } from './jobs.service';

describe('JobsService', () => {
	let service: JobsService;
	let sanitizer: DomSanitizer;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: JobsRepositoryService,
					useClass: JobsRepositoryServiceMock,
				},
			],
		});

		service = TestBed.inject(JobsService);
		sanitizer = TestBed.inject(DomSanitizer);

	});

	it('should create', () => {
		expect(service).toBeTruthy();
	});

	describe('When I call getJobDetails', () => {
		beforeEach(async () => {
			spyOn(sanitizer, "bypassSecurityTrustHtml");
			await firstValueFrom(service.getJobDetails(0));
		});

		it('Then I should have a trusted description', () => {
			expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalled();
		});
	});

	describe("When I don't have fetch jobs", () => {
		it('Then I should have an empty array in jobList', () => {
			expect(service.jobList()).toEqual([]);
		});
	});

	describe('When I call fetchJobs', () => {
		beforeEach(() => {
			service.fetchJobs();
		});

		it('Then I should have all jobs in jobList', () => {
			expect(service.jobList().length).toEqual(ALL_JOBS.length);
		});

		it('Then the first job should be favorite', () => {
			expect(service.jobList()[0].isFavorite).toBeTrue();
		});

		it('Then all but the first job must not be favorite', () => {
			service.jobList().forEach((job, index) => {
				if (index > 0) {
					expect(job.isFavorite).toBeFalse();
				}
			});
		});

		it("Then the favoriteJobList should contain only the first job", () => {
			expect(service.favoriteJobList()).toEqual([service.jobList()[0]]);
		})
	});

	describe("When a job was not favorite", () => {
		let job!: JobListItem;

		beforeEach(() => {
			service.fetchJobs();
			job = service.jobList()[1];
		});

		describe("And I toggle it", () => {
			beforeEach(() => {
				service.toggleFavorite(job.id);
			});

			it("Then the job should be a favorite", () => {
				expect(service.jobList()[1].isFavorite).toBeTrue();
			});
		});
	});

	describe("When a job was a favorite", () => {
		let job!: JobListItem;

		beforeEach(() => {
			service.fetchJobs();
			job = service.jobList()[0];
		});

		describe("When I toggle it", () => {
			beforeEach(() => {
				service.toggleFavorite(job.id);
			});

			it("Then the job should no longer be a favorite", () => {
				expect(service.jobList()[1].isFavorite).toBeFalse();
			});
		});
	});
});
