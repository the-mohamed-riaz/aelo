import { FormGroup, FormControl, Validators } from '@angular/forms';
import { $profile_details, FetcherService } from './fetcher.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.scss']
})
export class SettingsHomeComponent implements OnInit {
  profile_data!: $profile_details;

  profile_form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    mobile: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    full_name: new FormControl(null, [Validators.required]),
  })

  constructor(http: FetcherService) {
    http.get_profile_data().subscribe(
      (val) => {
        this.profile_data = val;
        this.profile_form.setValue(this.profile_data);
      }
    );
  }

  panelOpenState = false;

  ngOnInit(): void {
  }

}
