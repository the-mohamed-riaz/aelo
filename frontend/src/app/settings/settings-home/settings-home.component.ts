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

  constructor(private fetcher: FetcherService) {
    fetcher.get_profile_data().subscribe(
      (val) => {
        this.profile_data = val;
        this.profile_form.setValue(this.profile_data);
      }
    );
  }


  patch_changes() {
    let data = new FormData();
    data.append("email", this.profile_form.controls['email'].value);
    data.append("mobile", this.profile_form.controls['mobile'].value);
    data.append("full_name", this.profile_form.controls['full_name'].value);
    this.fetcher.update_profile_data(data).subscribe(
      (val) => {
        this.profile_data = val;
        this.profile_form.setValue(this.profile_data);
      }

    )
  }

  panelOpenState = false;

  ngOnInit(): void {
  }

}
