import { Routes } from '@angular/router';

import { JobsComponent } from './components/jobs.component';
import { ListComponent } from './components/list/list.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';

export const JOBS_ROUTES: Routes = [
	{
		path: "",
		component: JobsComponent,
		children: [
			{ path: "list", component: ListComponent },
			{ path: "favorites", component: FavoritesListComponent },
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
		]
	}
];
