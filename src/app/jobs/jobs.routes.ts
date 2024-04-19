import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { DetailComponent } from './components/detail/detail.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { JobsComponent } from './components/jobs.component';
import { ListComponent } from './components/list/list.component';
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
				component: DetailComponent,
				resolve: {
					jobDetail: (route: ActivatedRouteSnapshot) =>
						inject(JobsService).getJob(parseInt(route.paramMap.get('id')!, 10))
				}
			},
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
		]
	}
];
