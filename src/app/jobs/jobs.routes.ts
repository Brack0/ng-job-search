import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { DetailsComponent } from './components/details/details.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { ListComponent } from './components/list/list.component';
import { JobsComponent } from './jobs.component';
import { JobsService } from './services/jobs.service';

export const JOBS_ROUTES: Routes = [
	{
		path: "",
		component: JobsComponent,
		children: [
			{ path: "list", component: ListComponent },
			{ path: "favorites", component: FavoritesListComponent },
			{
				path: ":id",
				component: DetailsComponent,
				resolve: {
					jobDetails: (route: ActivatedRouteSnapshot) =>
						inject(JobsService).getJobDetails(parseInt(route.paramMap.get('id')!, 10))
				},
			},
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
		]
	}
];
