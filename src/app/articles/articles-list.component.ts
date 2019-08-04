import { Component, OnInit } from '@angular/core';
import { ArticlesService } from './articles.service';

@Component({
    templateUrl: './articles-list.component.html'
})
export class ArticlesListComponent implements OnInit {

    articlesList: [];
    constructor(private articlesService: ArticlesService) {

    }
    ngOnInit(): void {
        // this.articlesService.getArticles("local").subscribe(data => {
        //     this.articlesList = data['local'];
        // });
        this.articlesList = this.articlesService.getArticles("local");
        console.log(this.articlesList);
    }
}