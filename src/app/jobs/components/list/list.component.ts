import { Component, inject } from '@angular/core';

import { JobListItem } from '../../services/jobs.model';
import { JobsService } from '../../services/jobs.service';
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
	selector: 'app-jobs-list',
	standalone: true,
	imports: [ListItemComponent],
	template: `
		@for (job of jobService.jobList(); track job.id) {
			<app-jobs-list-item 
				[job]="job"
				[hasFavoriteSelector]="true"
				(toggleFavorite)="toggleFavorite(job)" />
		}
	`
})
export class ListComponent {
	jobService = inject(JobsService);

	toggleFavorite(job: JobListItem) {
		this.jobService.toggleFavorite(job.id);
	}
}
