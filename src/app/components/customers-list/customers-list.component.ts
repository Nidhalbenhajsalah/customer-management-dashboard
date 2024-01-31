import { Component, OnInit } from '@angular/core';
import { CrudApiService } from 'src/app/services/crud-api.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  customers : any[]=[]
  constructor(private customersService : CrudApiService, private modalService: NgbModal) { }

  ngOnInit() {
    this.customersService.getCustomers().subscribe(
      {
        next:(data)=>{
        this.customers = data;
          
        }
      }
    )  
  }
  private openModal(component: any, options: any): NgbModalRef {
    return this.modalService.open(component, options);
  }

  openCustomerForm(customer: any, action: string): NgbModalRef {
    let modalRef: NgbModalRef | null = null;
  
    switch (action) {
      case "edit":
        modalRef = this.openModal(CustomerFormComponent, { size: 'lg' });
        modalRef.componentInstance.customer = customer;
        modalRef.componentInstance.action = action;
        modalRef.componentInstance.onSaveComplete.subscribe((event:any) => {
          if(event.action === 'update'){
            this.customers = this.customers.map(c=>c.id === event.data.id ? event.data : c);
          }
        });
        break;
      case "add":
        modalRef = this.openModal(CustomerFormComponent, { size: 'lg' });
        modalRef.componentInstance.action = action;
        modalRef.componentInstance.onSaveComplete.subscribe((event:any) => {
          if(event.action === 'add'){
            this.customers.push(event.data);
          }
        });
        break;
    }
  
    // if modalRef is assigned a value
    if (!modalRef) {
      throw new Error("Unexpected action: " + action);
    }

  
    return modalRef;
  }

  deleteCustomer(customer: any){
    this.customersService.deleteCustomer(customer.id).subscribe(
      {
        next:(data)=>{
          this.customers = this.customers.filter(c=>c.id !== customer.id);
        }
      }
    )  
  }



} 
