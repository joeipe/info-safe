import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'info-safe';
  loginDisplay = false;

  constructor(
    private modalService: NgbModal,
    private authService: MsalService) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  onLoginClick() {
    console.log('login clicked');
    this.authService.loginPopup({
      scopes: ['api://6bc1a37b-da3e-4b89-b621-c75c8eebee0a/FullAccess']
    })
      .subscribe({
        next: (result) => {
          console.log(result);
          this.setLoginDisplay();

          localStorage.setItem("webApiAccessToken", result.accessToken);

          /*
            const accounts = this.authService.instance.getAllAccounts();
            if (accounts.length > 0) {
              this.authService.instance.setActiveAccount(accounts[0]);
              console.log(accounts[0]);
            }
  
            this.authService.acquireTokenSilent({
              scopes: ['api://6bc1a37b-da3e-4b89-b621-c75c8eebee0a/.default'],
              account: accounts[0]
            }).subscribe(accessTokenResponse => {
              console.log(`Bearer ${accessTokenResponse.accessToken}`);
            });
          */
        },
        error: (error) => console.log(error)
      });
  }

  onLogoutClick() {
    console.log('logout clicked');
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
    localStorage.removeItem("webApiAccessToken")
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}
