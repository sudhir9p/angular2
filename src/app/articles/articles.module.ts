import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticlesListComponent } from './articles-list.component';
import { ArticlesService } from './articles.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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
