import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentService } from '../services/environment.service';

@Component({
  selector: 'app-environment-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-100 p-4 rounded-lg mb-4">
      <h3 class="text-lg font-semibold mb-2">Environment Information</h3>
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div><strong>Production:</strong> {{ envService.production ? 'Yes' : 'No' }}</div>
        <div><strong>Development:</strong> {{ envService.isDevelopment ? 'Yes' : 'No' }}</div>
        <div><strong>API URL:</strong> {{ envService.apiUrl }}</div>
        <div><strong>Port:</strong> {{ envService.port }}</div>
        <div><strong>HMR:</strong> {{ envService.hmr ? 'Enabled' : 'Disabled' }}</div>
      </div>
    </div>
  `,
  styles: [],
})
export class EnvironmentInfoComponent {
  envService = inject(EnvironmentService);
}
