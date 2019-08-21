import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'article-list-results',
    templateUrl: '../html/article-list-results.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListResultsComponent {
    @Input() articlesList: any[] = [];
    @Input() sourceType: string;
    @Output() onEditDelete = new EventEmitter();
    constructor() {

    }

    onEditAndDelete(id, type) {
        this.onEditDelete.emit({ id, type });
    }
}