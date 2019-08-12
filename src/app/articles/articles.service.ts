import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { local, worldwidenews } from '../../../data/articles-data.json';
import { catchError, tap, map } from 'rxjs/operators';



@Injectable()
export class ArticlesService {

    totalArticles = [];
    currentArticle = {};
    sourceType: string="";
    constructor(private http: HttpClient) {

    }

    getArticles(sourceType, startIndex) {
        return this.http.get('data/articles-data.json').pipe(
            map((data) => {
                const nextarticles = data[sourceType].slice(startIndex, startIndex + 5);
                this.totalArticles = [...this.totalArticles, ...nextarticles]
                return nextarticles;
            })
        );
    }
}