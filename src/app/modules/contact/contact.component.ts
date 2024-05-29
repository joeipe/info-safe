import { Component, OnInit } from '@angular/core';
import { IContact } from '../../core/models/contact.model';
import { ContactApiService } from '../../core/http/contact-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'inf-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contacts: IContact[] = [];
  loading: boolean = false;

  constructor(
    private router: Router,
    private contactApiSvc: ContactApiService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getContacts();
  }

  getContacts() {
    this.contactApiSvc.getContacts().subscribe(result => {
      this.contacts = result;
      this.loading = false;
    });
  }

  onModifyClick(id: number) {
    this.router.navigate([`/contact`, id]);
  }
}
