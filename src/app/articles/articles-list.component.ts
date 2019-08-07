import { Component, OnInit } from '@angular/core';
import { ArticlesService } from './articles.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './articles-list.component.html'
})
export class ArticlesListComponent implements OnInit {

    articlesList: any;
    filterText: string = "";
    sourceType = "Local";
    isLoadMore: boolean = true;
    pageIndex: number = 0;
    constructor(private articlesService: ArticlesService, private router: Router) {

    }
    ngOnInit(): void {
        this.articlesService.sourceType = this.sourceType;
        this.articlesService.currentArticle = {};
        this.loadData();
    }

    loadData() {
        debugger;
        if (this.articlesService.totalArticles.length > 0) {
            this.articlesList = this.articlesService.totalArticles;
        }
        else {
            this.articlesService.getArticles(this.sourceType, this.pageIndex).subscribe((data: any) => {
                console.log(data);
                this.isLoadMore = data.length < 5 ? false : true;
                debugger;
                if (this.articlesList) {
                    this.articlesList = [...this.articlesList, ...data];
                }
                else {
                    this.articlesList = data;
                }
            });
        }
    }

    onLoadMore() {
        this.pageIndex += 5;
        this.loadData();
    }

    onSourceChange(event) {
        this.articlesService.sourceType = this.sourceType;
        this.articlesList = [];
        this.loadData();
    }

    onReadMore(article) {
        this.articlesService.currentArticle = article;
        this.router.navigate(['/article-view']);
    }

    filterArticles(e) {
        if (this.filterText)
            this.articlesList = this.articlesList.filter(value => value.title.includes(this.filterText));
        else
            this.loadData();
    }

    onAddArticle(e) {
        this.router.navigate(['/article/edit']);
    }
}