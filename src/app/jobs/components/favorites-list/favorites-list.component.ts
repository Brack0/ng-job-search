import { Component, inject } from '@angular/core';

import { JobsService } from '../../services/jobs.service';
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
	selector: 'app-jobs-favorites-list',
	standalone: true,
	imports: [ListItemComponent],
	template: `
		@for (job of jobService.favoriteJobList(); track job.id) {
			<app-jobs-list-item [job]="job" [hasFavoriteSelector]="false" />
		} @empty {
			<h2>No favorites selected</h2>
		}
	`,
})
export class FavoritesListComponent {
	jobService = inject(JobsService);
}
