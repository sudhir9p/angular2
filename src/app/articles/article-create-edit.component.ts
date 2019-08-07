import { Component, OnInit } from '@angular/core';
import { ArticlesService } from './articles.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './article-create-edit.component.html'
})
export class ArticleCreateEditComponent implements OnInit {

    article: any;
    constructor(private articleService: ArticlesService,
        private activeRoute: ActivatedRoute, private toastr: ToastrService) {
    }

    ngOnInit(): void {
        // const articleId = +this.activeRoute.snapshot.params['id'];
        this.article = this.articleService.currentArticle || {};
    }

    onSave(e) {
        if (this.article.id) {
            const index = this.articleService.totalArticles.findIndex(article => this.article.id == article.id);
            if (index !== -1) {
                this.articleService.totalArticles[index] = this.article;
                this.toastr.success("Article Updated Successfully.");
            }
            else {
                this.toastr.error("Unable to update article.");
            }
        }
        else {
            if (this.article.title == "" || this.article.description == "")
                this.toastr.warning("Article title and content are mandatory");
            else {
                this.article.id = Math.round(Math.random() * 100000);
                console.log(this.articleService.totalArticles);
                this.articleService.totalArticles.push(this.article);
                console.log(this.articleService.totalArticles);
                this.toastr.success("Article added Successfully.");
            }

        }
    }
    onCancel(e) {

    }
}