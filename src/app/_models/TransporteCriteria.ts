export class TransporteCriteria {
    constructor(
        public nroTransporte: string = null,
        public fechaSalida: Date = null,
        public fechaLlegada: Date = null,
        public sucursalSalidaId: number = null,
        public sucursalLlegadaId: number = null,
        public vehiculoPlaca: string = null
    ) {}
}
