import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserResponse } from '../types/user-response.type';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit {
  public data?: any | [] = [];
  public columns?: string[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      this.data = await this.userService.getUsers();

      this.columns = Object.keys(this.data[0]);

      this.columns.splice(0, 1, 'Ações');
    } catch (error) {
      console.log('oi');
    }
  }

  async updateStatus(userId: string, checked: boolean): Promise<void> {
    try {
      await this.userService.updateUserStatus(userId, !checked);

      this.handleStatusUpdate(userId);

      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  handleStatusUpdate(userId: string): void {
    const userRow = this.data.find((user: UserResponse) => userId === user.id);
    userRow.Status = !userRow.Status;
  }
}
