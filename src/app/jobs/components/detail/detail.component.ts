import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';

import { JobDetail } from '../../services/jobs.model';

@Component({
	selector: 'app-jobs-detail',
	standalone: true,
	template: `
		<button (click)="location.back()">Back</button>
		<div class="row">
			<div class="col-sm-2 col-lg-1">
				<img [src]="jobDetail().companyLogo" [alt]="" class="responsive-margin"/>
			</div> 
			<div class="col-sm-10">
				<div class="hero">{{ jobDetail().companyName }} - {{ jobDetail().title }}</div>
				<div>
					@for (type of jobDetail().types; track type) {
						<span class="button">{{ type }}</span>
					}
					@for (industry of jobDetail().industries; track industry) {
						<span class="button">{{ industry }}</span>
					}
				</div>
			</div>
		</div>
		<div><strong>Publish date:</strong> {{ jobDetail().publishDate }}</div>
		<div><strong>Location:</strong> {{ jobDetail().location }}</div>
		<div><strong>Reference:</strong> {{ jobDetail().reference }}</div>
		<div><strong>Description:</strong></div>
		<div [innerHTML]="jobDetail().description"></div>
	`,
	styles: `
	.hero {
		font-size: 3em;
	}
	`
})
export class DetailComponent {
	location = inject(Location);

	jobDetail = input.required<JobDetail>();
}
