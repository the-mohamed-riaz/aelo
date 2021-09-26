import { Component, OnInit, Input } from '@angular/core';
import { recentTransaction } from '../models/model';

@Component({
  selector: 'recent-transaction',
  templateUrl: './recent-transaction.component.html',
  styleUrls: ['./recent-transaction.component.scss']
})
export class RecentTransactionComponent implements OnInit {

  @Input() data: Array<recentTransaction>;

  constructor() {
    this.data = [
      { icon: 'phone volume', comment: 'phone', timeStamp: '15 Sep at 4:10 PM', amount: '4500' },
      { icon: 'tty', comment: 'clock', timeStamp: '15 Sep at 4:10 PM', amount: '4500' },
    ]
  }

  ngOnInit(): void {
  }


}
