import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-tabela',
  templateUrl: './lancamentos-tabela.component.html',
  styleUrls: ['./lancamentos-tabela.component.css']
})
export class LancamentosTabelaComponent implements OnInit {

  @Input() lancamentos: any[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
