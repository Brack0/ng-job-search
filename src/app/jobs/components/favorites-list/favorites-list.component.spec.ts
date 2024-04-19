import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { JobsRepositoryService } from '../../repository/jobs-repository.service';
import { JobsRepositoryServiceMock } from '../../repository/jobs-repository.service.mock';
import { JobsService } from '../../services/jobs.service';
import { ListItemComponent } from '../list-item/list-item.component';

import { FavoritesListComponent } from './favorites-list.component';

describe('FavoritesListComponent', () => {
	let component: FavoritesListComponent;
	let fixture: ComponentFixture<FavoritesListComponent>;
	let service: JobsService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FavoritesListComponent, ListItemComponent],
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

		fixture = TestBed.createComponent(FavoritesListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it("should have 1 job displayed", () => {
		const allRows = fixture.debugElement.queryAll(By.directive(ListItemComponent));
		expect(allRows.length).toEqual(1);
	});
});
