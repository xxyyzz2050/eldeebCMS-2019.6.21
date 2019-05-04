import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EldeebComponent } from './eldeeb.component';

describe('EldeebComponent', () => {
  let component: EldeebComponent;
  let fixture: ComponentFixture<EldeebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EldeebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EldeebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
