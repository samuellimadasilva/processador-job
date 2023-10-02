import { Component } from '@angular/core';
import { ProcessadorJsonService } from '../services/processador-json.service';

@Component({
  selector: 'app-json-upload',
  templateUrl: './json-upload.component.html',
  styleUrls: ['./json-upload.component.css']
})
export class JsonUploadComponent {

  jsonData: any[] = [];
  formattedJsonData: string = '';
  jsonOutputData: any[] = [];
  formattedJsonOutputData: string = '';

  constructor(private processadorJsonService: ProcessadorJsonService) { }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = () => {
      try {
        this.jsonData = JSON.parse(fileReader.result as string);
        this.formattedJsonData = JSON.stringify(this.jsonData, null, 2);
        this.jsonOutputData = this.processadorJsonService.processar(this.jsonData);
        this.formattedJsonOutputData = JSON.stringify(this.jsonOutputData, null, 2);
      } catch (e) {
        console.error("Não foi possível processar o JSON de entrada.", e);
      }
    };
    fileReader.onerror = (error) => {
      console.error("Não foi possível ler o JSON de entrada.", error);
    };
  }
}
