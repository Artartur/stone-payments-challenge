import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor() {}
  date = new Date();

  showDate() {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    return new Intl.DateTimeFormat('pt-BR', options).format(this.date);
  }

  showTime() {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
      timeZone: 'America/Sao_Paulo',
    };

    return new Intl.DateTimeFormat('pt-BR', options).format(this.date);
  }
}
