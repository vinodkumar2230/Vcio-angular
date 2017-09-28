import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';



@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://localhost:56625/api/Organisations/GetAllOrg', this.jwt()).map((response: Response) => response.json());
    }
    getByOrgId(id: number) {
        return this.http.get('http://localhost:56625/api/Account/GetOrganisation/' + id, this.jwt()).map((response: Response) => response.json());
    }
    getById(id: number) {
        return this.http.get('http://localhost:56625/api/Account/GetStates/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('http://localhost:56625/api/Account/Register', user, this.jwt()).map((response: Response) => response.json());
    }

    update(org: Organisation) {
        return this.http.put('http://localhost:56625/api/Organisations/EditOrg' + org.id, org, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('http://localhost:55278/api' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
 class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}
class Organisation{
    id:number;
    orgName:string;
    shortName:string;
    firstName:string;
    lastName:string;
    phone:string;
    email:string;
    description:string
}