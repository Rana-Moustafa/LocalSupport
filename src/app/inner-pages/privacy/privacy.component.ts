import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/shared/commons.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  privacyContent;
  constructor(private commons: CommonsService) { }

  ngOnInit() {

    this.privacyData();
  }

  privacyData() {
    this.commons.getPrivacyPage().subscribe( data => {
      console.log(data);
      this.privacyContent = data;
    }, error => {
      console.log(error);
    })
  }
}
