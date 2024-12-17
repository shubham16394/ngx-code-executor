import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { NgxMonacoEditorConfig, provideMonacoEditor } from 'ngx-monaco-editor-v2';
import { provideRouter } from '@angular/router';
import { customTheme } from '../theme';

import { routes } from './app.routes';


// const monacoConfig: NgxMonacoEditorConfig = {
//   onMonacoLoad: () => {
//       // @ts-ignore
//       window.monaco.editor.defineTheme('customTheme', customTheme);
//   }
// };

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideMonacoEditor()]
};
