import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { commonService } from '../../shared/common.service';



@Injectable()
export class ArticlesService {

    totalArticles = [];
    localArticles = [];
    currentArticle = {};
    sourceType: string = "";
    configData: any;
    constructor(private http: HttpClient, private commonService: commonService) {
    }

    getArticles(source, startIndex) {
        if (!source.includes('local')) {
            return this.http.get(`${this.commonService.configData['apiUrl']}/top-headlines?sources=${source}&apiKey=${this.commonService.configData['apiKey']}&pageSize=${this.commonService.configData['pageSize']}&page=${startIndex}`).pipe(
                map((data: []) => {
                    const nextarticles = data['articles'];
                    this.totalArticles = [...this.totalArticles, ...nextarticles]
                    return nextarticles;
                })
            );
        }
        else {
            if (!this.localArticles || this.localArticles.length === 0) {
                return this.http.get('data/articles-data.json').pipe(
                    map((data) => {
                        const nextarticles = data['Local'].slice(startIndex, startIndex + 5);
                        this.localArticles = [...this.localArticles, ...nextarticles];
                        return nextarticles;
                    })
                );
            }
            else
                return of(this.localArticles);
        }
    }

    getSources() {
        const sources$ = this.http.get(`${this.commonService.configData['apiUrl']}/sources?apiKey=${this.commonService.configData['apiKey']}`);
        const localSources$ = this.http.get('data/articles-data.json');

        return forkJoin(sources$, localSources$);
    }
}