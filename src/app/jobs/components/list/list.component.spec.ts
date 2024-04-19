import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ALL_JOBS } from '../../../../mocks';
import { JobsRepositoryService } from '../../repository/jobs-repository.service';
import { JobsRepositoryServiceMock } from '../../repository/jobs-repository.service.mock';
import { JobsService } from '../../services/jobs.service';
import { ListItemComponent } from '../list-item/list-item.component';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
	let component: ListComponent;
	let fixture: ComponentFixture<ListComponent>;
	let service: JobsService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ListComponent, ListItemComponent],
			providers: [
				{
					provide: JobsRepositoryService,
					useClass: JobsRepositoryServiceMock
				},
			]
		})
			.compileComponents();

		service = TestBed.inject(JobsService);
		service.fetchJobs();

		fixture = TestBed.createComponent(ListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it("should have all jobs displayed", () => {
		const allRows = fixture.debugElement.queryAll(By.directive(ListItemComponent));
		expect(allRows.length).toEqual(ALL_JOBS.length);
	});
});
