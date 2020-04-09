import { Component, OnInit, Input } from '@angular/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-no-internet-connection',
  templateUrl: './no-internet-connection.component.html',
  styleUrls: ['./no-internet-connection.component.scss']
})
export class NoInternetConnectionComponent implements OnInit {

  internetConnectionStatus;
  constructor() { }

  ngOnInit() {
    //  (this.internetConnectionStatus)

    this.createOnline$().subscribe(isOnline => {
      //  (isOnline)
      this.internetConnectionStatus = isOnline;
    }
    );
  }
  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}
