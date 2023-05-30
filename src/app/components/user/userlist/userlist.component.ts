import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../service/notification.service';
import { AllUsers } from '../types/user-response.type';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit {
  public data?: any | [] = [];
  public columns?: string[];
  public showModal = false;
  public userId = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private notification: NotificationService
  ) {}

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

  async deleteUser(): Promise<void> {
    try {
      await this.userService.deleteUser(this.userId);
      this.handleDeleteUser(this.userId);
    } catch (error) {
      console.log(error);
    } finally {
      this.showModal = false;
    }
  }

  handleStatusUpdate(userId: string): void {
    const userRow = this.data.find((user: AllUsers) => userId === user.id);
    userRow.Status = !userRow.Status;
    this.notification.message({
      message: `Usuário ${userRow.Status ? 'Ativado' : ' Desativado'}`,
    });
  }

  handleDeleteUser(userId: string): void {
    const userIndex = this.data.findIndex(
      (user: AllUsers) => userId === user.id
    );

    if (userIndex >= 0) {
      this.data.splice(userIndex, 1);
      this.notification.message({
        message: `Usuário deletado`,
      });
      return;
    }
  }

  handleEdit(id: string) {
    this.router.navigateByUrl(`/admin/usuarios/editar/${id}`);
  }

  openModal(id: string) {
    this.userId = id;
    this.showModal = true;
  }

  closeModal() {
    this.userId = '';
    this.showModal = false;
  }
}
