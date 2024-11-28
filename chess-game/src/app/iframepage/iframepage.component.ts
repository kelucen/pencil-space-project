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


  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.receiveMessage.bind(this));
  }

  sendMove(event: any): void {
    window.parent.postMessage({ type: 'move', move: event }, '*');
  }

  receiveMessage(event: MessageEvent): void {
    const data = event.data;
    if (data.type === 'move') {
      this.applyMove(data.move.move);
    }
  }

  applyMove(move: any): void {
    if (this.chessBoard) {
      this.chessBoard.move(move);
    }
  }
}
