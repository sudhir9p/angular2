import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { local, worldwidenews } from '../../../data/articles-data.json';
import { catchError, tap,map } from 'rxjs/operators';



@Injectable()
export class ArticlesService {

    totalArticles = [];
    constructor(private http: HttpClient) {

    }

    getArticles(sourceType,startIndex) {
        // if (sourceType === "local")
        //     return local;
        // else if (sourceType === "worldwide")
        //     return worldwidenews;
        return this.http.get('data/articles-data.json').pipe(
            map((data) => {
                console.log(data);
               return data[sourceType].slice(startIndex,5);
            })
        );
    }
}