import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/api-config';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class RolesService {

    private role: number
    private name: string
    private email: string

    constructor(
        private http: HttpClient
    ) { }

    whatRole() {
        //console.log('Роль: ', this.role)
    }

    userName() {
        return this.name
    }
    userEmail() {
        return this.email
    }

    getRole() {

        const accessToken = localStorage.getItem('accessToken')

        this.http.post(`${BASE_URL}/auth/role/`, JSON.stringify({ accessToken: accessToken })).pipe(
            map(response => {
                this.role = response['role']  
                if(response['name'] && response['email']) {             
                this.name = response['name']
                this.email = response['email']
                } else {
                    this.name = ''
                    this.email = ''
                }
                return response
            })
        ).subscribe(r => r)

    }

    validatePrivilegeOLD(privilege: string): boolean {

        const rols = {
            2: {
                name: 'admin',
                privilege: [
                    'auth',
                    'vip'
                ]
            },
            3: {
                name: 'business',
                privilege: [
                    'auth',
                    'business'
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

    validatePrivilege(privilege: string): boolean {

        const rols = {
            2: {
                name: 'admin',
                privilege: [
                    'auth',
                    'vip'
                ]
            },
            3: {
                name: 'business',
                privilege: [
                    'auth',
                    'business',
                    'price-comparisons'
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