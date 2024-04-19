import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { JobListItem } from '../../services/jobs.model';
import { JobsService } from '../../services/jobs.service';

@Component({
	selector: 'app-jobs-list-item',
	standalone: true,
	imports: [RouterLink],
	template: `
		<div class="row">
			<div class="col-sm-1">
				<img [src]="job().companyLogo" [alt]="" class="responsive-margin"/>
			</div> 
			<div class="col-sm-10">
				<div>
					<h2><a [routerLink]="['..', job().id]">{{ job().title }}</a></h2>
				</div>
				<div>
					<span class="responsive-margin">Company: {{ job().companyName }}</span>
					<span class="responsive-margin">Reference: {{ job().reference }}</span>
				</div>
			</div>
			@if (hasFavoriteSelector()) {
				<div class="col-sm-1">
					<span 
						class="icon-star"
						[class.active]="job().isFavorite"
						id="star-{{ job().id }}"
						tabindex="0"
						(click)="toggleFavorite()"
						(keyup)="toggleFavorite()"></span>
				</div>
			}
		</div>
	`,
	styles: `	
		.row {
			display: flex;
			align-items: center;
		}
		.active {
			background-color: yellow;
		}
	`
})
export class ListItemComponent {
	jobService = inject(JobsService);

	job = input.required<JobListItem>();
	hasFavoriteSelector = input<boolean>(false);

	toggleFavorite() {
		this.jobService.toggleFavorite(this.job().id)
	}
}
