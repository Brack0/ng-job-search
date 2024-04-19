import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { JOBS_ROUTES } from '../../jobs.routes';
import { JobsRepositoryService } from '../../repository/jobs-repository.service';
import { JobsRepositoryServiceMock } from '../../repository/jobs-repository.service.mock';
import { JobsService } from '../../services/jobs.service';

import { ListItemComponent } from './list-item.component';


describe('ListItemComponent', () => {
	let component: ListItemComponent;
	let fixture: ComponentFixture<ListItemComponent>;
	let service: JobsService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ListItemComponent],
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
		service.fetchJobs();

		fixture = TestBed.createComponent(ListItemComponent);
		component = fixture.componentInstance;
		fixture.componentRef.setInput('job', service.jobList()[0]);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should hide favorite selector by default', () => {
		expect(fixture.debugElement.query(By.css(".icon-star"))).toBeNull();
	});

	describe("When hasFavoriteSelector is true", () => {
		beforeEach(() => {
			fixture.componentRef.setInput('hasFavoriteSelector', true);
			fixture.detectChanges();
		});

		it('Then should display favorite selector', () => {
			expect(fixture.debugElement.query(By.css(".icon-star"))).toBeTruthy();
		});

		it('Then should be selected as a favorite', () => {
			expect(fixture.debugElement.query(By.css(".active"))).toBeTruthy();
		});

		describe("And I click to the favorite selector", () => {
			beforeEach(() => {
				(fixture.debugElement.query(By.css(".icon-star")).nativeElement as HTMLSpanElement).click();
				fixture.detectChanges();
			});


			it('Then it should be not selected as a favorite', () => {
				expect(fixture.debugElement.query(By.css(".active"))).toBeFalsy();
			});
		})
	})

});
