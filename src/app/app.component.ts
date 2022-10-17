import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public authService:AuthService,
    private toastr:CustomToastrService,
    private router:Router) {
    authService.identityCheck();
  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.toastr.message("Çıkış Yapıldı.", "", {
      messageType:ToastrMessageType.Info,
      position:ToastrPosition.BottomCenter
    })
    this.router.navigate([""]);
  }
 
}
