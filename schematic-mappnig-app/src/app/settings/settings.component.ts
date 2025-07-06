import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <section class="settings-page">
      <h2>Settings</h2>
      <p>Configure your application preferences here.</p>
    </section>
  `,
  styles: [`
    .settings-page {
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
export class SettingsComponent {}
