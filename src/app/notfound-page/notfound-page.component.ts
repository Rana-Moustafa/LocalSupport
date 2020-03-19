import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonsService } from './../shared/commons.service';


@Component({
  selector: 'app-notfound-page',
  templateUrl: './notfound-page.component.html',
  styleUrls: ['./notfound-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotfoundPageComponent implements OnInit {
   notFoundData;
  constructor(private commons: CommonsService) { }

  ngOnInit() {
    this.notFound();
  }

  notFound() {
    this.commons.getNotFound().subscribe(data => {
        this.notFoundData = data;
    }, error => {
        // console.log(error);
    });
  }

}
