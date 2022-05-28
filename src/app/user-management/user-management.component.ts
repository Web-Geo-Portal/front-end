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
    {name:'Administrator',value:1},
    {name:'Sub Administrator',value:2},
    {name:'Normal User',value:3},
    {name:'Super User',value:4},
    {name:'Publisher',value:5},
  ]
  API_URL: string = 'http://localhost:5000';
  userData = [];
  userFormHide: boolean = false;
  userDetailhide: boolean = false;
  passwordValidate: boolean = false;
  userCreated: boolean = false;
  aoiData = [];
  selectedAreaofintrest :string;
  userEmail: any;
  userPassword: any;
  srcResult: any;
  backgroundImage: string = '';
  logoImage: string = '';
  image: any;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllUser();
    this.getAoiData();
  }
  adduserForm: FormGroup = this.fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email : ['', [Validators.required, Validators.email]],
    user_role:['',[Validators.required]],
    geom:['',[Validators.required]],
    password:['',Validators.required]
  })

  slectedAoi(e){
    this.selectedAreaofintrest = e
  }
  addUser() {
    // console.log(this.adduserForm.value)
    let user = this.adduserForm.value
    user['aoi'] = this.selectedAreaofintrest

    return this.httpClient.post<any>(`${this.API_URL}/api/users/add`, user)
    .subscribe((res: any) => {
      console.log(res)
      if(res.status){
        this.toastr.success('User Created Successfully!');
        this.adduserForm.reset();
        this.userCreated = true;
        this.userFormHide = false;
        this.userDetailhide = false;
        this.userEmail = res.newUser.rows[0].user_email;
        this.userPassword = res.temp_password;
        // window.location.reload();
      }else{
        this.toastr.error('Error!', 'Toastr fun!');
      }
    })
  }

  getAllUser(){
    return this.httpClient.get<any>(`${this.API_URL}/api/users/get-alluser`)
    .subscribe((res: any) => {
        this.userData = res.data
    })
  }

  getAoiData(){
    return this.httpClient.get<any>(`${this.API_URL}/api/data/get-aoi`)
    .subscribe((res: any) => {
      // console.log(res.data)
      let temp = []
      res.data.forEach(e => {
        temp.push({'name':e.Name , 'value':e.geom})
      })
      this.aoiData = temp ;
      // console.log(this.aoiData)
    })
  }

  userForm(){
    this.userFormHide = !this.userFormHide
    this.userCreated = false;
  }

  userDetail(){
    this.userDetailhide = !this.userDetailhide
    this.userCreated = false;
  }

  validatePassword(){
    // console.log(this.passwordValidate)
    let password = this.adduserForm.value.password;
    var regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(!regularExpression.test(password)) {
      this.passwordValidate = false;
    }else{
      this.passwordValidate = true;
    }
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    // console.log("sadasda",inputNode)
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
      this.image = inputNode.files[0]
      this.backgroundImage = inputNode.files[0].name
    }
  }

  onLogoSelected() {
    const inputNode: any = document.querySelector('#logo');
    console.log("sadasda",inputNode)
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
      this.logoImage = inputNode.files[0].name
    }
  }

  // saveLogo(){
  //   // console.log(this.image)
  //   let formData = new FormData();
  //     formData.append('file', this.image);
  //     console.log(formData)
  //   return this.httpClient.post<any>(`${this.API_URL}/api/data/upload`, formData)
  //   .subscribe((res: any) => {
      
  //   })
  // }
}
