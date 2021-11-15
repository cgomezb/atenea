import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'atenea-search-control',
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchControlComponent {
  @Output() search = new EventEmitter<string>();

  query = '';

  clear(): void {
    this.query = '';
    this.search.emit('');
  }
}
