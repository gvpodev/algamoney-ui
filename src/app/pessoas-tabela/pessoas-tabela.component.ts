import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-tabela',
  templateUrl: './pessoas-tabela.component.html',
  styleUrls: ['./pessoas-tabela.component.css']
})
export class PessoasTabelaComponent implements OnInit {

  @Input() pessoas: any[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
