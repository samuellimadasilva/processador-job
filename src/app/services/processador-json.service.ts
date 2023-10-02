import { Injectable } from '@angular/core';

interface JsonItem {
  message?: string;
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

  processar(jsonEntrada: JsonItem[]): JsonItem[][] {
    if (!jsonEntrada || jsonEntrada.length === 0) {
      return [[{ message: "Array de entrada vazio ou ausente." }]];
    }

    jsonEntrada.sort((a, b) => {
      const dataA = new Date(a.maxDateOfConclusion!);
      const dataB = new Date(b.maxDateOfConclusion!);
      if (dataA.getTime() - dataB.getTime() === 0) {
        return a.estimatedTime! - b.estimatedTime!;
      }
      return dataA.getTime() - dataB.getTime();
    });

    const jsonSaida: JsonItem[][] = [];
    let jsonItem: JsonItem[] = [];
    let tempoEstimadoTotal = 0;
    let dataAtual: Date | null = null;

    for (const job of jsonEntrada) {
      const tempoEstimadoHoras = job.estimatedTime!;
      const dataConclusao = new Date(job.maxDateOfConclusion!);

      if (
        dataAtual &&
        (tempoEstimadoTotal + tempoEstimadoHoras > 8 ||
          dataConclusao.getTime() > dataAtual.getTime())
      ) {
        jsonSaida.push(jsonItem);
        jsonItem = [];
        tempoEstimadoTotal = 0;
      }

      jsonItem.push(job);
      tempoEstimadoTotal += tempoEstimadoHoras;
      dataAtual = dataConclusao;
    }

    if (jsonItem.length > 0) {
      jsonSaida.push(jsonItem);
    }

    return jsonSaida;
  }
}
