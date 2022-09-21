import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastrService:ToastrService) { }
  
  
  
  message(message:string, title:string, toastrOptions:Partial<ToastrOptions>){
    this.toastrService[toastrOptions.messageType](message,title,{
      positionClass:toastrOptions.position
    });
  }


}

export class ToastrOptions{
  messageType:ToastrMessageType;
  position:ToastrPosition;
}

export enum ToastrMessageType{
  Succsess="success",
  Info ="info",
  Warning="warning",
  Error ="error"
}

export enum ToastrPosition{
  TopCenter="toast-top-center",
  TopLeft="toast-top-left",
  TopRight="toast-top-right",
  BottomCenter="toast-bottom-center",
  BottomLeft="toast-bottom-left",
  BottomRight="toas-bottom-right",
  TopFullWidth="toast-top-full-width",
  BottomFullWidth="toast-bottom-full-width"
}
