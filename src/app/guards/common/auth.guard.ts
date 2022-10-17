import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { AuthService, _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper:JwtHelperService, 
    private router:Router, private toastr:CustomToastrService, 
    private spinner:NgxSpinnerService){

  }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.LineScale);
/*     const token:string = localStorage.getItem("accessToken");
    //const decodeToken = this.jwtHelper.decodeToken(token);
    //const expirationDateToken = this.jwtHelper.getTokenExpirationDate(token);
    let expired:boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    } */
    
    if (!_isAuthenticated) {
      this.router.navigate(["login"], {queryParams: {returnUrl: state.url}});
      this.toastr.message("Oturum açmanız gerekiyor.", "Yetki Yok!", {
        messageType:ToastrMessageType.Info,
        position:ToastrPosition.BottomCenter
      })
    }
    this.spinner.hide(SpinnerType.LineScale);
    
    return true;
  }
  
}
