import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerExpandMaximizedComponent } from './drawer-expand-maximized.component';

describe('DrawerExpandMaximizedComponent', () => {
  let component: DrawerExpandMaximizedComponent;
  let fixture: ComponentFixture<DrawerExpandMaximizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerExpandMaximizedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerExpandMaximizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
