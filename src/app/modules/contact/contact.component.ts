import { Component, OnInit } from '@angular/core';
import { IContact } from '../../core/models/contact.model';
import { ContactApiService } from '../../core/http/contact-api.service';

@Component({
  selector: 'inf-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contacts: IContact[] = [];

  constructor(
    private contactApiSvc: ContactApiService
  ) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contactApiSvc.getContacts().subscribe(result => {
      this.contacts = result
    });
  }
}
