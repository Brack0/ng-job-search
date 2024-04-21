import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { JobListItem } from '../../services/jobs.model';

@Component({
	selector: 'app-jobs-list-item',
	standalone: true,
	imports: [NgOptimizedImage, RouterLink],
	template: `
		<div class="row">
			<div class="col-sm-1">
				<img
					[ngSrc]="job().companyLogo"
					alt=""
					class="responsive-margin"
					width="200"
					height="200"/>
			</div> 
			<div class="col-sm-10">
				<div>
					<h2><a [routerLink]="['..', job().id]" class="job-title">{{ job().title }}</a></h2>
				</div>
				<div>
					<span class="responsive-margin">Company: {{ job().companyName }}</span>
					<span class="responsive-margin">Reference: {{ job().reference }}</span>
				</div>
			</div>
			@if (hasFavoriteSelector()) {
				<div class="col-sm-1">
					<span
						[class.active]="job().isFavorite"
						class="icon-star"
						id="star-{{ job().id }}"
						tabindex="0"
						(click)="toggleFavorite.emit()"
						(keyup)="toggleFavorite.emit()"></span>
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
	job = input.required<JobListItem>();
	hasFavoriteSelector = input<boolean>(false);

	@Output()
	toggleFavorite = new EventEmitter<void>();
}
