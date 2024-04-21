import { SafeHtml } from "@angular/platform-browser";

export interface JobListItem {
	id: number;
	companyName: string;
	title: string;
	companyLogo: string;
	reference: string;
	isFavorite: boolean;
}

export interface JobDetails {
	id: number;
	companyName: string;
	title: string;
	companyLogo: string;
	reference: string;
	location: string;
	industries: string[],
	types: string[],
	description: SafeHtml,
	publishDate: string,
}
