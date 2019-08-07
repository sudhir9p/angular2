import { Component, OnInit } from '@angular/core';
import { ArticlesService } from './articles.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './articles-details-view.component.html'
})
export class ArticleDetailsViewComponent implements OnInit {

    article: {};
    constructor(private articleService: ArticlesService, private router: Router) {
        this.article = this.articleService.currentArticle;
    }

    ngOnInit(): void {

    }

    onEditDelete(articleId, type) {
        if (type == 'Edit') {
            //this.router.navigate([`/article/${articleId}`]);
            this.router.navigate([`/article/edit`]);
        }
        else {

        }
    }
}