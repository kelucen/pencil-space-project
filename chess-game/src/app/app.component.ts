import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  iframe1: HTMLIFrameElement | undefined;
  iframe2: HTMLIFrameElement | undefined;
  iframeLoaded = false;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.iframeLoaded = true;
    }, 100);
    this.iframe1 = document.getElementById('iframe1') as HTMLIFrameElement;
    this.iframe2 = document.getElementById('iframe2') as HTMLIFrameElement;
  }

  ngAfterViewInit(): void {
    window.addEventListener('message', this.handlePostMessage.bind(this));
  }

  handlePostMessage(event: MessageEvent): void {
    if (event.origin !== window.location.origin) {
      return;
    }
    const data = event.data;
    if (data.type === 'movePiece') {
      if (data.player === 'iframe1') {
        if (this.iframe2) {
          this.iframe2.contentWindow?.postMessage(data, window.location.origin);
        }
      } else {
        if (this.iframe1 && this.iframe1.contentWindow) {
          this.iframe1.contentWindow.postMessage(data, window.location.origin);
        }
      }
    }
  }
}
