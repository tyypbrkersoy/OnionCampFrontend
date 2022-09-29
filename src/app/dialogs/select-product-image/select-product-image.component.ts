import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $: any

@Component({
  selector: 'app-select-product-image',
  templateUrl: './select-product-image.component.html',
  styleUrls: ['./select-product-image.component.scss']
})
export class SelectProductImageComponent extends BaseDialog<SelectProductImageComponent> implements OnInit {

  constructor(dialogRef:MatDialogRef<SelectProductImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data:SelectProductImageState | string,
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private dialog:DialogService) {
    super(dialogRef)
   }
  
   
   @Output() options: Partial<FileUploadOptions> = {
    accept:".png, .jpg , .jpeg , .gif ",
    action:"upload",
    controller:"products",
    explanation:"Ürün resmini seçin veye sürükleyiniz...",
    isAdminPage:true,
    queryString: `id=${this.data}`
   };
  
   images: List_Product_Image[];
  
  
  async ngOnInit() {
    this.spinner.show(SpinnerType.LineScale);
    this.images = await this.productService.readImages(this.data as string, ()=> this.spinner.hide(SpinnerType.LineScale));

  }

  async deleteImage(imageId:string, event:any){

    this.dialog.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed: async ()=> {
        this.spinner.show(SpinnerType.BallScaleRippleMultiple)
        await this.productService.deleteImage(this.data as string, imageId, ()=> {
          this.spinner.hide(SpinnerType.BallScaleRippleMultiple);
          var card = $(event.srcElement).parent().parent();
          card.fadeOut(500);
        })
      }
    })
  }
}

export enum SelectProductImageState{
  Close
}
