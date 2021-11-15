import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DeleteDialogData {
  title: string,
  message: string
}

@Component({
  selector: 'atenea-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DeleteDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: DeleteDialogData) { }
}
