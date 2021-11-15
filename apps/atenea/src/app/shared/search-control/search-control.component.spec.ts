import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchControlComponent } from './search-control.component';

describe('SearchControlComponent', () => {
  let component: SearchControlComponent;
  let fixture: ComponentFixture<SearchControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit empty when input is cleared', () => {
    component.search.emit = jest.fn();
    component.clear();

    expect(component.query).toBe('');
    expect(component.search.emit).toHaveBeenCalledWith('');
  });
});
