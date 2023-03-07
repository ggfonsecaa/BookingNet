import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerExpandComponent } from './drawer-expand.component';

describe('DrawerExpandComponent', () => {
  let component: DrawerExpandComponent;
  let fixture: ComponentFixture<DrawerExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerExpandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
