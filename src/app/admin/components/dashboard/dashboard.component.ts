import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertifyService:AlertifyService, spinner:NgxSpinnerService) {
    super(spinner)
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.SquareJellyBox);
  }


  m(){
    this.alertifyService.message("Merhaba",{
      messageType: MessageType.Success,
      delay:5,
      position: Position.BottomCenter

    })
  }

  d(){
    this.alertifyService.dismiss();
  }

}