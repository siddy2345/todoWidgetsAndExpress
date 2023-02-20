import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTodoComponent } from './simple-todo.component';

describe('SimpleTodoComponent', () => {
  let component: SimpleTodoComponent;
  let fixture: ComponentFixture<SimpleTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleTodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
