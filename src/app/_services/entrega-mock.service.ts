import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Remitente } from '../_models/Remitente';
import { Destinatario } from '../_models/Destinatario';

@Injectable()
export class EntregaMockService {
    private testUrlApi = `http://localhost:3000`;

    constructor(private _http: HttpClient) { }

    getRemitentes(filter: string): Observable<Remitente[]> {
        return this._http.get<Remitente[]>(`${this.testUrlApi}/remitentes`);
    }

    getDestinatarios(filter: string): Observable<Destinatario[]> {
        return this._http.get<Destinatario[]>(`${this.testUrlApi}/destinatarios`);
    }

    // requests para Entrega (pendiente mapear al modelo específico de entrega)

    createEntrega(entrega: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post<any>(`${this.testUrlApi}/entregas`, entrega, httpOptions);
    }

    createEntregaWithAttachment(entrega: any, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('entrega', entrega);
        formData.append('file', file);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this._http.post<any>(`${this.testUrlApi}/entregas`, formData, httpOptions);
    }

    // no funciona con json-server
    updateEntrega(entrega: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post<any>(`${this.testUrlApi}/entregas`, entrega, httpOptions);
    }

    deleteEntrega(id: any): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return this._http.put<any>(`${this.testUrlApi}/entregas/delete`, id, httpOptions);
    }

    // para recuperar una Entrega específica según su id
    getEntrega(id: Number): Observable<any> {
        return this._http.get<any>(`${this.testUrlApi}/entregas/${id}`);
    }

    // para los resultados de Busqueda en Lista de Entregas
    searchEntregas(entregaCriteria: any): Observable<any[]> {
        return this._http.get<any[]>(`${this.testUrlApi}/entregas`);
    }

}
