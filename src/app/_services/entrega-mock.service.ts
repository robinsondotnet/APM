import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../_models/Cliente';

@Injectable()
export class EntregaMockService {
    private testUrlApi = `http://localhost:3000`;

    constructor(private _http: HttpClient) { }

    getRemitentes(filter: string): Observable<Cliente[]> {
        return this._http.get<Cliente[]>(`${this.testUrlApi}/remitentes`);
    }

    getDestinatarios(filter: string): Observable<Cliente[]> {
        return this._http.get<Cliente[]>(`${this.testUrlApi}/destinatarios`);
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

    // no funciona con json-server
    updateEntrega(entrega: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post<any>(`${this.testUrlApi}/entregas`, entrega, httpOptions);
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