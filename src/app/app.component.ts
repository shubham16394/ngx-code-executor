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
  @ViewChild('codeInput') codeInput!: ElementRef;
  @ViewChild('codeFrame') codeFrame!: ElementRef;
  @ViewChild('output') outputDiv!: ElementRef;
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
  isExecuting: boolean = false;
  lightTheme = true;
  code: any = `
greet();
        
function greet() {
    console.log("Hello, World!");
}
`;
  iframeUrl: any;
  constructor(private sanitizer: DomSanitizer) {
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('iframe.html')
  }

  executeCode() {
    const iframe = this.codeFrame.nativeElement as HTMLIFrameElement;
    const code = this.code;

    // Clear previous output
    this.outputDiv.nativeElement.innerHTML = '';

    try {
      // Use eval to execute code inside the iframe's contentWindow
      if(code) {
        this.isExecuting = true;
        (iframe.contentWindow as any)?.eval(code);
      }
    } catch (err) {
      this.isExecuting = false;
      this.outputDiv.nativeElement.innerHTML += `<p><strong>Error:</strong> ${err}</p>`;
    }
  }

  // Listener for messages from the iframe
  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    this.isExecuting = false;
    if (event.origin !== window.origin) return;

    if (event.data.type === 'log') {
      this.outputDiv.nativeElement.innerHTML += `<p><strong>Log:</strong> ${event.data.message}</p>`;
    } else if (event.data.type === 'error') {
      this.outputDiv.nativeElement.innerHTML += `<p><strong>Error:</strong> ${event.data.message}</p>`;
    }
  }
  


  
}
