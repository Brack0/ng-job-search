import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ALL_JOBS } from '../../../mocks';

import { JobsRepositoryService } from './jobs-repository.service';

describe('JobsRepositoryService', () => {
	let service: JobsRepositoryService;
	let httpClient: HttpClient;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient()],
		});

		service = TestBed.inject(JobsRepositoryService);
		httpClient = TestBed.inject(HttpClient);

		spyOn(httpClient, 'get').and.returnValue(of(ALL_JOBS));
	});

	it('should create', () => {
		expect(service).toBeTruthy();
	});

	describe('When I call getJobDetails', () => {
		beforeEach(() => {
			service.getJobDetails(0).subscribe();
		});

		it('Then I should perform GET on /jobs/:jobId', () => {
			expect(httpClient.get).toHaveBeenCalledWith("/jobs/0");
		});
	});

	describe('When I call getJobs', () => {
		beforeEach(() => {
			service.getJobs().subscribe();
		});

		it('Then I should perform GET on /jobs', () => {
			expect(httpClient.get).toHaveBeenCalledWith("/jobs");
		});
	});

	describe('When I call saveFavorites', () => {
		beforeEach(() => {
			spyOn(localStorage, 'setItem');
			service.saveFavorites([123]);
		});

		it('Then I should save favorites in localstorage', () => {
			expect(localStorage.setItem).toHaveBeenCalledWith('favorites', '[123]');
		});
	});

	describe('When there are favorites in localstorage', () => {
		beforeEach(() => {
			spyOn(localStorage, 'getItem').and.returnValue('[123]');
		});

		describe('And I call getFavorites', () => {
			let favorites: number[] = [];

			beforeEach(() => {
				favorites = service.getFavorites();
			});

			it('Then I should retrieve favorites', () => {
				expect(favorites).toEqual([123]);
			});
		});
	});

	describe('When there are no favorites in localstorage', () => {
		beforeEach(() => {
			spyOn(localStorage, 'getItem').and.returnValue(null);
		});

		describe('And I call getFavorites', () => {
			let favorites: number[] = [];

			beforeEach(() => {
				favorites = service.getFavorites();
			});

			it('Then I should get an empty array', () => {
				expect(favorites).toEqual([]);
			});
		});
	});
});
