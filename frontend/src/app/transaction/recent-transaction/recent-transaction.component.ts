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
      { icon: 'phone volume', comment: 'phone', timeStamp: '15 Sep at 3:57 PM', amount: '4500' },
      { icon: 'tty', comment: 'clock', timeStamp: '15 Sep at 4:00 PM', amount: '3200' },
      { icon: 'clock', comment: 'new watch', timeStamp: '15 Sep at 4:05 PM', amount: '5000' },
      { icon: 'home', comment: 'home', timeStamp: '15 Sep at 4:17 PM', amount: '1480' },
      { icon: 'man', comment: 'friend', timeStamp: '15 Sep at 4:39 PM', amount: '400' },
    ]
  }

  ngOnInit(): void {
  }


}
