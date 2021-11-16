import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'atenea-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserDialogComponent implements OnInit {
  public form: FormGroup;
  public avatars = [
    { name: 'Avatar 1', value: 1 },
    { name: 'Avatar 2', value: 2 },
    { name: 'Avatar 3', value: 3 },
    { name: 'Avatar 4', value: 4 }
  ];

  constructor(private dialogRef: MatDialogRef<CreateUserDialogComponent>) {}

  ngOnInit() {
    const [defaultAvatar] = this.avatars;

    this.form = new FormGroup({
      avatar: new FormControl(defaultAvatar.value),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
