import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
        { labelName: "Email id", placeholder: "", iconName: "email", type: "email", fcName: "email" },
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

    newUser = false;
    url = "";

    focusOn: string | null = null;

    loginForm = new FormGroup({
        email: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
    });
    registrationForm = new FormGroup({
        full_name: new FormControl(null, [Validators.required]),
        username: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        mobile: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        confirm_password: new FormControl(null, [Validators.required]),
        // }, [FormValidators.passwordsMatch(this.registrationForm.value('password'))]);
    });

    constructor(public http: HttpClient) {
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
        this.http.post(this.url + 'register/', export_form_data(this.registrationForm.value)).subscribe(
            (next) => {
                this.submission = "success";
            },
            (err) => {
                console.log(err.error);
                this.submission = err.error;
                // let [[key, value]] = Object.entries(err.error);
                this.registrationForm.setErrors(err.error);
            }
        );
    }

    login_user() {
        // let header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        let header = new HttpHeaders({ 'Content-Type': 'application/json' });
        // header.set('Access-Control-Allow-Origin', '*');
        this.http.post(this.url + 'login-token/', { 'password': this.loginForm.controls.password.value, 'username': this.loginForm.controls.username.value, 'full_name': this.loginForm.controls.full_name.value, 'email': this.loginForm.controls.email.value }, { headers: header }).subscribe(
            (data) => {
                console.log(data);
            }
        );
        // .subscribe(
        //     data => console.log("Login :", data),
        //     err => console.log("Login :", err),
        // );
    }

    switchForms() {
        this.newUser = !this.newUser;
        console.log(this.newUser);
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
