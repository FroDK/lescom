import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnvironmentInfoComponent } from './components/environment-info.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EnvironmentInfoComponent],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4">
        <h1 class="text-3xl font-bold text-gray-800 mb-4 text-center">Welcome to {{ title }}!</h1>
        <p class="text-gray-600 text-center mb-6">Testing Tailwind CSS + Environment</p>

        <app-environment-info />

        <button
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          id="tailwind-test-button"
        >
          Tailwind is Working!
        </button>
      </div>
    </div>

    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected title = 'lescom';
}
