const speed = 2000,
  apperance = 800,
  holes = document.querySelectorAll("main article");

// Append listener
holes.forEach((hole) => {
  hole.addEventListener("click", (e) => {
    let whack = App.whack(e.target);
    App.evalWhack(whack);
  });
});

let gameLoop = setInterval(() => {
  App.popUp();
}, speed);

let timer = setInterval(() => {
  App.updateTime();
}, 1000);

let App = {
  currentHole: null,
  molesWhacked: 0,
  currentTime: 60,
  hits: 0,
  whack(hole) {
    let whackedHole = hole.getAttribute("data-id");
    return whackedHole;
  },
  popUp() {
    // Empty holes
    holes.forEach((hole) => hole.classList.remove("mole"));

    // Pick random hole to pop up
      let randomId = Math.floor(Math.random() * holes.length);
      

    // register as current Hole
    this.currentHole = randomId;

    let el = document.querySelector(`[data-id="${randomId}"]`);
    el.classList.add("mole");

    // Just make the apperance short
    setTimeout(() => {
      holes.forEach((hole) => hole.classList.remove("mole"));
      this.currentHole = null;
    }, apperance);
  },
  evalWhack(whackedHole) {
    // if hole you clicked equals current hole, then its a hit
    if (parseInt(whackedHole) === this.currentHole) {
      // Hit!
      this.updateScore();

      // add class to show hit
      document.querySelector(`[data-id="${whackedHole}"]`).classList.add("hit");
      setTimeout(() => {
        document
          .querySelector(`[data-id="${whackedHole}"]`)
          .classList.remove("hit");
      }, 800);
    }
  },
  updateScore() {
    // +1 on score
    this.molesWhacked++;

    // Update whacked moles gui
    document.querySelector(".moleswhacked b").innerHTML = this.molesWhacked;
  },
  updateTime() {
    // Check if time left
    if (this.currentTime >= 0) {
      // Update timer in gui
      document.querySelector(".timeleft b").innerHTML = `${this.currentTime}s`;

      // count down current time
      this.currentTime--;
    } else {
      // Game over
      clearInterval(timer);
      clearInterval(gameLoop);

      alert(`You whacked ${this.molesWhacked} moles in 60 sec.`);
    }
  },
};