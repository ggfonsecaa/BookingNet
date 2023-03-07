import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerExpandMinimizedComponent } from './drawer-expand-minimized.component';

describe('DrawerExpandMinimizedComponent', () => {
  let component: DrawerExpandMinimizedComponent;
  let fixture: ComponentFixture<DrawerExpandMinimizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerExpandMinimizedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerExpandMinimizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
