import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoWidgetsComponent } from './todo-widgets.component';

describe('TodoWidgetsComponent', () => {
  let component: TodoWidgetsComponent;
  let fixture: ComponentFixture<TodoWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoWidgetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
