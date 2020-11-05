import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  token: string;
  constructor(
    private router: Router
  ) { }
  ngOnInit(): void {
  }

  verifyUser() {
    this.token = localStorage.getItem('access_token');
    if (this.token != "" && this.token != undefined) {

    } else {
      this.router.navigate(['/login'])
    }
  }
}
