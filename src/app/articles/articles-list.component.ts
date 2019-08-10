import { Component, OnInit } from '@angular/core';
import { ArticlesService } from './articles.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './articles-list.component.html'
})
export class ArticlesListComponent implements OnInit {

    articlesList: any;
    filterText: string = "";
    sourceType = "Local";
    isLoadMore: boolean = true;
    pageIndex: number = 0;
    constructor(private articlesService: ArticlesService, private router: Router,
        private toastr: ToastrService) {

    }
    ngOnInit(): void {
        this.articlesService.sourceType = this.sourceType;
        this.articlesService.currentArticle = {};
        this.loadData();
    }

    loadData(loadMore = false) {
        debugger;
        if (this.articlesService.totalArticles.length > 0 && !loadMore) {
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
        this.loadData(true);
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

    onEditDelete(id, type) {
        const index = this.articlesService.totalArticles.findIndex(article => id == article.id);
        if (type == "Delete") {
            if (index !== -1) {
                this.articlesService.totalArticles.splice(index, 1);
                this.loadData();
                this.toastr.success("Article Deleted Successfully.");
            }
            else {
                this.toastr.error("Unable to delete article.");
            }
        }
        else {
            this.articlesService.currentArticle = this.articlesService.totalArticles[index];
            this.router.navigate(['/article/edit']);
        }
    }
}