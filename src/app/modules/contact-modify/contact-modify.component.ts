import { Component, OnInit } from '@angular/core';
import { IContact } from '../../core/models/contact.model';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  form!: FormGroup;

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

    forkJoin(sources).subscribe(responseList => {
      this.contact = responseList[0] ? responseList[0] : {} as IContact

      this.initForm();
    });
  }

  initForm(): void {
  }
}
