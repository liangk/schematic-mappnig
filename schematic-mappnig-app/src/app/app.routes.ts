
import { Routes } from '@angular/router';
import { SchematicsComponent } from './schematics/schematics.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'schematics', pathMatch: 'full' },
  { path: 'schematics', component: SchematicsComponent },
  { path: 'settings', component: SettingsComponent }
];
