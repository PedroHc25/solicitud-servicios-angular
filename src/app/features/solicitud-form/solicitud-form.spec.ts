import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { SolicitudForm } from './solicitud-form';

describe('SolicitudForm', () => {
    let fixture: ComponentFixture<SolicitudForm>;
    let componente: SolicitudForm;

    const datosValidos = {
        nombre: 'Ana Torres',
        correo: 'ana@correo.com',
        telefono: '987654321',
        servicio: 'Fibra óptica',
        descripcion: 'Necesito instalar fibra óptica en mi oficina.',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SolicitudForm],
        }).compileComponents();

        fixture = TestBed.createComponent(SolicitudForm);
        componente = fixture.componentInstance;
        fixture.detectChanges();
    });

    // 1. Creación correcta del componente
    it('se crea el componente correctamente', () => {
        expect(componente).toBeTruthy();
    });

    // 2. Formulario inválido cuando no se ingresan datos requeridos
    it('el formulario es inválido cuando no se ingresan los datos requeridos', () => {
        const controles = componente.solicitudForm.controls;

        expect(componente.solicitudForm.invalid).toBe(true);
        expect(controles['nombre'].hasError('required')).toBe(true);
        expect(controles['correo'].hasError('required')).toBe(true);
        expect(controles['telefono'].hasError('required')).toBe(true);
        expect(controles['servicio'].hasError('required')).toBe(true);
        expect(controles['descripcion'].hasError('required')).toBe(true);
    });

    // 3. Validación incorrecta de uno de los campos
    it('el correo con formato incorrecto es inválido', () => {
        componente.solicitudForm.setValue({ ...datosValidos, correo: 'ana.correo.com' });

        expect(componente.solicitudForm.controls['correo'].hasError('email')).toBe(true);
        expect(componente.solicitudForm.invalid).toBe(true);
    });

    // 4. Validación de una segunda regla de negocio
    it('el teléfono debe tener exactamente 9 dígitos', () => {
        componente.solicitudForm.setValue({ ...datosValidos, telefono: '12345' });

        expect(componente.solicitudForm.controls['telefono'].hasError('pattern')).toBe(true);
    });

    it('la descripción debe tener al menos 10 caracteres', () => {
        componente.solicitudForm.setValue({ ...datosValidos, descripcion: 'corta' });

        expect(componente.solicitudForm.controls['descripcion'].hasError('minlength')).toBe(true);
    });

    // 5. Formulario válido cuando todos los datos cumplen las condiciones
    it('el formulario es válido cuando todos los datos cumplen las condiciones', () => {
        componente.solicitudForm.setValue(datosValidos);

        expect(componente.solicitudForm.valid).toBe(true);
    });

    // Envío
    it('no envía la solicitud cuando el formulario es inválido', () => {
        const alerta = vi.spyOn(window, 'alert').mockImplementation(() => { });

        componente.enviarSolicitud();

        expect(alerta).not.toHaveBeenCalled();
        expect(componente.solicitudForm.controls['nombre'].touched).toBe(true);
        alerta.mockRestore();
    });

    it('envía la solicitud y limpia el formulario cuando es válido', () => {
        const alerta = vi.spyOn(window, 'alert').mockImplementation(() => { });
        const registro = vi.spyOn(console, 'log').mockImplementation(() => { });
        componente.solicitudForm.setValue(datosValidos);

        componente.enviarSolicitud();

        expect(alerta).toHaveBeenCalledTimes(1);
        expect(componente.solicitudForm.controls['nombre'].value).toBeFalsy();
        alerta.mockRestore();
        registro.mockRestore();
    });

    // Plantilla: el mensaje de error aparece en pantalla
    it('muestra el mensaje de error del correo al intentar enviar vacío', () => {
        const boton = fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
        boton.click();
        fixture.detectChanges();

        const errores = Array.from(fixture.nativeElement.querySelectorAll('.error')) as HTMLElement[];
        expect(errores.some((e) => e.textContent?.includes('El correo es obligatorio'))).toBe(true);
    });
});
