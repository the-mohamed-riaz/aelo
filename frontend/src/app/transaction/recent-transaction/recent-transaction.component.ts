import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { $pretty_recent_trans, $recentTransaction } from '../models/model';

@Component({
  selector: 'recent-transaction',
  templateUrl: './recent-transaction.component.html',
  styleUrls: ['./recent-transaction.component.scss']
})

export class RecentTransactionComponent implements OnInit {
  data: Array<$pretty_recent_trans> = [];
  recent_trans_query: Array<$recentTransaction> = [];
  user: string | null = null;
  constructor(private http: HttpClient, private cookie: CookieService, public dialog: MatDialog, private route: Router) {
    if (this.cookie.check('username')) {
      this.user = this.cookie.get('username');
      this.fetchValues();
      setInterval(async () => this.fetchValues(), 1000 * 30);
    }
  }

  goTo(val: string) {
    this.route.navigateByUrl(val);
  }
  fetchValues() {
    this.http.get<Array<$recentTransaction>>(`http://localhost:8000/recent/?username=${this.user}`).subscribe(
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
            row.icon = "user outline";
          } else if (item.payment_mode === "bank_transfer") {
            row.icon = "university";
          } else if (item.payment_mode === "cheque") {
            row.icon = "bookmark outline";
          } else if (item.payment_mode === "atm_card") {
            row.icon = "credit card outline";
          } else if (item.payment_mode === "others") {
            row.icon = "handshake outline";
          }

          row.comment = item.cat_of_trans;
          row.timeStamp = item.trans_date + "  " + item.trans_hour;
          row.amount = item.amount;
          if (this.data.length >= 5) {
            this.data.shift();
          }
          this.data.push(row);
        }
      },
      (err) => console.log("err while fetching recent trans:\n", err)
    );
  }

  ngOnInit(): void { }

}
