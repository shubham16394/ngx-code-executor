import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ngx-monaco-editor-v2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, EditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  iframeContent: string = '';
  outputStream: string[] = [];
  title = 'ngx-code-executor';
  editorOptions = {
    language: 'typescript',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    lineHeight: 20,
    fontSize: 14,
    wordWrap: 'on',
    wrappingIndent: 'indent',
    theme: 'vs-dark',
  };
  code = '';
  iframeUrl: any;
  constructor(private sanitizer: DomSanitizer) {
    // this.code = this.sanitizer.bypassSecurityTrustHtml(this.code);
  }


  
}
