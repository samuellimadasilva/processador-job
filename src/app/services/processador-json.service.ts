import { Injectable } from '@angular/core';

interface JsonItem {
  id?: number;
  description?: string;
  maxDateOfConclusion?: string;
  estimatedTime?: number;
  idDuplicado?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProcessadorJsonService {

  constructor() { }

  processar(jsonEntrada: JsonItem[]): JsonItem[] {
    // Fazendo uma cópia profunda do objeto
    const jsonSaida = JSON.parse(JSON.stringify(jsonEntrada));

    jsonSaida.forEach((item: JsonItem) => {
      // Exemplo de processamento: duplicando a propriedade 'id', se existir
      if (item.id) {
        item.idDuplicado = item.id * 2;
      }
    });

    // Devolvendo o JSON processado
    return jsonSaida;
  }
}
