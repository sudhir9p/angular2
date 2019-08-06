import { Component, OnInit } from '@angular/core';
import { ArticlesService } from './articles.service';

@Component({
    templateUrl: './articles-list.component.html'
})
export class ArticlesListComponent implements OnInit {

    articlesList: any;
    sourceType = "local";
    constructor(private articlesService: ArticlesService) {

    }
    ngOnInit(): void {
        this.loadData();
    }

    loadData(startindex = 0) {
        this.articlesService.getArticles("local", startindex).subscribe((data: any) => {
            if (this.articlesList) {
                this.articlesList.push(data);
            }
            else {
                this.articlesList = data;
            }
        });
    }
}