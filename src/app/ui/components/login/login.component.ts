import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userAuthService:UserAuthService,
    spinner:NgxSpinnerService,
    private authService:AuthService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private socialAuthService:SocialAuthService
    ) {
    super(spinner);
    
    socialAuthService.authState.subscribe(async (user:SocialUser)=>{
      
      this.showSpinner(SpinnerType.SquareJellyBox);
      
      switch (user.provider) {
        case "GOOGLE":
          await userAuthService.googleLogin(user, () => {
          authService.identityCheck();
          this.hideSpinner(SpinnerType.LineScale);
        })
          break;
        case "FACEBOOK":
          await userAuthService.facebookLogin(user, () => {
          authService.identityCheck();
          this.hideSpinner(SpinnerType.LineScale);
        })
          break;
      }
    });
  }

  ngOnInit(): void {
  }


  async login(usernameOrEmail:string, password:string){
    this.showSpinner(SpinnerType.LineScale);
    await this.userAuthService.login(usernameOrEmail, password, ()=>{
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl:string = params["returnUrl"];
        if (returnUrl) 
          this.router.navigate([returnUrl])
      });
      this.hideSpinner(SpinnerType.LineScale);
    });
  }

  facebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }

}
