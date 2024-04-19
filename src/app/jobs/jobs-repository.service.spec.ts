import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ALL_JOBS } from '../../mocks';

import { JobsRepositoryService } from './jobs-repository.service';

describe('JobsRepositoryService', () => {
	let service: JobsRepositoryService;
	let httpClient: HttpClient;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(),
			]
		})

		service = TestBed.inject(JobsRepositoryService);
		httpClient = TestBed.inject(HttpClient);

		spyOn(httpClient, "get").and.returnValue(of(ALL_JOBS));
	});

	it('should create', () => {
		expect(service).toBeTruthy();
	});

	describe("When I call getListItems", () => {
		beforeEach(() => {
			service.getListItems().subscribe();
		})

		it("Then I should perform GET on /jobs", () => {
			expect(httpClient.get).toHaveBeenCalled();
		})
	})
});
