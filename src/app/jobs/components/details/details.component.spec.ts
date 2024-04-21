import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { JOBS_ROUTES } from '../../jobs.routes';
import { JobsRepositoryService } from '../../repository/jobs-repository.service';
import { JobsRepositoryServiceMock } from '../../repository/jobs-repository.service.mock';
import { JobsService } from '../../services/jobs.service';

import { DetailsComponent } from './details.component';


describe('DetailsComponent', () => {
	let component: DetailsComponent;
	let fixture: ComponentFixture<DetailsComponent>;
	let service: JobsService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DetailsComponent],
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

		fixture = TestBed.createComponent(DetailsComponent);
		component = fixture.componentInstance;
		fixture.componentRef.setInput('jobDetails', await firstValueFrom(service.getJobDetails(0)));
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
