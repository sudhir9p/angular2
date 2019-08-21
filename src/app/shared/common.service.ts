import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class commonService {
    configData = {};

    constructor(private http: HttpClient) {
        this.getConfigData();
    }

    getConfigData() {
        return this.http.get('assets/config/appConfig.json');
    }
}