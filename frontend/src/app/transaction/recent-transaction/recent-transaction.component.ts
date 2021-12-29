import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { $pretty_recent_trans, $recentTransaction } from '../models/model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'recent-transaction',
  templateUrl: './recent-transaction.component.html',
  styleUrls: ['./recent-transaction.component.scss']
})

export class RecentTransactionComponent implements OnInit {
  data: Array<$pretty_recent_trans> = [];
  recent_trans_query: Array<$recentTransaction> = [];
  username: string | null = null;
  constructor(private http: HttpClient, private api: ApiService, private cookie: CookieService, public dialog: MatDialog, private route: Router) {
    if (this.cookie.check('username')) {
      this.username = this.cookie.get('username');
      this.fetchValues_1();
      setInterval(async () => { this.fetchValues() }, 1000 * 3);
    }
  }

  goTo(val: string) {
    this.route.navigateByUrl(val);
  }

  ids = new Set();

  fetchValues_1() {
    this.api.get_recent_transaction().subscribe(
      (val) => {
        this.recent_trans_query = val;
        for (let item of this.recent_trans_query) {
          let row: $pretty_recent_trans = {
            amount: "",
            comment: "",
            icon: "",
            timeStamp: ""
          };
          if (item.payment_mode === "cash") {
            row.icon = "money bill alternate";
          } else if (item.payment_mode === "upi") {
            row.icon = "qrcode";
          } else if (item.payment_mode === "bank_transfer") {
            row.icon = "university";
          } else if (item.payment_mode === "cheque") {
            row.icon = "bookmark outline";
          } else if (item.payment_mode === "atm_card") {
            row.icon = "credit card";
          } else if (item.payment_mode === "others") {
            row.icon = "handshake outline";
          }

          if (item.comment !== "null") {
            row.comment = item.cat_of_trans + ' (' + item.comment!.slice(0, 20) + ') ...';
          } else {
            row.comment = item.cat_of_trans;
          }

          let ts = item.trans_date + ' ' + item.trans_hour;
          row.timeStamp = moment(ts, "YYYY-MM-DD HH:mm").format("LLLL");

          row.amount = item.amount;
          this.data.push(row);
          this.ids.add(item.id);
        }

      },
      // (err) => console.log("err while fetching recent trans:\n", err)
    );
  }

  fetchValues() {
    this.api.get_recent_transaction().subscribe(
      (val) => {
        this.recent_trans_query = val;
        for (let item of this.recent_trans_query) {
          let row: $pretty_recent_trans = {
            amount: "",
            comment: "",
            icon: "",
            timeStamp: ""
          };
          if (item.payment_mode === "cash") {
            row.icon = "money bill alternate";
          } else if (item.payment_mode === "upi") {
            row.icon = "qrcode";
          } else if (item.payment_mode === "bank_transfer") {
            row.icon = "university";
          } else if (item.payment_mode === "cheque") {
            row.icon = "bookmark outline";
          } else if (item.payment_mode === "atm_card") {
            row.icon = "credit card";
          } else if (item.payment_mode === "others") {
            row.icon = "handshake outline";
          }

          if (item.comment !== "null") {
            row.comment = item.cat_of_trans + ' (' + item.comment!.slice(0, 20) + ') ...';
          } else {
            row.comment = item.cat_of_trans;
          }

          let ts = item.trans_date + ' ' + item.trans_hour;
          row.timeStamp = moment(ts, "YYYY-MM-DD HH:mm").format("LLLL");
          row.amount = item.amount;
          this.addData(item, row);
          this.ids.add(item.id);
          // console.log('comment: ', item.comment, typeof (item.comment), item.comment === 'null');
        }

      },
      (err) => console.log("err while fetching recent trans:\n", err)
    );
  }


  addData(item: $recentTransaction, row: $pretty_recent_trans) {
    if (this.ids.has(item.id)) {
      // console.log("not pushing row, has status: ", this.ids.has(item.id), "\n id list", this.ids, "\n item id:", item.id);
    } else {
      // console.debug("pushing row into table: \n", row);
      this.data.push(row);
    }
  }
  ngOnInit(): void { }

}
