// 1 - créer random avec object literal
// tel que random.getIntInclusive(0, 100)
const random = {
  getInt: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  },
  getIntInclusive: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  },
};

const readline = require('readline');

// 2 - créer une fonction constructeur Jeu
// avec jouer sur son prototype
// tel que  :
const Jeu = function(options) {
  options = options || {};
  const min = options.min || 0;
  const max = (options.max !== undefined) ? options.max : 100;

  this._rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  this._entierAlea = random.getIntInclusive(min, max);
  this._essais = [];
};

Jeu.prototype.jouer = function() {
  if (this._essais.length) {
    console.log('Vous avez déjà joué : ' + this._essais.join(' - '));
  }

  this._rl.question('Quel est le nombre ? ', (answer) => {

    const entierSaisi = parseInt(answer);

    if (isNaN(entierSaisi)) {
      console.log('Erreur : il faut saisir un nombre');
      return this.jouer();
    }

    this._essais.push(entierSaisi);

    if (entierSaisi < this._entierAlea) {
      console.log('Trop petit');
      return this.jouer();
    }

    if (entierSaisi > this._entierAlea) {
      console.log('Trop grand');
      return this.jouer();
    }

    console.log('Gagné');
    this._rl.close();

  });
};

const jeu = new Jeu();
jeu.jouer();


// 3 - Passer des paramètres à Jeu via un objet
// tel que  :
// const jeu = new Jeu({min: 10, max: 20});
// jeu.jouer();

// 4 - Ajouter des valeurs par défaut pour min et max
// tel que  :
// const jeu = new Jeu({max: 20});
// jeu.jouer();