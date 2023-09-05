import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{
  user:User;

  constructor(
    private userService: UserService, 
    private router: Router, 
    private route:ActivatedRoute
    ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if(id !== undefined) {
        this.userService.GetUser(id).subscribe(
          (res) => {
            this.user = res;
          }
        );
      }
    });
  }
  SaveData(form: NgForm): void {
    if(form.valid) {
      if(this.user._id !== undefined) {
        this.userService.UpdateUser(this.user).subscribe(
          (res) => {
            if(res.status === 200) {
              this.router.navigate(['/']);
              alert("User Updated Successfully");
            }
          }
        );
      }else {
        this.userService.AddUser(this.user).subscribe(
        (res) => {
          if(res.status == 201) {
            this.router.navigate(['/']);
            alert("User Created Successfully");
            
          }
        }
      );
      }
    }
  }
}
