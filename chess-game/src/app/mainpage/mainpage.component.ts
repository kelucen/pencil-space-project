import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  iframe1!: HTMLIFrameElement;
  iframe2!: HTMLIFrameElement;
  frame1Disabled: boolean = false;
  frame2Disabled: boolean = true;

  currentTurn: 'white' | 'black' = 'white';
  gameInProgress: boolean = true;

  ngOnInit(): void {
    this.iframe1 = document.getElementById('iframe1') as HTMLIFrameElement;
    this.iframe2 = document.getElementById('iframe2') as HTMLIFrameElement;

    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.receiveMessage.bind(this));
  }

  receiveMessage(event: MessageEvent): void {
    const data = event.data;
    if (data.type === 'move') {
      console.log(event.data);
      this.processMove(data.move);
    }
  }

  processMove(move: any): void {
    if (this.gameInProgress) {
      this.mirrorMoveInOtherIframe(move);

      this.toggleDisableBoards(move);
    }
  }

  mirrorMoveInOtherIframe(move: any): void {
    if (move.color === 'white') {
      this.sendMoveToIframe(this.iframe2, move);
    } else {
      this.sendMoveToIframe(this.iframe1, move);
    }
  }

  sendMoveToIframe(iframe: HTMLIFrameElement, move: any): void {
    iframe.contentWindow?.postMessage(
      {
        type: 'move',
        move: move,
      },
      '*'
    );
  }

  toggleDisableBoards(move: any): void {
    if (move.color === 'white') {
      this.frame1Disabled = true;
      this.frame2Disabled = false;
    } else {
      this.frame1Disabled = false;
      this.frame2Disabled = true;
    }
  }


}
