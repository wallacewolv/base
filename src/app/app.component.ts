// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; // Certifique-se de importar o Location se estiver usando

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  language = 'en'; // Exemplo de propriedade

  constructor(private location: Location) {}

  ngOnInit(): void {
    // Exemplo de chamada ao método open
    this.open('example-project');
  }

  open(project: string): void {
    this.location.replaceState('/');

    const oldScript = document.getElementById('script-element');
    const container = document.getElementById('container');
    const elementId = `${project}-element`;

    // Verificar se o contêiner existe
    if (!container) {
      console.error('Container not found');
      return;
    }

    // Remover o script antigo se existir
    if (oldScript) {
      document.body.removeChild(oldScript);
    }

    // Remover o Web Component antigo se existir
    let existingElement = document.getElementById(elementId);
    if (existingElement) {
      if (container.contains(existingElement)) {
        container.removeChild(existingElement);
      } else {
        console.warn('Element to be removed is not a child of the container');
      }
    }

    const scriptUrl = `http://localhost:4444/main.js`; // Atualize o URL conforme necessário

    const elScript = document.createElement('script');
    elScript.id = 'script-element';
    elScript.src = scriptUrl;
    document.body.appendChild(elScript);

    elScript.onload = () => {
      let element = document.createElement(elementId) as HTMLElement & { language: string };
      element.language = this.language;

      container.innerHTML = '';
      container.appendChild(element);
    };

    elScript.onerror = () => {
      const errorMessage = `
        <p style="
          font-family: SantanderHeadline;
          color: white;
          font-size: 24px;
          margin: 24px;
        ">
          O menu acessado não está disponível! Tente novamente mais tarde.
        </p>
      `;
      container.innerHTML = errorMessage;
    };
  }
}
