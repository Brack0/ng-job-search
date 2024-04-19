import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { JOBS_ROUTES } from '../jobs.routes';
import { JobsRepositoryService } from '../repository/jobs-repository.service';
import { JobsRepositoryServiceMock } from '../repository/jobs-repository.service.mock';
import { JobsService } from '../services/jobs.service';

import { JobsComponent } from './jobs.component';

describe('JobsComponent', () => {
	let component: JobsComponent;
	let fixture: ComponentFixture<JobsComponent>;
	let service: JobsService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [JobsComponent],
			providers: [
				{
					provide: JobsRepositoryService,
					useClass: JobsRepositoryServiceMock
				},
				provideRouter(JOBS_ROUTES),
			]
		})
			.compileComponents();

		service = TestBed.inject(JobsService);
		spyOn(service, "fetchJobs").and.callThrough();

		fixture = TestBed.createComponent(JobsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it("should fetch list items on init", () => {
		expect(service.fetchJobs).toHaveBeenCalled();
	});
});
