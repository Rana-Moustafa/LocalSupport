import { Component, OnInit , ViewEncapsulation, Input, EventEmitter, ChangeDetectorRef, NgZone} from '@angular/core';
import { UserDataService } from '../../../shared/user-data.service';

@Component({
  selector: 'app-display-profile-details',
  templateUrl: './display-profile-details.component.html',
  styleUrls: ['./display-profile-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DisplayProfileDetailsComponent implements OnInit {
  userData;
  userDataDisplayParent;
  @Input() profileDataChild;
  updatedUserProfileInfo;


  changePassword = false;
  constructor(private userDataService: UserDataService,
              private ref: ChangeDetectorRef,
              private ngZone: NgZone) {


  }

  ngOnInit() {
  }


}
