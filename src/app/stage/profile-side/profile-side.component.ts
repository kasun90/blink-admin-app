import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';
import { Message } from '../../message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-side',
  templateUrl: './profile-side.component.html',
  styleUrls: ['./profile-side.component.css']
})
export class ProfileSideComponent implements OnInit {

  private profilePic: string;
  private name: string;
  private type: string;

  constructor(private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.profilePic = 'assets/images/profile/default.png';
    this.requestUserDetails();
  }

  requestUserDetails() {
    const request = new Message('com.blink.shared.admin.portal.UserDetailsRequestMessage');
    this.messageService.send(request).subscribe(result => {
      if (result.isOK()) {
        this.name = result.get('name');
        this.type = result.get('type');
      }
    });
  }

  onLogOut() {
    this.messageService.removeSession();
    this.router.navigate(['/login']);
  }

}
