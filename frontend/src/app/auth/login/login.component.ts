import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    newUser = true;

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

    constructor() {
    }

    callFocus(val: any) {
        this.focusOn = val.path[0].id;
    }

    ngOnInit() {
        $(document).ready(function () {

            'use strict';

            var usernameError = true,
                emailError = true,
                passwordError = true,
                passConfirm = true;

            // Detect browser for css purpose
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                $('.form form label').addClass('fontSwitch');
            }

            // Label effect
            $('input').focus(function () {

                $(this).siblings('label').addClass('active');
            });

            // form switch
            $('a.switch').click(function (e) {
                $(this).toggleClass('active');
                e.preventDefault();

                if ($('a.switch').hasClass('active')) {
                    $(this).parents('.form-peice').addClass('switched').siblings('.form-peice').removeClass('switched');
                } else {
                    $(this).parents('.form-peice').removeClass('switched').siblings('.form-peice').addClass('switched');
                }
            });


            // Form submit
            // $('form.signup-form').submit(function (event) {
            //     event.preventDefault();

            //     if (usernameError == true || emailError == true || passwordError == true || passConfirm == true) {
            //         $('.name, .email, .pass, .passConfirm').blur();
            //     } else {
            //         $('.signup, .login').addClass('switched');

            //         setTimeout(function () { $('.signup, .login').hide(); }, 700);
            //         setTimeout(function () { $('.brand').addClass('active'); }, 300);
            //         setTimeout(function () { $('.heading').addClass('active'); }, 600);
            //         setTimeout(function () { $('.success-msg p').addClass('active'); }, 900);
            //         setTimeout(function () { $('.success-msg a').addClass('active'); }, 1050);
            //         setTimeout(function () { $('.form').hide(); }, 700);
            //     }
            // });

            // Reload page
            $('a.profile').on('click', function () {
                location.reload();
            });


        });

    }

}
