window.onload = function(){
  $(document).on("keydown", function (e) {
    if (e.which === 8) {
      e.preventDefault()
    }
  })

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gamediv', { preload: preload, create: create, update: update });
  
  function preload() {
    game.load.image('sky', 'assets/sky.png')
    game.load.image('ground', 'assets/platform.png')
    game.load.image('star', 'assets/star.png')
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32)
  }

  var score = 0
  var scoreText
  var platforms
  var userGuess
  var correctAnswer = "apple"

  var questions = [
  {q: "talk", a: "hablar"},
  {q: "hello", a: "hola"},
  {q: "bye", a: "adios"},
  {q: "dog", a: "perrrrro (con gusto)"},
  {q: "cat", a: "gato"},
  ]

  shuffledQuestions = shuffle(questions)
  console.log(shuffledQuestions)


  function create() {

    //create sky, ground, platforms and set physics
    game.add.sprite(0,0, 'sky')
    game.physics.startSystem(Phaser.Physics.ARCADE)
    platforms = game.add.group();
    platforms.enableBody = true
    var ground = platforms.create(0, game.world.height - 64, 'ground')
    ground.scale.setTo(2,2)
    ground.body.immovable = true
    var ledge = platforms.create(400, 400, 'ground')
    ledge.body.immovable = true
    ledge = platforms.create(-150, 250, 'ground')
    ledge.body.immovable = true

    // create player object
    player = game.add.sprite(32, game.world.height - 150, 'dude')
    game.physics.arcade.enable(player)
    player.body.bounce.y = 0.2
    player.body.gravity.y = 1000
    player.body.collideWorldBounds = true
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //create baddie
    baddie = game.add.sprite(32, game.world.height - 400, 'baddie')
    game.physics.arcade.enable(baddie)
    baddie.body.gravity.y = 1000
    baddie.body.collideWorldBounds = true
    baddie.body.velocity.x = 0
    baddie.body.bounce.set(1)



    //create cursor listeners
    cursors = game.input.keyboard.createCursorKeys()
    // letterT = game.input.keyboard.addKey(Phaser.Keyboard.T)

    // letterT.onDown.add(showLetter, this)

    game.input.keyboard.addCallbacks(this, mykeydownhandler)


    //create star group of objects
    stars = game.add.group()
    stars.enableBody = true
    for (var i = 0; i < 12; i++){
      star = stars.create(i * 70, 50, 'star')
      star.body.gravity.y = 600
      star.body.bounce.y = 0.1 + Math.random() * 0.4
      star.body.collideWorldBounds = true
    }

    //score text
    userGuess = game.add.text(16,16, '', {fontSize: '32px', fill: '#000'})

  }

  function update() {
    //player colliders
    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.overlap(player, stars, collectStar, null, this)
    //baddie collider
    game.physics.arcade.collide(baddie, platforms)
    game.physics.arcade.overlap(player, baddie, killPlayer, null, this)
    //star collider
    game.physics.arcade.collide(platforms, stars)

    //player controls
    player.body.velocity.x = 0
    if (cursors.left.isDown) {
      player.body.velocity.x = -300;
      player.animations.play('left')
    } else if (cursors.right.isDown){
      player.body.velocity.x = 300;
      player.animations.play('right')
    } else {
      player.animations.stop()
      player.frame = 4
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -600
    }

    checkUserGuess(userGuess.text, correctAnswer)
    // if (userGuess.text === " " + "apple"){
    //   console.log("fuck")
    // }




  } //END OF UPDATE

  function collectStar(player,star){
    star.kill()
    score += 10
    scoreText.text = 'Score: ' + score
  }

  function killPlayer(player, baddie){
    player.kill()
    scoreText.text = 'YOU DEAD'
  }

  function showLetter(letter){
    scoreText.text = letter
  }

  function mykeydownhandler(evt)
    {
        // Skip it unless it's a-z.
        if (evt.which === 8){
          deleteLastScoreText()
          return
        } else if( (evt.which < "A".charCodeAt(0) || evt.which > "Z".charCodeAt(0)) && evt.which != 32 )
        {
            return;
        }
        
        var letter = String.fromCharCode( evt.which )
        if( !evt.shiftKey ) letter = letter.toLowerCase()
        inputLetter(letter)
    }

  function inputLetter(letter){
    userGuess.text += letter
  }  

  function deleteLastScoreText(){
    userGuess.text = userGuess.text.slice(0,-1)
    if (userGuess.text === " "){
      userGuess.text = ""
      console.log("guess === space")
    }
  }
  function checkUserGuess(guess, rightAnswer){
    if (guess === " " + rightAnswer){
      console.log("Correct")
      userGuess.text = " "
    }
  }

  function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }


}



