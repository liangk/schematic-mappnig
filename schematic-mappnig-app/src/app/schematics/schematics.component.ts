import { Component } from '@angular/core';

@Component({
  selector: 'app-schematics',
  standalone: true,
  template: `
    <section class="schematics-page">
      <h2>Schematics</h2>
      <p>Welcome to the Schematics page. Here you can manage and view your schematic resources.</p>
    </section>
  `,
  styles: [`
    .schematics-page {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      padding: 2rem 2.5rem;
      margin: 2rem 0;
    }
    h2 {
      color: #1976d2;
      margin-bottom: 1rem;
    }
  `]
})
export class SchematicsComponent {}
