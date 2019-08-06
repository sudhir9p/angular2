import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticlesListComponent } from './articles-list.component';
import { ArticlesService } from './articles.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleDetailsViewComponent } from './article-details-view.component';
import { ArticleCreateEditComponent } from './article-create-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'articles', component: ArticlesListComponent },
            {
                path: 'article-view',
                component: ArticleDetailsViewComponent
            },
            {
                path: 'article/:id',
                component: ArticleDetailsViewComponent
            },
        ])
    ],
    declarations: [
        ArticlesListComponent,
        ArticleDetailsViewComponent,
        ArticleCreateEditComponent
    ],
    providers: [ArticlesService]
})
export class ArticlesModule { }
