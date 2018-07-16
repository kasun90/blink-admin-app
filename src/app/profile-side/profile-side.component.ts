import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-side',
  templateUrl: './profile-side.component.html',
  styleUrls: ['./profile-side.component.css']
})
export class ProfileSideComponent implements OnInit {

  private profilePic: string;

  constructor() { }

  ngOnInit() {
    this.profilePic = 'assets/images/profile/default.png';

  }

}
