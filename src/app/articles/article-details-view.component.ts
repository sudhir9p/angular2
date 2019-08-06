import { Component, OnInit } from '@angular/core';
import { ArticlesService } from './articles.service';

@Component({
    templateUrl: './articles-details-view.component.html'
})
export class ArticleDetailsViewComponent implements OnInit {

    article: {};
    constructor(private _articleService: ArticlesService) {
        this.article = this._articleService.currentArticle;
    }

    ngOnInit(): void {

    }
}