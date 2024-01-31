import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary form-related modules
import { CrudApiService } from 'src/app/services/crud-api.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: any;
  @Input() action!: string;
  @Output() onSaveComplete: EventEmitter<any> = new EventEmitter();
  customerForm!: FormGroup ; // Declare the FormGroup

  constructor(public activeModal: NgbActiveModal, private customerService: CrudApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      id:[this.customer?.id ||''],
      name: [this.customer?.name || '', Validators.required],
      email: [this.customer?.email || '', Validators.required],
      phone:[this.customer?.phone || '', Validators.required], 
    });
  }

  onSave() {
    if (this.customerForm.valid) {
      
      const formData = this.customerForm.value; 
      if(this.action=="edit"){
        this.customerService.updateCustomer(this.customer.id, formData).subscribe(
          {
            next: (data) => {
              this.onSaveComplete.emit({ action: 'update', data });
              this.activeModal.close('update');
            },
            error: (error) => console.error(error),
          }
        );
      }
      else{
       
        
        this.customerService.createCustomer(formData).subscribe(
          {
            next: (data) => {
              this.onSaveComplete.emit({ action: 'add', data });

              this.activeModal.close('add');
            },
            error: (error) => console.error(error),
          }
        )
      }

    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

  onClose() {
    this.activeModal.dismiss('Close');
  }
}
