import { Injectable, inject, signal } from "@angular/core";

import { JobsRepositoryService } from "./jobs-repository.service";
import { JobListItem } from "./jobs.model";

@Injectable({
	providedIn: "root"
})
export class JobsService {
	private repository = inject(JobsRepositoryService);
	private listItems = signal<JobListItem[]>([]);
	
	readOnlyListItems = this.listItems.asReadonly();

	fetchListItems() {
		this.repository.getListItems().subscribe(listItems => 
      this.listItems.set(listItems));
	}
}
