import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxChessBoardService } from 'ngx-chess-board';

@Component({
  selector: 'app-iframepage',
  templateUrl: './iframepage.component.html',
  styleUrls: ['./iframepage.component.scss']
})
export class IframepageComponent implements OnInit {
  rotation: string = 'white'; // Example for the player's color

  constructor(private chessBoard: NgxChessBoardService) {}

  ngOnInit(): void {
    // Send the move to the parent window when a piece is moved
  }

  moveEvent(e: any): void {
    console.log('Move event:', e);

  }
}
