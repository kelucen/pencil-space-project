import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  chessBoard: any;
  ngOnInit(): void {
    // Add event listener after the component is initialized
    window.addEventListener('message', this.handlePostMessage.bind(this));
  }

  handlePostMessage(event: MessageEvent): void {

    // Ensure that the message comes from the same origin
    if (event.origin !== window.location.origin) {
      console.log('Ignoring message from origin:', event.origin);
      return; // Ignore messages from other origins
    }

    const data = event.data;
    if (data.type === 'movePiece') {
      console.log('Received move:', data.move);
      // Update the chess board with the new move (example)
      this.chessBoard.movePiece(data.move);
    }
  }
}
