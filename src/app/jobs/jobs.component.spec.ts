import { NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';

import { DetailsComponent } from './components/details/details.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListComponent } from './components/list/list.component';
import { JobsComponent } from './jobs.component';
import { JOBS_ROUTES } from './jobs.routes';
import { JobsRepositoryService } from './repository/jobs-repository.service';
import { JobsRepositoryServiceMock } from './repository/jobs-repository.service.mock';
import { JobsService } from './services/jobs.service';

describe('JobsComponent', () => {
	let component: JobsComponent;
	let fixture: ComponentFixture<JobsComponent>;
	let service: JobsService;
	let ngZone: NgZone;

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

		ngZone = TestBed.inject(NgZone);

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

	describe("When navigating to base route", () => {
		beforeEach(async () => {
			await ngZone.run(() => TestBed.inject(Router).navigate(['']));
			fixture.detectChanges();
		});

		it("Then should display jobs list", () => {
			expect(fixture.debugElement.query(By.directive(ListComponent))).toBeTruthy();
		});

		describe("And I add a favorite", () => {
			beforeEach(() => {
				(fixture.debugElement.query(By.css(".icon-star:not(.active)")).nativeElement as HTMLElement).click();
				fixture.detectChanges();
			});

			it("Then should have 2 favorites selected", () => {
				expect(fixture.debugElement.queryAll(By.css(".active")).length).toEqual(2);
			});

			describe("And I navigate to favorites route", () => {
				beforeEach(async () => {
					await ngZone.run(() => TestBed.inject(Router).navigate(['favorites']));
					fixture.detectChanges();
				});

				it("Then should display the 2 favorite jobs", () => {
					expect(fixture.debugElement.queryAll(By.directive(ListItemComponent)).length).toEqual(2);
				});

				describe("And I click on a job title", () => {
					beforeEach(async () => {
						(fixture.debugElement.query(By.css("a.job-title")).nativeElement as HTMLElement).click();
						await fixture.whenStable();
					});

					it("Then should display job details", () => {
						expect(fixture.debugElement.query(By.directive(DetailsComponent))).toBeTruthy();
					});
				});
			});
		});

		describe("And I click on a job title", () => {
			beforeEach(async () => {
				(fixture.debugElement.query(By.css("a.job-title")).nativeElement as HTMLElement).click();
				await fixture.whenStable();
			});

			it("Then should display job details", () => {
				expect(fixture.debugElement.query(By.directive(DetailsComponent))).toBeTruthy();
			});
		});
	});

	describe("When navigating to favorites route", () => {
		beforeEach(async () => {
			await ngZone.run(() => TestBed.inject(Router).navigate(['favorites']));
			fixture.detectChanges();
		});

		it("Then should display favorites job list", () => {
			expect(fixture.debugElement.query(By.directive(FavoritesListComponent))).toBeTruthy();
		});
	});
});
