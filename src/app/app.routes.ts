import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

export const routes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "jobs", loadChildren: () => import('./jobs/jobs.routes').then(m => m.JOBS_ROUTES) }
];
