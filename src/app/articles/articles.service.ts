import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { local, worldwidenews } from '../../../data/articles-data.json';
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export class ArticlesService {

    constructor(private http: HttpClient) {

    }

    getArticles(sourceType) {
        if (sourceType === "local")
            return local;
        else if (sourceType === "worldwide")
            return worldwidenews;
        // return this.http.get('../../../data/articles-data.json').pipe(
        //     tap(data => {

        //     })
        // );
    }
}