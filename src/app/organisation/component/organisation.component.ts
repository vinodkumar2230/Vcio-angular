import { Component, OnInit, Inject, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AddEvent, EditEvent, GridComponent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs/Rx';
import { Validators, FormBuilder } from '@angular/forms';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent, RowArgs } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { products, sampleProducts } from "../products";
import { UserService } from "../../services/user.service";
import { UserInformation } from "../userinformation";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
declare var jquery:any;
declare var $ :any;

@Component({
    selector:'app-org',
    templateUrl:'./organisation.component.html',
    styleUrls:['./organisation.component.css']
})
export class OrganisationComponent{
    private gridView: GridDataResult;
    private data: Object[];
    private pageSize: number = 10;
    private skip: number = 0;
    private items: any[] = products; 
    public info:any[];
    public organistion:Organisation[];
    public organisationId:number;
    private selectedKeys: number[] = [5];
    public modalRef: BsModalRef;
    
    private gridData: GridDataResult
    constructor(private modalService: BsModalService,
                private userService: UserService,
                ) {
                    this.loadItems();
                    this.userService.getAll().subscribe((data) => {
                    console.log(data);
                    this.info=data,
                    this.gridData = process(this.info, this.state);
                });
                    }


          private rowSelectionKey(context: RowArgs): number {
        
                 this.organisationId= context.dataItem.OrgId;
                 localStorage.setItem('companyId', JSON.stringify(this.organisationId));
                 return this.organisationId;
                  }


       
         protected pageChange(event: PageChangeEvent): void {
                this.skip = event.skip;
                this.loadItems();
          }

       public openModal(template: TemplateRef<any>) {
          
            var t=this.selectedKeys;
            console.log(t);
            this.userService.getByOrgId(5).subscribe((data) => {
            console.log(data);
            this.organistion = data;
                });           
            this.modalRef = this.modalService.show(template);
        }
        

     private loadItems(): void {
       this.gridView = {
           data: this.items.slice(this.skip, this.skip + this.pageSize),
           total: this.items.length
        };
     }

       private state: State = {
        skip: 0,
        take: 5
    };
    // t:any;
     ngOnInit() {
     
     }
    
  

     protected dataStateChange(state: DataStateChangeEvent): void {
         this.state = state;
          this.gridData = process(this.info, this.state);
      }
  



}
class Organisation {
    OrgName : string;
    ShortName : string;
    FirstName : string;
    LastName : string;
    Description :string;
    Email : string;
    Phone : number;
}
 
