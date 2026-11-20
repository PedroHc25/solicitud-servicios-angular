import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudForm } from './solicitud-form';

describe('SolicitudForm', () => {
    let component: SolicitudForm;
    let fixture: ComponentFixture<SolicitudForm>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SolicitudForm],
        }).compileComponents();

        fixture = TestBed.createComponent(SolicitudForm);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // PRUEBA 1: Verificar que el componente se crea
    it('debería crear el componente', () => {
        expect(component).toBeTruthy();
    });

    // PRUEBA 2: Verificar que el formulario inicia vacío e inválido
    it('debería iniciar con el formulario inválido', () => {
        expect(component.solicitudForm.invalid).toBe(true);
    });

    // PRUEBA 3: Verificar que el nombre es obligatorio
    it('debería validar que el nombre sea obligatorio', () => {
        const nombre = component.solicitudForm.get('nombre');

        expect(nombre?.hasError('required')).toBe(true);
    });

    // PRUEBA 4: Verificar el formato del correo
    it('debería rechazar un correo electrónico inválido', () => {
        const correo = component.solicitudForm.get('correo');

        correo?.setValue('pedro123');

        expect(correo?.hasError('email')).toBe(true);
    });

    // PRUEBA 5: Verificar que el teléfono tenga nueve dígitos
    it('debería rechazar un teléfono que no tenga nueve dígitos', () => {
        const telefono = component.solicitudForm.get('telefono');

        telefono?.setValue('99428');

        expect(telefono?.hasError('pattern')).toBe(true);
    });

    // PRUEBA 6: Verificar la longitud mínima de la descripción
    it('debería rechazar una descripción menor a diez caracteres', () => {
        const descripcion = component.solicitudForm.get('descripcion');

        descripcion?.setValue('Servicio');

        expect(descripcion?.hasError('minlength')).toBe(true);
    });

    // PRUEBA 7: Verificar que todos los datos válidos sean aceptados
    it('debería aceptar los datos correctos del formulario', () => {
        component.solicitudForm.setValue({
            nombre: 'Pedro Huayanay',
            correo: 'pedro@gmail.com',
            telefono: '987654321',
            servicio: 'Cableado estructurado',
            descripcion: 'Solicito instalación de cableado de red',
        });

        expect(component.solicitudForm.valid).toBe(true);
    });

    // PRUEBA 8: Verificar que el envío marque los campos obligatorios
    it('debería marcar los campos como tocados si el formulario es inválido', () => {
        component.enviarSolicitud();

        expect(component.solicitudForm.invalid).toBe(true);
        expect(component.solicitudForm.get('nombre')?.touched).toBe(true);
    });
});