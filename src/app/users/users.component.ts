import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users!: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.GetUsers().subscribe(res => {
      this.users = res;
    });
  }
  deleteUser(id: string) {
    if(confirm("Are you sure to delete this user?")) {
      this.userService.DeleteUser(id).subscribe(res => {
      if(res.status === 200) {
        alert("User Deleted Successfully");

        for(let i = 0; i < this.users.length; ++i) {
          if(this.users[i]._id === id) {
            this.users.splice(i, 1);
            break;
          }
        }
      }
    });
    } 
  }
}
