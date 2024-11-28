# Chess Game

This project is a simple **chess game** built with **Angular** and **Firebase**. It allows two players to play a game of chess in their browsers. The game features two chessboards displayed side by side, with one representing the **White's** turn and the other representing **Black's** turn.

And you can access [here](https://chessgamebykelly.web.app/mainpage) 

## Features

- **Interactive Chessboards**: Two interactive chessboards are displayed, one for White and one for Black. The move made on one board is mirrored on the other.
- **Player Turn Management**: The board is automatically disabled for the player who is not currently taking their turn.
- **Checkmate Detection**: The game can detect checkmate and end the game with a notification.
- **Firebase Hosting**: The app is hosted on Firebase, providing easy access from any device.

## Screenshots

### Chess Game Interface

- The two chessboards are displayed side by side.
- The **left side** shows **White's board** and the **right side** shows **Black's board**, with Black’s board flipped 180°.

  ![Chess Game Screenshot 1](https://github.com/kelucen/pencil-space-project/blob/dev/chess-game/public/img1.png)
  ![Chess Game Screenshot 2](https://github.com/kelucen/pencil-space-project/blob/dev/chess-game/public/img2.png)

## Setup

### Prerequisites

Before running the project locally, make sure you have the following installed:

- **Node.js** (version 18 or later)
- **Angular CLI 16**
- **Firebase CLI** (for hosting)

### Install Dependencies

1. Clone this repository:

   ```bash
   git clone https://github.com/kelucen/pencil-space-project.git
   cd chess-game
2. Install:

   ```bash
   npm install

 ## Future Features

| Feature          | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **Multiplayer Mode** | Integrate Firebase's real-time database to allow two players to play the game remotely. |
| **Player Profiles**  | Add user authentication with Firebase Authentication to save progress and create user accounts. |
| **Move History**     | Implement a history feature to review past moves, allowing players to see previous moves and restart the game if needed. |
