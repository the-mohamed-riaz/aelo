import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { environment } from './../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    newUser = true;
    url = "";

    // usernameError = true;
    // emailError = true;
    // passwordError = true;
    // passConfirm = true;
    focusOn: string | null = null;

    loginForm = new FormGroup({
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
    });
    registrationForm = new FormGroup({
        full_name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phone: new FormControl(null, [Validators.required]),
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
        // $(document).ready(function () {
        //     'use strict';
        //     // Detect browser for css purpose
        //     if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        //         $('.form form label').addClass('fontSwitch');
        //     }

        //     // Label effect
        //     $('input').focus(function () {
        //         $(this).siblings('label').addClass('active');
        //     });

        //     // form switch
        //     $('a.switch').click(function (e) {
        //         $(this).toggleClass('active');
        //         e.preventDefault();

        //         if ($('a.switch').hasClass('active')) {
        //             $(this).parents('.form-peice').addClass('switched').siblings('.form-peice').removeClass('switched');
        //         } else {
        //             $(this).parents('.form-peice').removeClass('switched').siblings('.form-peice').addClass('switched');
        //         }
        //     });

        //     // Reload page
        //     $('a.profile').on('click', function () {
        //         location.reload();
        //     });
        // });
    }


    // Form submit
    register_user() {

        this.http.post(this.url + 'register/', this.registrationForm.value).subscribe();

        console.log(this.url + 'register/', this.registrationForm.value);
        // .subscribe(
        //     data => console.log("Register :", data),
        //     err => console.log("Register :", err),
        // );
    }

    login_user() {
        this.http.post(this.url + 'login-token/', this.loginForm.value).subscribe();
        // .subscribe(
        //     data => console.log("Login :", data),
        //     err => console.log("Login :", err),
        // );
    }

}
