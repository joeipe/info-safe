import { Component, OnInit } from '@angular/core';
import { IAddress, IContact, IEmailAddress, IPhoneNumber } from '../../core/models/contact.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stateTypeValues } from '../../core/value-types/state.type';
import { ActivatedRoute } from '@angular/router';
import { ContactApiService } from '../../core/http/contact-api.service';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'inf-contact-modify',
  templateUrl: './contact-modify.component.html',
  styleUrl: './contact-modify.component.scss'
})
export class ContactModifyComponent implements OnInit {
  contact!: IContact;
  id!: number;
  action!: string;
  loading: boolean = false;
  basicForm!: FormGroup;
  addressForm!: FormGroup;
  phoneNumberForm!: FormGroup;
  emailAddressesForm!: FormGroup;

  stateTypes = stateTypeValues;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private contactApiSvc: ContactApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      this.id = +params['id']
    )

    if (this.id == 0) {
      this.action = "Add";
    } else {
      this.action = "Edit";
    }

    let sources = [
      this.action === "Edit" ? this.contactApiSvc.getContactById(this.id) : of(null)
    ];

    this.loading = true;
    forkJoin(sources).subscribe(responseList => {
      this.contact = responseList[0] ? responseList[0] : {} as IContact;

      this.initBasicForm();
      this.initAddressForm();
      this.initPhoneNumberForm();
      this.initEmailAddressesForm();

      this.loading = false;
    });
  }

  initBasicForm(): void {
    this.basicForm = this.formBuilder.nonNullable.group({
      id: [this.contact?.id],
      firstName: [this.contact?.firstName, [Validators.required]],
      lastName: [this.contact?.lastName, [Validators.required, Validators.minLength(3)]],
      doB: [this.contact?.doB, [Validators.required]],
    });
  }

  initAddressForm(): void {
    this.addressForm = this.formBuilder.nonNullable.group({
      id: [this.contact?.address?.id],
      contactId: [this.contact?.address?.contactId],
      address1: [this.contact?.address?.address1, [Validators.required]],
      address2: [this.contact?.address?.address2],
      address3: [this.contact?.address?.address3],
      city: [this.contact?.address?.city, [Validators.required]],
      state: [this.contact?.address?.state, [Validators.required]],
      country: [this.contact?.address?.country, [Validators.required]],
      postalCode: [this.contact?.address?.postalCode, [Validators.required]]
    });
  }

  initPhoneNumberForm(): void {
    this.phoneNumberForm = this.formBuilder.nonNullable.group({
      id: [this.contact?.phoneNumber?.id],
      contactId: [this.contact?.phoneNumber?.contactId],
      mobile: [this.contact?.phoneNumber?.mobile, [Validators.required]],
      business: [this.contact?.phoneNumber?.business],
      work: [this.contact?.phoneNumber?.work]
    });
  }

  initEmailAddressesForm(): void {
    this.emailAddressesForm = this.formBuilder.nonNullable.group({
      emailAddresses: this.formBuilder.array(this.createAddressesArray())
    });
  }

  createAddressesArray(): FormGroup[] {
    let controls: FormGroup[] = [];
    if (this.contact?.emailAddresses) {
      this.contact?.emailAddresses.forEach(item =>
        controls.push(this.createAddressGroup(item))
      );
    }
    return controls;
  }

  createAddressGroup(emailAddress: IEmailAddress | null) {
    if (emailAddress) {
      return this.formBuilder.group({
        id: [emailAddress.id],
        contactId: [emailAddress.contactId],
        email: [emailAddress.email, [Validators.required]],
      });
    }
    else {
      return this.formBuilder.group({
        id: [0],
        contactId: [this.id],
        email: [null, [Validators.required]],
      });
    }
  }

  onAddEmailAddressClick() {
    var arrayControl = this.emailAddressesForm.get('emailAddresses') as FormArray;
    arrayControl.push(this.createAddressGroup(null));
  }

  getContactById() {
    this.loading = true;
    this.contactApiSvc.getContactById(this.id).subscribe(result => {
      this.contact = result;
      this.loading = false;
    });
  }

  onBasicSaveClick() {
    let updateContact: IContact = <IContact>this.basicForm.value;
    updateContact.address = this.contact.address;
    updateContact.emailAddresses = this.contact.emailAddresses;
    updateContact.phoneNumber = this.contact.phoneNumber;
    this.contactApiSvc.saveContact(updateContact).subscribe(() => {
      this.getContactById();
    });
  }

  onAddressSaveClick() {
    let updateContact = this.contact;
    updateContact.address = <IAddress>this.addressForm.value;
    this.contactApiSvc.saveContact(updateContact).subscribe(() => {
      this.getContactById();
    });
  }

  onPhoneNumberSaveClick() {
    let updateContact = this.contact;
    updateContact.phoneNumber = <IPhoneNumber>this.phoneNumberForm.value;
    this.contactApiSvc.saveContact(updateContact).subscribe(() => {
      this.getContactById();
    });
  }

  onEmailAddressesSaveClick() {
    let updateContact = this.contact;
    updateContact.emailAddresses = <IEmailAddress[]>this.emailAddressesForm.value?.emailAddresses;
    this.contactApiSvc.saveContact(updateContact).subscribe(() => {
      this.getContactById();
    });
  }

  get firstName() {
    return this.basicForm.get('firstName');
  }

  get lastName() {
    return this.basicForm.get('lastName');
  }

  get doB() {
    return this.basicForm.get('doB');
  }

  get emailAddresses() {
    return this.emailAddressesForm.get('emailAddresses');
  }

  get emailAddressesControls() {
    var arrayControl = this.emailAddressesForm.get('emailAddresses') as FormArray;
    return arrayControl.controls;
  }
}
