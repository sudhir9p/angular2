import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticlesListComponent } from '../components/articles-list.component';
import { ArticlesService } from '../service/articles.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleDetailsViewComponent } from '../components/article-details-view.component';
import { ArticleCreateEditComponent } from '../components/article-create-edit.component';
import { ArticleListResultsComponent } from '../components/article-list-results.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'articles', component: ArticlesListComponent },
            {
                path: 'article-view',
                component: ArticleDetailsViewComponent
            },
            {
                //path: 'article/:id',
                path: 'article/edit',
                component: ArticleCreateEditComponent
            },
        ])
    ],
    declarations: [
        ArticleListResultsComponent,
        ArticlesListComponent,
        ArticleDetailsViewComponent,
        ArticleCreateEditComponent
    ],
    providers: [ArticlesService]
})
export class ArticlesModule { }
