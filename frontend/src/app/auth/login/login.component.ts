import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  usernameError = true;
  emailError = true;
  passwordError = true;
  passConfirm = true;
  focusOn: string|null= null;
  
  
  constructor() {
    
    // Detect browser for css purpose
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      document.querySelector('.form form label')!.classList.add('fontSwitch');
    }
  }
  
  callFocus(val:any){
    this.focusOn = val.path[0].id;
  }

  ngOnInit(): void {
    
  }
  
}
