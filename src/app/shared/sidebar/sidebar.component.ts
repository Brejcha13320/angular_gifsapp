import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  get historial() {
    return this._gifsService.historial;
  }

  constructor(private _gifsService: GifsService) {}

  ngOnInit(): void {}

  buscar(termino: string) {
    this._gifsService.buscarGifs(termino);
  }
}
