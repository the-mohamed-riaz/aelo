import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { $pretty_recent_trans, $recentTransaction } from '../models/model';
import * as moment from 'moment';

@Component({
  selector: 'recent-transaction',
  templateUrl: './recent-transaction.component.html',
  styleUrls: ['./recent-transaction.component.scss']
})

export class RecentTransactionComponent implements OnInit {
  data: Array<$pretty_recent_trans> = [];
  recent_trans_query: Array<$recentTransaction> = [];
  username: string | null = null;
  constructor(private http: HttpClient, private cookie: CookieService, public dialog: MatDialog, private route: Router) {
    if (this.cookie.check('username')) {
      this.username = this.cookie.get('username');
      this.fetchValues_1();
      setInterval(async () => { this.fetchValues(); console.log("unique list: ", this.ids); }, 1000 * 3);
    }
  }

  goTo(val: string) {
    this.route.navigateByUrl(val);
  }

  ids = new Set();

  fetchValues_1() {
    this.http.get<Array<$recentTransaction>>(`http://localhost:8000/recent/?username=${this.username}`).subscribe(
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
            row.icon = "rupee sign";
          } else if (item.payment_mode === "upi") {
            row.icon = "username outline";
          } else if (item.payment_mode === "bank_transfer") {
            row.icon = "university";
          } else if (item.payment_mode === "cheque") {
            row.icon = "bookmark outline";
          } else if (item.payment_mode === "atm_card") {
            row.icon = "credit card outline";
          } else if (item.payment_mode === "others") {
            row.icon = "handshake outline";
          }

          row.comment = item.cat_of_trans + (item.comment != null ? ` (${item.comment!.slice(0, 20) + ' ...'})` : '');
          // row.timeStamp = item.trans_date + "  " + item.trans_hour;
          let ts = item.trans_date + ' ' + item.trans_hour;
          row.timeStamp = moment(ts, "YYYY-MM-DD HH:mm").format("LLLL");

          row.amount = item.amount;
          this.data.push(row);
          this.ids.add(item.id);
        }

      },
      (err) => console.log("err while fetching recent trans:\n", err)
    );
  }

  fetchValues() {
    this.http.get<Array<$recentTransaction>>(`http://localhost:8000/recent/?username=${this.username}`).subscribe(
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
            row.icon = "rupee sign";
          } else if (item.payment_mode === "upi") {
            row.icon = "username outline";
          } else if (item.payment_mode === "bank_transfer") {
            row.icon = "university";
          } else if (item.payment_mode === "cheque") {
            row.icon = "bookmark outline";
          } else if (item.payment_mode === "atm_card") {
            row.icon = "credit card outline";
          } else if (item.payment_mode === "others") {
            row.icon = "handshake outline";
          }
          row.comment = item.cat_of_trans + (item.comment != null ? ` (${item.comment!.slice(0, 20) + ' ...'})` : '');
          let ts = item.trans_date + ' ' + item.trans_hour;
          row.timeStamp = moment(ts, "YYYY-MM-DD HH:mm").format("LLLL");
          row.timeStamp = ts;
          row.amount = item.amount;
          this.addData(item, row);
          this.ids.add(item.id);
        }

      },
      (err) => console.log("err while fetching recent trans:\n", err)
    );
  }


  addData(item: $recentTransaction, row: $pretty_recent_trans) {
    if (this.ids.has(item.id)) {
      console.log("not pushing row, has status: ", this.ids.has(item.id), "\n id list", this.ids, "\n item id:", item.id);
    } else {
      console.debug("pushing row into table: \n", row);
      this.data.push(row);
    }
  }
  ngOnInit(): void { }

}
