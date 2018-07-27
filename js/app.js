// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y + 60;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.step = 101;
  this.boundary = this.step * 5;
  this.resetPosition = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  // Border constrol for enemies
  if (this.x < this.boundary) {
    // Add a forward movement + certain speed
    this.x += this.speed * dt;
  } else {
    // Reset enemie's position
    this.x = this.resetPosition;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Warrior {
  constructor() {
    this.sprite = "images/char-boy.png";
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = this.jump * 4 + 60;
    this.x = this.startX;
    this.y = this.startY;
    this.victory = false;
  }

  // Locate and place the warrior sprite on current x and y coordinates
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Mechanism for warrior movement - keys handling
  handleInput(input) {
    switch (input) {
      case "left":
        if (this.x > 0) {
          this.x -= this.step;
        }
        break;
      case "up":
        if (this.y > this.jump) {
          this.y -= this.jump;
        }
        break;
      case "right":
        if (this.x < this.step * 4) {
          this.x += this.step;
        }
        break;
      case "down":
        if (this.y < this.jump * 4) {
          this.y += this.jump;
        }
        break;
    }
  }

  update() {
    // Check mechanism for collision
    for (let enemy of allEnemies) {
      if (
        this.y === enemy.y &&
        (enemy.x + enemy.step / 1.8 > this.x && // Optimising the ideal point of collision
          enemy.x < this.x + this.step / 1.8)
      ) {
        this.reset();
      }
    }
    if (this.y === 60) {
      this.victory = true;
    }
  }

  // Reset Warrior to default position
  reset() {
    this.y = this.startY;
    this.x = this.startX;
  }
}

// Init game objects (player, enemies)
const player = new Warrior();
const bug1 = new Enemy(-101, 0, 250);
const bug2 = new Enemy(-101, 83, 320);
const bug3 = new Enemy(-101 * 2.5, 83 * 2, 220);
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
