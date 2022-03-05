import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showMenu = false
  usuarioLogado: string = ''

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.auth.jwtPayload?.user_name
    console.log(this.auth.jwtPayload)
  }

}
