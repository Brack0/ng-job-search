import { Component, inject } from '@angular/core';

import { JobsService } from '../../services/jobs.service';
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
	selector: 'app-jobs-list',
	standalone: true,
	imports: [ListItemComponent],
	template: `
		@for (job of jobService.jobList(); track job.id) {
			<app-jobs-list-item [job]="job" [hasFavoriteSelector]="true" />
		}
	`
})
export class ListComponent {
	jobService = inject(JobsService);
}
