import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormControl, Validators } from '@angular/forms';
import { NotificacaoComponent } from './notificacao.component';

describe('NotificacaoComponent', () => {
  let component: NotificacaoComponent;
  let fixture: ComponentFixture<NotificacaoComponent>;
  let debugElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacaoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacaoComponent);
    component = fixture.componentInstance;
    debugElement = fixture.nativeElement;

    component.conteudoMensagem = new FormControl<string>('', {
      validators: Validators.required,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty notification list', () => {
    expect(component.notificacoes.length).toBe(0);
  });

  it('should render the form control', () => {
    const inputElement = debugElement.querySelector('input');
    expect(inputElement).toBeTruthy();
  });

  it('should not submit when form is invalid', () => {
    const submitButton = debugElement.querySelector('button');
    expect(submitButton).toBeTruthy();

    submitButton?.click();
    fixture.detectChanges();

    expect(component.notificacoes.length).toBe(0);
  });

  it('should not render li when no notifications are present', () => {
    const liElements = debugElement.querySelectorAll('li');
    expect(liElements.length).toBe(0);
  });

  it('should show li when notification is added', () => {
    component.notificacoes = [
      {
        mensagemId: '1234',
        conteudoMensagem: 'Test notification',
        status: 'AGUARDANDO PROCESSAMENTO',
      },
    ];
    fixture.detectChanges();

    const liElements = debugElement.querySelectorAll('li');
    expect(liElements.length).toBe(1);
    expect(liElements[0].textContent).toContain('Test notification');
  });
});
