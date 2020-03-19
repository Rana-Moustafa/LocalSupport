import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonsService } from '../shared/commons.service';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss']
})
export class CookieComponent implements OnInit {
  IsmodelShow;
  coockiesDetails;
  constructor(private commons: CommonsService){ }

  ngOnInit() {
    this.Coockietext();
  }
  Coockieclose() {
    this.IsmodelShow=true;
}
Coockietext(){
    this.commons.getCookiesDetails().subscribe(data => {
      ////console.log(data)
  }, error =>{
      ////console.log(error)
  });
}
}
