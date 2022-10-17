import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService:CustomToastrService, private userAuthService:UserAuthService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch(error.status){
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Yetkiniz yok.", "Hata!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopCenter
          })
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek yapıldı.", "Hata!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopCenter
          })
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => {

          });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilemiyor.", "Hata!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopCenter
          })
          break; 
        default:
          this.toastrService.message("Beklenmeyen bir hata meydana geldi.", "Hata!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopCenter
          })
          break;
      } 
      return of(error)
    }));
  }
}
