import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../service/articles.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { commonService } from '../../shared/common.service';

@Component({
    templateUrl: '../html/articles-list.component.html'
})
export class ArticlesListComponent implements OnInit {

    articlesList: any;
    filterText: string = "";
    sourceType = '';
    sourcesList: any[] = [];
    isLoadMore: boolean = true;
    pageIndex: number = 1;

    constructor(private commonService: commonService, private articlesService: ArticlesService, private router: Router,
        private toastr: ToastrService) {

    }
    ngOnInit(): void {
        if (!this.commonService.configData || !this.commonService.configData['apiUrl']) {
            this.commonService.getConfigData().subscribe(data => {
                this.commonService.configData = data;
                this.articlesService.sourceType = this.sourceType;
                this.articlesService.currentArticle = {};
                this.loadSources();
            });
        }

        this.loadSources();
    }

    loadData(loadMore = false) {
        this.articlesService.getArticles(this.sourceType, this.pageIndex).subscribe((data: any) => {
            this.isLoadMore = data.length < 5 ? false : true;
            if (this.articlesList) {
                /* Not mutating data for change detection to work */
                this.articlesList = [...this.articlesList, ...data];
            }
            else {
                this.articlesList = data;
            }
        });
    }

    onLoadMore() {
        this.pageIndex += this.sourceType.includes('local') ? 5 : 1;
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
        this.articlesService.currentArticle = {};
        this.router.navigate(['/article/edit']);
    }

    onEditDelete({id, type}) {
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

    loadSources() {
        this.articlesService.getSources().subscribe(res => {
            const sources = [];
            res[1]['Local'].forEach((item) => {
                sources.push({ id: item.source.id, name: item.source.name, type: 'Local' });
            });
            res[0]['sources'].forEach(item => {
                sources.push({ id: item.id, name: item.name, type: 'Web' });
            });
            this.sourcesList = sources;
            this.sourceType = this.articlesService.sourceType ? this.articlesService.sourceType : this.sourcesList[0].id;
            this.loadData();
        })
    }
}