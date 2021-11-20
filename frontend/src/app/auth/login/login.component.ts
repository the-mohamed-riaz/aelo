import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'jquery';
import { environment } from './../../../environments/environment';

export interface $reg_err_response {
    fullname?: string | any;
    email?: string | any;
    username?: string | any;
    mobile?: string | any;
    password?: string | any;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


    loginFormElement = [
        { labelName: "User name", placeholder: "", iconName: "email", type: "text", fcName: "username" },
        { labelName: "Password", placeholder: "", iconName: "password", type: "password", fcName: "password" },
    ];
    regFormElement = [
        { labelName: "Full name", placeholder: "", iconName: "account_circle", type: "text", fcName: "full_name" },
        { labelName: "Email", placeholder: "", iconName: "mail", type: "email", fcName: "email" },
        { labelName: "User name", placeholder: "", iconName: "3p", type: "text", fcName: "username" },
        { labelName: "Mobile number", placeholder: "", iconName: "call", type: "tel", fcName: "mobile" },
        { labelName: "Password", placeholder: "", iconName: "password", type: "password", fcName: "password" },
        { labelName: "Confirm password", placeholder: "", iconName: "password", type: "text", fcName: "confirm_password" },
    ];

    newUser = true;
    url = "";

    focusOn: string | null = null;

    loginForm = new FormGroup({
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
    });
    registrationForm = new FormGroup({
        full_name: new FormControl(null, [Validators.required]),
        username: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        mobile: new FormControl(null),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        confirm_password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });

    constructor(public http: HttpClient, private cookie: CookieService) {
        this.url = environment.rootUrl;
        console.log("current url: ", this.url);
    }

    callFocus(val: any) {
        this.focusOn = val.path[0].id;
    }

    ngOnInit() {

    }

    submission: null | string | $reg_err_response | any = null;


    // Form submit
    register_user() {
        if (this.registrationForm.value.password === this.registrationForm.value.confirm_password) {
            this.http.post(this.url + 'register/', export_form_data(this.registrationForm.value)).subscribe(
                (next) => {
                    this.submission = "success";
                },
                (err) => {
                    console.log(err.error);
                    this.submission = err.error;
                    this.registrationForm.setErrors(err.error);
                }
            );
        } else {
            this.submission = "failed"
            this.registrationForm.setErrors({ confirm_password: "Password matching failed!" });
        };
    }

    login_user() {
        this.http.post(this.url + 'login-token/', export_form_data(this.loginForm.value)).subscribe(
            (next: { username: string, token: string } | any) => {
                this.submission = "success";
                this.cookie.set('tkn', next.token)
                console.log(next);
            },
            (err) => {
                console.log(err.error);
                this.submission = err.error;
                this.loginForm.setErrors(err.error);
            }
        );
    }

    switchForms() {
        this.newUser = !this.newUser;
        // console.log(this.newUser);
    }
}

export function export_form_data(val: { username: string, password: string, fullname: string, email: string }) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(val)) {
        formData.append(key, value);
        console.log(key, value);
    }
    return formData;
}
