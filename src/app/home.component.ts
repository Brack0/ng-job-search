import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
	template: `
		<h1>Hello, {{title}}</h1>
	`
})
export class HomeComponent {
  title = 'ng-job-search';
}
