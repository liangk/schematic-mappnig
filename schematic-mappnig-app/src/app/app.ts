import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Nav } from './layout/nav/nav';
import { MainContent } from './layout/main-content/main-content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Nav, MainContent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'schematic-mappnig-app';
}
