import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { UserLogin } from '../../modals/user';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
// export class LoginComponent { }
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  username: string;
  password: string;
  constructor(
    private router: Router,
    private authSevice: AuthServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {

    this.loginFormGroup = this.createLoginFormGroup();
  }
  ngOnInit() {
    
  }


  createLoginFormGroup(): FormGroup {
    return this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onClickLogin() {
    localStorage.clear();
    this.username = this.loginFormGroup.get('userName').value;
    this.password = this.loginFormGroup.get('password').value;
    const user = new UserLogin(this.username, this.password);
    this.authSevice.login(user).subscribe(
      resp => {
        const token = resp.headers.get('Authorization')
          ? resp.headers.get('Authorization').substring(7)
          : resp.headers.get('authorization').substring(7);
        localStorage.setItem('access_token', token);
        this.getUserDetails();

      },
      err => {

      this.toastr.error(err.error.message)
      }
    );

  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}
  getUserDetails() {
    this.authSevice.getUser().subscribe(
      resp => {
        let { payload } = resp;
    
        localStorage.setItem('firstName', payload.firstName);
        
        this.router.navigate(['/dashboard'])

        
      },
      err => {
   this.toastr.error(err.error.message);
      }
    );
  }
}

