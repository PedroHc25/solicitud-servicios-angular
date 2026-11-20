import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-solicitud-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './solicitud-form.html',
  styleUrl: './solicitud-form.css'
})
export class SolicitudForm {

  solicitudForm: FormGroup;
  enviado = false;

  servicios = [
    'Cableado estructurado',
    'Fibra óptica',
    'Videovigilancia CCTV',
    'Instalaciones eléctricas',
    'Control de acceso'
  ];

  constructor(private fb: FormBuilder) {

    this.solicitudForm = this.fb.group({

      nombre: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      correo: ['', [
        Validators.required,
        Validators.email
      ]],

      telefono: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{9}$/)
      ]],

      servicio: ['', [
        Validators.required
      ]],

      descripcion: ['', [
        Validators.required,
        Validators.minLength(10)
      ]]

    });
  }

  enviarSolicitud(): void {

    this.enviado = true;

    if (this.solicitudForm.invalid) {
      this.solicitudForm.markAllAsTouched();
      return;
    }

    console.log(
      'Solicitud registrada:',
      this.solicitudForm.value
    );

    alert('¡Solicitud registrada correctamente!');

    this.solicitudForm.reset();
    this.enviado = false;
  }
}
