import { Component, OnInit, inject } from '@angular/core';

import { JobsService } from './jobs.service';

@Component({
	selector: 'app-jobs',
	standalone: true,
	template: `
		@for (jobListitem of jobService.readOnlyListItems(); track jobListitem.id) {
			<div class="row">
				<div class="col-sm-1">
					<img [src]="jobListitem.companyLogo" [alt]="" class="responsive-margin"/>
				</div> 
				<div class="col-sm-10">
					<div>
						<h2>{{ jobListitem.title }}</h2>
					</div>
					<div>
						<span class="responsive-margin">Company: {{ jobListitem.companyName }}</span>
						<span  class="responsive-margin">Reference: {{ jobListitem.reference }}</span>
					</div>
				</div>
				<div class="col-sm-1">
					<span class="icon-star" id="star-{{ jobListitem.id }}"></span>
				</div>
			</div>
		}
  `,
	styles: `
		.row {
			display: flex;
			align-items: center;
		}
	`
})
export default class JobsComponent implements OnInit {
	jobService = inject(JobsService);

	ngOnInit(): void {
		this.jobService.fetchListItems();
	}
}
