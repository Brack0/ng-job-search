import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { ALL_JOBS } from '../../../../mocks';
import { JOBS_ROUTES } from '../../jobs.routes';
import { JobsRepositoryService } from '../../repository/jobs-repository.service';
import { JobsRepositoryServiceMock } from '../../repository/jobs-repository.service.mock';
import { JobsService } from '../../services/jobs.service';
import { ListItemComponent } from '../list-item/list-item.component';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
	let component: ListComponent;
	let fixture: ComponentFixture<ListComponent>;
	let service: JobsService;
	let firstItemStar: HTMLElement;
	let secondItemStar: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ListComponent, ListItemComponent],
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

		fixture = TestBed.createComponent(ListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		firstItemStar = fixture.debugElement.query(By.css(`#star-${service.jobList()[0].id}`)).nativeElement;
		secondItemStar = fixture.debugElement.query(By.css(`#star-${service.jobList()[1].id}`)).nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it("should have all jobs displayed", () => {
		const allRows = fixture.debugElement.queryAll(By.directive(ListItemComponent));
		expect(allRows.length).toEqual(ALL_JOBS.length);
	});

	it("should display first item as favorite", () => {
		expect(firstItemStar.classList.contains('active')).toBeTrue();
	});

	it("should not display second item as favorite", () => {
		expect(secondItemStar.classList.contains('active')).toBeFalse();
	});

	describe("When I click on the favorite selector of the first item", () => {
		beforeEach(() => {
			firstItemStar.click();
			fixture.detectChanges();
		});

		it('Then it should not be selected as a favorite', () => {
			expect(firstItemStar.classList.contains('active')).toBeFalse();
		});
	});

	describe("When I click on the favorite selector of the second item", () => {
		beforeEach(() => {
			secondItemStar.click();
			fixture.detectChanges();
		});

		it('Then it should be selected as a favorite', () => {
			expect(secondItemStar.classList.contains('active')).toBeTrue();
		});
	});
});
