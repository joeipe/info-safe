import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../core/http/auth-api.service';
import { IClaim } from '../../core/models/user.model';

@Component({
  selector: 'inf-auth-details',
  templateUrl: './auth-details.component.html',
  styleUrl: './auth-details.component.scss'
})
export class AuthDetailsComponent implements OnInit {
  claims: IClaim[];
  loading: boolean = false;

  constructor(
    private authApiSvc: AuthApiService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getClaims();
  }

  getClaims() {
    this.authApiSvc.getClaims().subscribe(result => {
      this.claims = result;
      this.loading = false;
    });
  }
}
