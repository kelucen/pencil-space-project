import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { NgxChessBoardComponent } from 'ngx-chess-board';

@Component({
  selector: 'app-iframepage',
  templateUrl: './iframepage.component.html',
  styleUrls: ['./iframepage.component.scss'],
})
export class IframePageComponent implements OnInit, OnDestroy {
  @ViewChild('chessBoard')
  chessBoard!: NgxChessBoardComponent;
  chessBoardHistory: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.chessBoardHistory = localStorage.getItem('chessBoardHistory') ? JSON.parse(localStorage.getItem('chessBoardHistory')!) : [];
    this.chessBoardHistory.map((h) => this.chessBoard.move(h.move));
  }

  ngOnInit(): void {
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.receiveMessage.bind(this));
  }

  sendMove(event: any): void {
    if(event.checkmate) {
      localStorage.removeItem('chessBoardHistory');
      return window.parent.postMessage({ type: 'checkmate', move: event }, '*');
    }
    return window.parent.postMessage({ type: 'move', move: event }, '*');
  }

  receiveMessage(event: MessageEvent): void {
    const data = event.data;
    if (data.type === 'move') {
      this.applyMove(data.move.move);
    }
    else if(data.type === 'reset') {
      this.chessBoard.reset();
    }
    else if(data.type === 'reverse') {
      this.chessBoard.reverse();
    }
  }

  applyMove(move: any): void {
    if (this.chessBoard) {
      this.chessBoard.move(move);
      localStorage.setItem('chessBoardHistory', JSON.stringify(this.chessBoard.getMoveHistory()));
    }
  }
}
