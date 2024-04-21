import { Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';

import { JobDetails } from '../../services/jobs.model';

@Component({
	selector: 'app-jobs-detail',
	standalone: true,
	imports: [NgOptimizedImage],
	template: `
		<button (click)="location.back()">Back</button>
		<div class="row">
			<div class="col-sm-2 col-lg-1">
				<img
					[ngSrc]="jobDetails().companyLogo"
					alt=""
					class="responsive-margin"
					width="200"
					height="200" />
			</div> 
			<div class="col-sm-10">
				<div class="hero">{{ jobDetails().companyName }} - {{ jobDetails().title }}</div>
				<div>
					@for (type of jobDetails().types; track type) {
						<span class="button">{{ type }}</span>
					}
					@for (industry of jobDetails().industries; track industry) {
						<!-- Use innerHTML to handle "&amp;" in mocks -->
						<span class="button" [innerHTML]="industry"></span>
					}
				</div>
			</div>
		</div>
		<div><strong>Publish date:</strong> {{ jobDetails().publishDate }}</div>
		<div><strong>Location:</strong> {{ jobDetails().location }}</div>
		<div><strong>Reference:</strong> {{ jobDetails().reference }}</div>
		<div><strong>Description:</strong></div>
		<div [innerHTML]="jobDetails().description"></div>
	`,
	styles: `
		.hero {
			font-size: 3em;
		}
	`
})
export class DetailsComponent {
	location = inject(Location);

	jobDetails = input.required<JobDetails>();
}
