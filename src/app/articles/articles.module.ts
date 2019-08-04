import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticlesListComponent } from './articles-list.component';
import { ArticlesService } from './articles.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'articles', component: ArticlesListComponent }
        ])
    ],
    declarations: [
        ArticlesListComponent,
    ],
    providers: [ArticlesService]
})
export class ArticlesModule { }
