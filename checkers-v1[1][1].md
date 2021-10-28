The goal of this exercise is to write a simple checkers game app, preferably using ReactJS.  Other frameworks (or vanilla JS) are acceptable in case if you haven’t had enough experience with React.  The minimal requirements are:

- Implement basic game mechanics: taking turns, basic moves and jumps over the enemy checkers.
- Players should be able to drag-n-drop checkers using a mouse. Additional ways to control the game are up to you.
- On mouse over checker, please highlight cells where a checker can possibly move to
- If there is an opportunity to capture an enemy checker - it should be the only valid move
- No-brain AI player: could make a move to any random valid cell
- Please draw the board and checkers with DOM/CSS, don’t use images or canvas for that part
- Make sure that the app is stable across major browsers

The whole app should take less than 4 hours to complete. The primary areas to focus are code readability, and overall user experience. You may use any state management approach on your choice. Please make UI as simple as possible, try to minimize amount of external dependencies in your app.

Ways to stand out of the crowd: if you managed to make all features above in 4 hours, you may implement something from this list and it would be considered as an advantage:

- Basic AI (making moves that are not completely random)
- Restoring the game state in case if a page was reloaded
- Reverting last move
- Basic unit tests
- Better game stats UI (game time, number of moves, victory banners etc.)
- King checkers mechanics (when a checker hits the last row and gets an ability to move backwards)