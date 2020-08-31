import { Injectable } from '@angular/core';
import { FeedbackMessage } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/api-config';

@Injectable({
    providedIn: 'root'
})
export class SupportService {

    constructor(
        private http: HttpClient
    ) { }

    sendMessage(feedback: FeedbackMessage) {
        return this.http.post(`${BASE_URL}/support/send_message/`, JSON.stringify(feedback))
    }

}
