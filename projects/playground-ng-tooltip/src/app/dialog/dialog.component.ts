import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: 'dialog.component.html',
})
export class NgTooltipDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NgTooltipDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
