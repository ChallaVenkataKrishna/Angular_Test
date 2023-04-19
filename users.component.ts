import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule, RequiredValidator} from '@angular/forms';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
// Material components
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//Services
import { UserService } from "../../_services/user_service";
//Store
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../../_state/users/users-reducer';

@Component({
  selector: "app-users",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [UserService],
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent {
  userInfo: Array<any> = [];
  dataForm!:FormGroup;
  panelOpenState: boolean = false;
  showLoader: boolean = false;
  constructor(private service: UserService) {}

  ngOnInit() {
    let form:any  = {};
    
    this.service.getUserInfo().subscribe(
      (data: any) => {
        this.userInfo = data["users"];
        console.log(this.userInfo);
        for(let i=0;i<this.userInfo.length;i++) {
          form["firstName"+i] = new FormControl(this.userInfo[i].firstName);
          form["lastName"+i] = new FormControl(this.userInfo[i].lastName);
          form["email"+i] = new FormControl(this.userInfo[i].email);
          form["postalCode"+i] = new FormControl(this.userInfo[i].address.postalCode);
        }
        this.dataForm = new FormGroup(form);
      },
      (error) => {}
    );
  }

  onSubmit(){
    console.log(this.dataForm);
  }

  setDetails( name: any, value: any) {
    this.dataForm.setValue({ name: value});  
  }
  saveData(index: any) {
    this.showLoader = true;
    setTimeout(()=> {
      this.userInfo[index].firstName = this.dataForm.controls['firstName'+index].value;
      this.userInfo[index].lastName = this.dataForm.controls['lastName'+index].value;
      this.userInfo[index].email = this.dataForm.controls['email'+index].value;
      this.userInfo[index].postalCode = this.dataForm.controls['postalCode'+index].value;
      console.log(this.userInfo[index]);
      this.showLoader = false;
    },2000)

  }
}
