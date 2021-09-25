import { Component, OnInit, Input } from '@angular/core';
import { DropdownsService } from 'src/app/DefaultValues/dropdowns.service';

import { dropdown_i } from "../../models/dd-model"

@Component({
  selector: 'semantic-dd',
  templateUrl: './semantic-dd.component.html',
  styleUrls: ['./semantic-dd.component.scss']
})
export class SemanticDdComponent implements OnInit {
  options: Array<dropdown_i> | [] = [];
  @Input() dd_name!: string;
  @Input() id_: string = "XD";
  @Input() placeHolder?: string;

  constructor(private constant: DropdownsService) {

  }

  ngOnInit(): void {
    console.log("Got dd name: ", this.dd_name);
    switch (this.dd_name) {
      case "trans_choice":
        this.options = this.constant.trans_choice;
        this.placeHolder = "Debit/Credit";
        break;
      case "trans_category":
        this.options = this.constant.trans_category;
        this.placeHolder = "Category of Transaction";
        break;
      case "payment_modes":
        this.options = this.constant.payment_modes;
        this.placeHolder = "Payment Mode";
        break;

      default:
        break;
    }
  }

}
