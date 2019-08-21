import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../service/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

@Component({
    templateUrl: '../html/article-create-edit.component.html'
})
export class ArticleCreateEditComponent implements OnInit {

    article: any;
    articleForm: FormGroup;
    constructor(private articleService: ArticlesService, private router: Router,
        private activeRoute: ActivatedRoute, private toastr: ToastrService, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.article = this.articleService.currentArticle || {};
        this.articleForm = this.fb.group({
            title: [this.article.title, Validators.required],
            publishedAt: this.article.publishedAt,
            description: [this.article.description, Validators.required],
            content: [this.article.content, Validators.required],
            url: this.article.url,
            author: this.article.author,
            urlToImage: this.article.urlToImage
        });
    }

    onSave() {
        this.article.title = this.articleForm.get('title');
        this.article.publishedAt = this.articleForm.get('publishedAt');
        this.article.description = this.articleForm.get('description');
        this.article.content = this.articleForm.get('content');
        this.article.url = this.articleForm.get('url');
        this.article.author = this.articleForm.get('author');
        this.article.urlToImage = this.articleForm.get('urlToImage');
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
            if (!this.article.title || !this.article.description)
                this.toastr.warning("Article title and content are required.");
            else {
                this.article.id = Math.round(Math.random() * 100000);
                this.articleService.totalArticles.push(this.article);
                this.toastr.success("Article added Successfully.");
                this.article = {};
            }

        }
    }
    onCancel(e) {
        this.router.navigate(['../articles']);
    }
}