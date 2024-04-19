import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ALL_JOBS } from '../../mocks';

import { JobsRepositoryService } from './jobs-repository.service';
import JobsComponent from './jobs.component';
import { JobsService } from './jobs.service';

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
					useValue: { getListItems: () => of(ALL_JOBS) }
				}
			]
		})
			.compileComponents();

		service = TestBed.inject(JobsService);
		spyOn(service, "fetchListItems").and.callThrough();

		fixture = TestBed.createComponent(JobsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it("should fetch list items on init", () => {
		expect(service.fetchListItems).toHaveBeenCalled();
	});

	it("should have all jobs displayed", () => {
		const allRows = fixture.debugElement.queryAll(By.css(".row"));
		expect(allRows.length).toEqual(ALL_JOBS.length);
	})
});
