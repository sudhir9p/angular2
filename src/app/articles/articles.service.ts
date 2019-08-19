import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';



@Injectable()
export class ArticlesService {

    totalArticles = [];
    currentArticle = {};
    sourceType: string = "";
    configData = {};
    constructor(private http: HttpClient) {
        this.getConfigData();
    }

    getArticles(sourceType, startIndex) {
        return this.http.get(`${this.configData['apiUrl']}/sources?apiKey=${this.configData['apiKey']}`).pipe(
            map((data) => {
                const nextarticles = data[sourceType].slice(startIndex, startIndex + 5);
                this.totalArticles = [...this.totalArticles, ...nextarticles]
                return nextarticles;
            })
        );
    }

    getSources() {
        return this.http.get(`${this.configData['apiUrl']}/sources?apiKey=${this.configData['apiKey']}`).pipe(
            map((data) => {
                return data;
            })
        );
    }

    getConfigData() {
        this.http.get('data/appConfig.json').subscribe(data => {
            this.configData = data;
        });
    }
}