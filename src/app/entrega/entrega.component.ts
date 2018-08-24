/**/
// import { EntregaService } from '../_services/entrega.service';
// import { TransporteService } from '../_services/transporte.service';
import { EntregaMockService as EntregaService } from '../_services/entrega-mock.service';
import { TransporteMockService as TransporteService } from '../_services/transporte-mock.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Entrega } from '../_models/Entrega';
import { EntregaForCreate } from '../_models/EntregaForCreate';
import { Transporte } from '../_models/Transporte';
import { Sucursal } from '../_models/Sucursal';
import { Cliente } from '../_models/Cliente';
import { AutoComplete } from '../_models/AutoComplete';
import { Router, ActivatedRoute } from '@angular/router';

declare let jQuery: any;

@Component({
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent implements OnInit {
  model: Entrega;
  modelForCreate: EntregaForCreate;
  form: FormGroup;

  mostrarMensajeExito: boolean;
  mensajeExito: string;
  mostrarMensajeError: boolean;
  mensajeError: string;

  mostrarRegresar: boolean;
  mostrarVerEntregas: boolean;

  loadIcon: boolean;

  configTransporte: AutoComplete;
  transporte: Transporte;
  transportes: Transporte[] = [];

  configRemitente: AutoComplete;
  remitente: Cliente;
  remitentes: Cliente[] = [];

  configDestinatario: AutoComplete;
  destinatario: Cliente;
  destinatarios: Cliente[] = [];

  configSucursalSalida: AutoComplete;
  sucursalSalida: Sucursal;
  sucursalesSalida: Sucursal[] = [];

  configSucursalLlegada: AutoComplete;
  sucursalLlegada: Sucursal;
  ucursalesLlegada: Sucursal[] = [];

  constructor(
    private entregaService: EntregaService,
    private transporteService: TransporteService,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    jQuery('.prime-sidebar').show();
    jQuery('.navbar-dashboard').show();
    this.createForm();
    this.setConfigTransporte();
    this.setConfigRemitente();
    this.setConfigDestinatario();
    this.setConfigSucursalSalida();
    this.setConfigSucursalLlegada();
    const param: string = this._route.snapshot.paramMap.get('id');
    if (param) {
      if (param.indexOf('T-') > -1) {
        this.loadTransporte(param);
        this.mostrarRegresar = true;
      } else {
        this.getEntrega(Number(param));
      }
      this.mostrarVerEntregas = true;
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      transporte: ['', Validators.required],
      remitente: ['', Validators.required],
      destinatario: ['', Validators.required],
      sucursalSalida: ['', Validators.required],
      sucursalLlegada: ['', Validators.required],
      fechaEntrega: [new Date(), Validators.required],
      horaEntrega: [new Date(), Validators.required],
      guiaRemitenteNroGuia: ['', Validators.required],
      guiaRemitenteNroBulto: ['', Validators.required],
    });
  }

  loadTransporte(numero: string) {
    /**/
    const id = numero.substring(4, 5);
    this.transporteService.getTransporte(Number(id))
    // this.transporteService.getTransportebyNumero(numero)
      .subscribe(response => {
        console.log(response);
        this.transporte = response;
        this.form.get('transporte').setValue(response.numero);
      }, error => {
        console.log(error);
      });
  }

  getEntrega(id: Number) {
    /**/
    this.entregaService.getEntrega(id)
      .subscribe(response => {
        console.log(response);
        this.loadEntregaForDisplay(response);
      }, error => {
        console.log(error);
      });
  }

  loadEntregaForDisplay(entrega: Entrega) {
    this.model = entrega;
    this.transporte = {
      id: entrega.transporteId,
      numero: entrega.transporteNumero,
      activo: true,
      vigente: true,
      fechaSalida: entrega.transporteFechaSalida,
      fechaLlegada: entrega.transporteFechaLlegada,
      tipo: null,
      sucursalSalidaId: entrega.transporteSucursalSalidaId,
      sucursalSalidaNombre: entrega.transporteSucursalSalidaNombre,
      sucursalSalidaDepartamento: entrega.transporteSucursalSalidaDepartamento,
      sucursalSalidaDireccion: null,
      sucursalLlegadaId: entrega.transporteSucursalLlegadaId,
      sucursalLlegadaNombre: entrega.transporteSucursalLlegadaNombre,
      sucursalLlegadaDepartamento: entrega.transporteSucursalLlegadaDepartamento,
      sucursalLlegadaDireccion: null,
      colaboradorChoferId: entrega.transporteColaboradorChoferId,
      colaboradorChoferNombre: entrega.transporteColaboradorChoferNombre,
      colaboradorChoferTipoDocumento: null,
      colaboradorChoferNroDocumento: null,
      colaboradorChoferNroLicencia: null,
      colaboradorAuxiliarId: entrega.tranpsorteColaboradorAuxiliarId,
      colaboradorAuxiliarNombre: entrega.tranpsorteColaboradorAuxiliarNombre,
      colaboradorAuxiliarTipoDocumento: null,
      colaboradorAuxiliarNroDocumento: null,
      colaboradorAuxiliarNroLicencia: null,
      vehiculoId: entrega.transporteVehiculoId,
      vehiculoPlaca: entrega.transporteVehiculoPlaca,
      vehiculoCarga: entrega.transporteVehiculoCarga,
      vehiculoVolumetria: entrega.transporteVehiculoVolumetria,
      vehiculoCodConfiguracion: null,
      vehiculoNroInscripcion: null,
      vehiculoMarca: null
    };
    this.remitente = {
      id: entrega.remitenteId,
      razonSocial: entrega.remitenteRazonSocial,
      ruc: entrega.remitenteRuc,
      direccion: entrega.remitenteDireccion,
      tipo: null // verificar si es necesario tener este valor
    };
    this.destinatario = {
      id: entrega.destinatarioId,
      razonSocial: entrega.destinatarioRazonSocial,
      ruc: entrega.destinatarioRuc,
      direccion: entrega.destinatarioDireccion,
      tipo: null // verificar si es necesario tener este valor
    };
    this.sucursalSalida = {
      id: entrega.sucursalSalidaId,
      nombre: entrega.sucursalSalidaNombre,
      departamento: entrega.sucursalSalidaDepartamento,
      direccion: entrega.sucursalSalidaDireccion
    };
    this.sucursalLlegada = {
      id: entrega.sucursalLlegadaId,
      nombre: entrega.sucursalLlegadaNombre,
      departamento: entrega.sucursalLlegadaDepartamento,
      direccion: entrega.sucursalLlegadaDireccion
    };
    this.form.get('transporte').setValue(entrega.transporteNumero);
    this.form.get('remitente').setValue(entrega.remitenteRazonSocial + ', ' + entrega.remitenteRuc);
    this.form.get('destinatario').setValue(entrega.destinatarioRazonSocial + ', ' + entrega.destinatarioRuc);
    this.form.get('sucursalSalida').setValue(entrega.sucursalSalidaNombre + ', ' + entrega.sucursalSalidaDepartamento
    + ', ' + entrega.sucursalSalidaDireccion);
    this.form.get('sucursalLlegada').setValue(entrega.sucursalLlegadaNombre + ', ' + entrega.sucursalLlegadaDepartamento
    + ', ' + entrega.sucursalLlegadaDireccion);
    this.form.get('fechaEntrega').setValue(new Date(entrega.fechaEntrega));
    this.form.get('horaEntrega').setValue(new Date(entrega.fechaEntrega));
    this.form.get('guiaRemitenteNroGuia').setValue(entrega.guiaRemitenteNroGuia);
    this.form.get('guiaRemitenteNroBulto').setValue(entrega.guiaRemitenteNroBulto);
  }

  save(): any {
    if (!this.form.valid) {
      this.markInputsAsDirty();
    } else {
      this.loadEntregaModelForSave();
      /**/
      this.create();
      // if (this.model) {
      //   this.update();
      // } else {
      //   this.create();
      // }
    }
  }

  create() {
    /**/
    this.entregaService.createEntrega(this.model)
    // this.entregaService.createEntrega(this.modelForCreate)
      .subscribe(response => {
        console.log(response);
        this.mostrarMensajeExito = true;
        this.mensajeExito = `<span class="fw-semi-bold">Se grabó exitosamente el Nro de Entrega ${response.numero}.</span>` +
          `<a class="btn btn-default btn-xs float-right mr-5" href="/entrega/${response.id}">Ver/Actualizar</a>` +
          `<a class="btn btn-default btn-xs float-right mr-5" href="/entrega">Grabar otra</a>`;
      }, error => {
        console.log(error);
        this.mostrarMensajeError = true;
        this.mensajeExito = `<span class="fw-semi-bold">Se produjo el siguiente error: ${error.message}.</span>`;
      });
  }

  update() {
    /**/
    this.entregaService.updateEntrega(this.model)
    // this.entregaService.updateEntrega(this.modelForCreate)
      .subscribe(response => {
        console.log(response);
        this.mostrarMensajeExito = true;
        this.mensajeExito = `<span class="fw-semi-bold">Se actualizó exitosamente el Nro de Entrega T-00${response.id}.</span>` +
          `<a class="btn btn-default btn-xs float-right mr-5" href="/entrega">Grabar otra</a>`;
      }, error => {
        console.log(error);
        this.mostrarMensajeError = true;
        this.mensajeExito = `<span class="fw-semi-bold">Se produjo el siguiente error: ${error.message}.</span>`;
      });
  }

  markInputsAsDirty() {
    this.form.get('transporte').markAsDirty();
    this.form.get('remitente').markAsDirty();
    this.form.get('destinatario').markAsDirty();
    this.form.get('sucursalSalida').markAsDirty();
    this.form.get('sucursalLlegada').markAsDirty();
    this.form.get('fechaEntrega').markAsDirty();
    this.form.get('horaEntrega').markAsDirty();
    this.form.get('guiaRemitenteNroGuia').markAsDirty();
    this.form.get('guiaRemitenteNroBulto').markAsDirty();
  }

  loadEntregaModelForSave() {
    const fEntrega: Date = this.form.get('fechaEntrega').value;
    const hEntrega: Date = this.form.get('horaEntrega').value;
    const entrega = new Date(fEntrega.getFullYear(), fEntrega.getMonth(), fEntrega.getDate(), hEntrega.getHours(), hEntrega.getMinutes());
    entrega.setHours(entrega.getHours() - 5);

    /**/

    // this.modelForCreate = new EntregaForCreate(
    //   this.model ? this.model.id : 0,
    //   null,                                            // el número de entrega se creará en el backend
    //   Number(this.transporte.id),
    //   Number(this.remitente.id),
    //   Number(this.destinatario.id),
    //   Number(this.sucursalSalida.id),
    //   Number(this.sucursalLlegada.id),
    //   entrega,
    //   String(this.form.get('guiaRemitenteNroGuia').value),
    //   Number(this.form.get('guiaRemitenteNroBulto').value)
    // );

    // MODELO para grabar en json-server
    const id = 4;
    this.model = new Entrega(
      this.model ? this.model.id : id,
      this.model ? this.model.numero : `E-00${id}`,
      null, // codBarraEntrega
      new Date(fEntrega.getFullYear(), fEntrega.getMonth(), fEntrega.getDate(), hEntrega.getHours(), hEntrega.getMinutes()),
      Number(this.transporte.id),
      this.transporte.numero,
      this.transporte.fechaSalida,
      this.transporte.fechaLlegada,
      this.transporte.sucursalSalidaId,
      this.transporte.sucursalSalidaNombre,
      this.transporte.sucursalSalidaDepartamento,
      this.transporte.sucursalLlegadaId,
      this.transporte.sucursalLlegadaNombre,
      this.transporte.sucursalLlegadaDepartamento,
      this.transporte.colaboradorChoferId,
      this.transporte.colaboradorChoferNombre,
      this.transporte.colaboradorAuxiliarId,
      this.transporte.colaboradorAuxiliarNombre,
      this.transporte.vehiculoId,
      this.transporte.vehiculoPlaca,
      this.transporte.vehiculoCarga,
      this.transporte.vehiculoVolumetria,
      Number(this.remitente.id),
      this.remitente.razonSocial,
      this.remitente.ruc,
      this.remitente.direccion,
      Number(this.destinatario.id),
      this.destinatario.razonSocial,
      this.destinatario.ruc,
      this.destinatario.direccion,
      Number(this.sucursalSalida.id),
      this.sucursalSalida.nombre,
      this.sucursalSalida.departamento,
      this.sucursalSalida.direccion,
      Number(this.sucursalLlegada.id),
      this.sucursalLlegada.nombre,
      this.sucursalLlegada.departamento,
      this.sucursalLlegada.direccion,
      0, // guiaRemitenteId
      null, // guiaRemitenteRutaGuia
      String(this.form.get('guiaRemitenteNroGuia').value),
      String(this.form.get('guiaRemitenteNroBulto').value),
      0, // guiaEntregaId
      null // guiaEntregaNroGuia
    );
  }

  regresar() {
    this._router.navigate(['/transporteLista', this.transporte.numero]);
  }

  verEntregas() {
    this._router.navigate(['/entregaLista', this.transporte.numero]);
  }


// configuration section


  private setConfigTransporte() {
    this.configTransporte = new AutoComplete(
      'transporte',
      this.form,
      ['numero'],
      this.transportes,
      false,
      this.loadIcon,
      'Buscar Transporte',
      'id',
      ['numero'],
      []
    );
  }

  getTransportes(filter: string) {
    this.configTransporte.loadIcon = true;
    this.transporteService.getTransportes(filter)
      .subscribe(transportes => {
        this.configTransporte.searchList = transportes;
        this.configTransporte.loadIcon = false;
      });
  }

  setTransporte(selectedItem: Transporte) {
    this.transporte = selectedItem;
  }


  private setConfigRemitente() {
    this.configRemitente = new AutoComplete(
      'remitente',
      this.form,
      ['razonSocial', 'ruc'],
      this.remitentes,
      false,
      this.loadIcon,
      'Buscar Remitente',
      'id',
      ['razonSocial', 'ruc'],
      []
    );
  }

  getRemitentes(filter: string) {
    this.configRemitente.loadIcon = true;
    this.entregaService.getRemitentes(filter)
      .subscribe(remitentes => {
        this.configRemitente.searchList = remitentes;
        this.configRemitente.loadIcon = false;
      });
  }

  setRemitente(selectedItem: Cliente) {
    this.remitente = selectedItem;
  }


  private setConfigDestinatario() {
    this.configDestinatario = new AutoComplete(
      'destinatario',
      this.form,
      ['razonSocial', 'ruc'],
      this.destinatarios,
      false,
      this.loadIcon,
      'Buscar Destinatario',
      'id',
      ['razonSocial', 'ruc'],
      []
    );
  }

  getDestinatarios(filter: string) {
    this.configDestinatario.loadIcon = true;
    this.entregaService.getDestinatarios(filter)
      .subscribe(destinatarios => {
        this.configDestinatario.searchList = destinatarios;
        this.configDestinatario.loadIcon = false;
      });
  }

  setDestinatario(selectedItem: Cliente) {
    this.destinatario = selectedItem;
  }


  private setConfigSucursalSalida() {
    this.configSucursalSalida = new AutoComplete(
      'sucursalSalida',
      this.form,
      ['nombre', 'departamento', 'direccion'],
      this.sucursalesSalida,
      false,
      this.loadIcon,
      'Buscar Sucursal de salida',
      'id',
      ['nombre', 'departamento', 'direccion'],
      []
    );
  }

  getSucursalesSalida(filter: string) {
    this.configSucursalSalida.loadIcon = true;
    this.transporteService.getSucursales(filter)
      .subscribe(sucursales => {
        this.configSucursalSalida.searchList = sucursales;
        this.configSucursalSalida.loadIcon = false;
      });
  }

  setSucursalSalida(selectedItem: Sucursal) {
    this.sucursalSalida = selectedItem;
  }


  private setConfigSucursalLlegada() {
    this.configSucursalLlegada = new AutoComplete(
      'sucursalLlegada',
      this.form,
      ['nombre', 'departamento', 'direccion'],
      this.ucursalesLlegada,
      false,
      this.loadIcon,
      'Buscar Sucursal de llegada',
      'id',
      ['nombre', 'departamento', 'direccion'],
      []
    );
  }

  getSucursalesLlegada(filter: string) {
    this.configSucursalLlegada.loadIcon = true;
    this.transporteService.getSucursales(filter)
      .subscribe(sucursales => {
        this.configSucursalLlegada.searchList = sucursales;
        this.configSucursalLlegada.loadIcon = false;
      });
  }

  setSucursalLlegada(selectedItem: Sucursal) {
    this.sucursalLlegada = selectedItem;
  }


  formValidation(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (control.dirty && control.errors) ? true : false;
  }

}