# Pic-Char-Boo
created by [Peter Hargarten](https://github.com/peterth3geek) and [Daniel Chung](https://github.com/dlchung)

A game combining the gameplay elements of games like Pictionary, Charades, and Taboo, over a peer-to-peer connection. The objective for each game mode is the same. Guess the word or phrase your opponent/friend has been given.

Each game mode utilizes a different form of media. Pictionary activates the in-browser canvas where one player can draw for the other. Charades will activate your web cam to allow "acting". Taboo will activate your microphone to allow speaking only.

## Setup Instructions
Setting up is simple. At the moment however, one client will need to make edits to the code to specify which IP address to connect to for the backend API. Clone both the [frontend client](https://github.com/dlchung/mod4-final-project-frontend) and [backend API](https://github.com/peterth3geek/Mod4-Final-Backend).

### Frontend
Install dependencies:

    npm install

### Backend
Install dependencies:

    bundle install

Set up databases:

    rails db:create

Set up tables:

    rails db:setup

### Start game
One user will need to start the backend API first:

    rails s

Both users will need to start node on the frontend:

    npm start

## Notes

Gameplay and video is still a little buggy. This game is a proof of concept.
