import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/api-config';

@Injectable({
    providedIn: 'root'
})

export class RolesService implements OnInit {

    private role: number

    constructor(
        private http: HttpClient
    ) {

    }

    ngOnInit() {
    }

    whatRole() {
        console.log('Роль: ', this.role)
    }

    getRole() {

        //this.role = this.http.post(`${BASE_URL}/auth/role/`, JSON.stringify({ accessToken: accessToken }))
        return this.role = 4
    }

    validateRole(role: string): boolean {

        const rols = {
            4: 'user',
            5: 'admin'
        }

        if (rols[this.role] === role) {
            return true
        }

        return false

    }

    setRole(role: number): void {
        this.role = role
    }

    removeRole() {
        this.role = 0
    }

}