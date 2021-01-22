import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastrService: NbToastrService) {}

  showToast(position, status, title, message) {
    this.toastrService.show(message, title, {
      position: position,
      status: status,
      duration: 1000,
      toastClass: status,
    });
  }
}
