import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } 
from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {todo} from "../model/todo";

@Injectable()
export class todoservice {
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 
                                     'Accept': '*/*'});
            this.headers.append('Access-Control-Allow-Origin','*');
            this.headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
            this.headers.append('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token');

        this.options = new RequestOptions({ headers: this.headers });
    }

    getTodoList(url: string): Promise<todo> {
        return this.http
            .get(url, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

createService(url: string, param: any): Promise<todo> {
    let body = JSON.stringify(param);
    return this.http
        .post(url, body, this.options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 

updateService(url: string, param: any): Promise<todo> {
    let body = JSON.stringify(param);
    return this.http
        .put(url, body, this.options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

deleteService(url: string, param: any): Promise<todo> {
    debugger;
    let t:todo;
    t=<todo>param;
    return this.http
        .delete(url+"/?id=" + t.id, this.options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    private extractData(res: Response) {
        debugger;
        var data = <Array<todo>>res.json();
        return data;
    }

    private handleError(error: any): Promise<any> {

        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}