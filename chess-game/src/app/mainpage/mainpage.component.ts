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

  gameInProgress: boolean = true;

  ngOnInit(): void {
    this.iframe1 = document.getElementById('iframe1') as HTMLIFrameElement;
    this.iframe2 = document.getElementById('iframe2') as HTMLIFrameElement;
    this.loadGameState();
    window.addEventListener('message', this.receiveMessage.bind(this), false);
    this.reverseBoardInIframe('iframe2');
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.receiveMessage.bind(this));
  }

  receiveMessage(event: MessageEvent): void {
    const data = event.data;
    if (data.type === 'move') {
      this.processMove(data.move);
    }
    else if (data.type === 'checkmate') {
      alert('Checkmate! Game Over');
      this.gameInProgress = false;
      localStorage.removeItem('gameState');
    }
  }

  processMove(move: any): void {
    if (this.gameInProgress) {
      this.mirrorMoveInOtherIframe(move);
      this.toggleDisableBoards(move);
      this.saveGameState();
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

  loadGameState(): void {
    const savedState = localStorage.getItem('gameState');
    setTimeout(()=> this.reverseBoardInIframe('iframe2'), 1000);
    if (savedState) {
      const state = JSON.parse(savedState);
      this.gameInProgress = state.gameInProgress;
      this.frame1Disabled = state.lightDisabled;
      this.frame2Disabled = state.darkDisabled;
    }
  }

  saveGameState(): void {
    const gameState = {
      gameInProgress: this.gameInProgress,
      lightDisabled: this.frame1Disabled,
      darkDisabled: this.frame2Disabled,
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }

  resetGame(): void {
    this.gameInProgress = true;
    this.iframe1.contentWindow?.postMessage({ type: 'reset' }, '*');
    this.iframe2.contentWindow?.postMessage({ type: 'reset' }, '*');
    localStorage.removeItem('gameState');
  }

  reverseBoardInIframe(iframeId: string): void {
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow?.postMessage({ type: 'reverse' }, '*');
    }
  }
}
