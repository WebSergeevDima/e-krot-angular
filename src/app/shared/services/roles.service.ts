import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/api-config';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class RolesService {

    private role: number

    constructor(
        private http: HttpClient
    ) { }

    whatRole() {
        console.log('Роль: ', this.role)
    }

    getRole() {

        const accessToken = localStorage.getItem('accessToken')

        this.http.post(`${BASE_URL}/auth/role/`, JSON.stringify({ accessToken: accessToken })).pipe(
            map(response => {
                //console.log('ROLE: ', response)
                this.role = response['role']
                return response
            })
        ).subscribe(r => r)

    }

    validatePrivilege(privilege: string): boolean {

        const rols = {
            2: {
                name: 'admin',
                privilege: [
                    'auth',
                    'vip'
                ]
            },
            4: {
                name: 'user',
                privilege: [
                    'auth'
                ]
            }
        }

        return !!rols[this.role] ? rols[this.role].privilege.indexOf(privilege) != -1 : false

    }

    setRole(role: number): void {
        this.role = role
    }

    removeRole() {
        this.role = 0
    }

}