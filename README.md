Rainbow Cannon Academy
URL: http://rainbowcannonacademy.herokuapp.com/

============

Project intention:
Rainbow-Cannon Academy is a game designed to make playing flashcards more bearable. Sign in with Quizlet and you can play with any of your decks.

How do I play?
The game alternates between 'flashcard mode' and 'game mode'. During flashcard mode, just type in the answer for each of the 10 flashcards. During game mode, the only controls are up/down to move your ship (you can also use left/right). Your ship will shoot on its own.

How are the two modes related?
Each correct answer in 'flashcard mode' will make your ship's gun faster for the next game mode. Each incorrect answer will make the boss bigger and stronger. Get all 10 right for a special upgrade :)

What happens if I get hit?
It takes 3 hits to destroy your ship, and if your ship is destroyed, you lose a life. If it's not a game-over you will replay the same level (with the same 10 flashcards) again. If it is a game-over you have to start back at level 1.

Do the levels get harder?
Yes, the minions get stronger on each level.

Technology used:
- Rails
- Phaser JS
- JQuery
- Javascript
- Quizlet Oauth
- Quizlet API
- Postgres
- Deploy in Heroku

Git workflow:

git clone https://github.com/znagler/flashforward.git
git checkout -b <branch-name>

git add
git commit
git pull origin master
  if merge conflicts
    fix all merge conflicts locally
    git add
    git commit -m "fix merge conflicts"
git push origin <branch-name>

Other member review code, create pull request from <branch-name>, merge



