import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasTabelaComponent } from './pessoas-tabela.component';

describe('PessoasTabelaComponent', () => {
  let component: PessoasTabelaComponent;
  let fixture: ComponentFixture<PessoasTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoasTabelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoasTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
