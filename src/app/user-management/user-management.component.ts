import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  roles = [
    {name:'Admin',value:1},
    {name:'Sub Admin',value:2},
    {name:'Super User',value:3},
    {name:'Normal User',value:4},
    {name:'Publisher',value:5},
  ]
  API_URL: string = 'http://localhost:5000';
  userData = [];
  userFormHide: boolean = false;
  userDetailhide: boolean = false;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllUser()
  }
  adduserForm: FormGroup = this.fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email : ['', [Validators.required, Validators.email]],
    user_role:['',[Validators.required]],
    aoi:[''],
    password:['',Validators.required]
  })

  addUser() {
    console.log(this.adduserForm.value)
    let user = this.adduserForm.value

    return this.httpClient.post<any>(`${this.API_URL}/api/users/add`, user)
    .subscribe((res: any) => {
      console.log(res)
      if(res.status){
        this.toastr.success('Hello world!', 'Toastr fun!');
        this.adduserForm.reset();
        window.location.reload();
      }else{
        this.toastr.error('Error!', 'Toastr fun!');
      }
    })
  }

  getAllUser(){
    return this.httpClient.get<any>(`${this.API_URL}/api/users/get-alluser`)
    .subscribe((res: any) => {
      console.log(res.data)
        this.userData = res.data
    })
  }

  userForm(){
    this.userFormHide = !this.userFormHide
  }

  userDetail(){
    this.userDetailhide = !this.userDetailhide
  }
}