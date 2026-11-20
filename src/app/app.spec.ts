import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { routes } from './app.routes';
import { SolicitudForm } from './features/solicitud-form/solicitud-form';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('se crea la aplicación', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('tiene una ruta propia /solicitud que muestra el formulario', async () => {
    const harness = await RouterTestingHarness.create();
    const componente = await harness.navigateByUrl('/solicitud', SolicitudForm);

    expect(componente).toBeTruthy();
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Solicitud de Servicios Técnicos',
    );
  });
});
