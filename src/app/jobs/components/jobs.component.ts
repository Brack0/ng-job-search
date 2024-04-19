import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { JobsService } from '../services/jobs.service';

@Component({
	selector: 'app-jobs',
	standalone: true,
	imports: [RouterOutlet, RouterLink, RouterLinkActive],
	template: `
		<h1 class="center">Find your job</h1>
		<div class="row">
			<div class="col-sm-6"><a class="tab-link" routerLink="./list" routerLinkActive="tab-active">Jobs</a></div>
			<div class="col-sm-6"><a class="tab-link" routerLink="./favorites" routerLinkActive="tab-active">Favorites</a></div>
		</div>
		<router-outlet></router-outlet>		
  `,
	styles: `
		.tab-link {
			display: block;
			padding: 1em;
			text-align: center;
			text-decoration: none;
			cursor: pointer;
			border: .0625rem solid var(--button-fore-color);
		}

		.tab-link:hover {
			background: var(--button-hover-back-color);
		}

		.tab-link.tab-active {
			color: var(--button-back-color);
			background-color: var(--button-fore-color);
		}
	`
})
export class JobsComponent implements OnInit {
	jobService = inject(JobsService);

	ngOnInit(): void {
		this.jobService.fetchJobs();
	}
}
