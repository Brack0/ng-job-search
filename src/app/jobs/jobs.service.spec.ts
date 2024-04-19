import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ALL_JOBS } from '../../mocks';

import { JobsRepositoryService } from './jobs-repository.service';
import { JobsService } from './jobs.service';

describe('JobsService', () => {
	let service: JobsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: JobsRepositoryService,
					useValue: { getListItems: () => of(ALL_JOBS) }
				}
			]
		})

		service = TestBed.inject(JobsService);
	});

	it('should create', () => {
		expect(service).toBeTruthy();
	});

	describe("When I don't have fetch list items", () => {
		it("Then I should have an empty array in readOnlyListItems", () => {
			expect(service.readOnlyListItems()).toEqual([]);
		})
	})

	describe("When I call fetchListItems", () => {
		beforeEach(() => {
			service.fetchListItems();
		})

		it("Then I should have jobs in readOnlyListItems", () => {
			expect(service.readOnlyListItems()).toEqual(ALL_JOBS);
		})
	})
});
