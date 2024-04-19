import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, RouterLink],
	template: `
		<header class="sticky">
			<a class="button" routerLink="/">Home</a>
			<a class="button" routerLink="/jobs">Jobs</a>
		</header>
		<main class="container">
			<router-outlet></router-outlet>
		</main>
	`
})
export class AppComponent { }
