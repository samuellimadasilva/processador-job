import { Component } from '@angular/core';

@Component({
  selector: 'app-json-upload',
  templateUrl: './json-upload.component.html',
  styleUrls: ['./json-upload.component.css']
})
export class JsonUploadComponent {

  jsonData: any;

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = () => {
      try {
        this.jsonData = JSON.parse(fileReader.result as string);
      } catch (e) {
        console.error("Could not parse JSON", e);
      }
    };
    fileReader.onerror = (error) => {
      console.error("Error reading file", error);
    };
  }
}