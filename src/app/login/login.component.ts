import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = false;
  API_URL: string = 'http://localhost:5000';
  captchaString: string = "";
  captchaTrue: boolean = false;
  value = "";
  passwordvalue = "";
  captchavalue = "";
  keyboard!: Keyboard;
  selectedField: any;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    public router: Router
    ) {
  }

  ngOnInit() {
    this.getCaptch();
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    captcha : ['', [Validators.required]]
  })


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }

  loginUser(){
    // console.log(this.loginForm.value)
    let user = this.loginForm.value
    return this.httpClient.post<any>(`${this.API_URL}/api/auth/login`, user)
      .subscribe((res: any) => {
        if(res.status){
          localStorage.setItem('access_token', res.token.accessToken)
          localStorage.setItem('email', res.users.rows[0].user_email)
          const now = new Date()
          let expdate =  new Date(now.getTime() + res.expiresIn*1000);
          localStorage.setItem('session_expires', expdate.toISOString())
          this.router.navigate(['/base-map']);
        }else{
          console.log(res.error)
        }

      })
  }


  getCaptch(){
    this.captchaString = "";
    
    let allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
                     'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
                     'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                     't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 6; i++) { //getting 6 random characters from the array
      let randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
      this.captchaString += ` ${randomCharacter}`;
    }
    return this.captchaString
  }

  checkCaptcha(){
    
    let inputField =  this.loginForm.value['captcha'];
    if(inputField.split('').join(' ') == this.captchaString.replace(" ",'')){
      this.captchaTrue = true;
    }else{
      this.captchaTrue = false;
    }
  }



  onChange(input: string ) {
    if(this.selectedField == 'email'){
      this.value = input;
    }else if(this.selectedField == 'password'){
      this.passwordvalue = input;
    }else if(this.selectedField == 'captcha'){
      this.captchavalue = input;
    }
    
    console.log("Input changed", input);
  };

  onKeyPress(button: string) {
    // console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange(event: any){

    this.keyboard.setInput(event.target.value);
  };

  
  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  getInputType(e){
    console.log(e)
    this.selectedField = e
  }
  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input  => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }
}