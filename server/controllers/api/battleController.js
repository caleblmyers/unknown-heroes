const battleController = require('express').Router()
const battlefunctions = require('../../logic/battlefunctions')

let player
let enemy
let received

battleController.post("/start", (req, res) => {
  player = req.body.hero
  player.hp = player.maxHp
  enemy = req.body.enemy
  enemy.hp = enemy.maxHp
  received = true

  res.send({
    received: received
  })
})

battleController.get("/attack", (req, res) => {
  let gameOver = false
  let playerDead = ''
  let playerMessage = ''
  let enemyMessage = ''
  let damage

  let playerAccCheck = battlefunctions.accuracy(player, enemy)
  let enemyAccCheck = battlefunctions.accuracy(enemy, player)

  if (playerAccCheck) {
    damage = battlefunctions.attack(player, enemy)
    enemy.hp -= damage
    playerMessage = `The ${player.name} hits the ${enemy.name} for ${damage} damage.`
  } else {
    playerMessage = `The ${player.name} misses the ${enemy.name}.`
  }

  if (enemy.hp <= 0) {
    enemy.hp = 0
    enemyMessage = `The ${enemy.name} is knocked out!`
    gameOver = true
  } else {
    if (enemyAccCheck) {
      damage = battlefunctions.attack(enemy, player)
      player.hp -= damage
      enemyMessage = `The ${enemy.name} hits the ${player.name} for ${damage} damage.`
    } else {
      enemyMessage = `The ${enemy.name} misses the ${player.name}.`
    }
  }

  if (player.hp <= 0) {
    player.hp = 0
    gameOver = true
    playerDead = `The ${player.name} is knocked out!`
  }

  received = true

  res.send({
    playerHp: player.hp,
    enemyHp: enemy.hp,
    playerMessage: playerMessage,
    enemyMessage: enemyMessage,
    playerDead: playerDead,
    gameOver: gameOver,
    received: received
  })
})

battleController.get("/defend", (req, res) => {
  let gameOver = false
  let playerDead = ''
  let playerMessage = ''
  let enemyMessage = ''
  let damage

  let healed = battlefunctions.defend(player)
  let enemyAccCheck = battlefunctions.accuracy(enemy, player)

  player.hp += healed
  playerMessage = `The ${player.name} restores ${healed}hp. The ${player.name} braces for the attack.`

  if (enemy.hp <= 0) {
    enemy.hp = 0
    enemyMessage = `${enemy.name} is knocked out!`
    gameOver = true
  } else {
    if (enemyAccCheck) {
      damage = Math.floor((battlefunctions.attack(enemy, player)) / 2)
      player.hp = player.hp - damage
      enemyMessage = `The ${enemy.name} hits the ${player.name} for ${damage} damage.`
    } else {
      enemyMessage = `The ${enemy.name} misses the ${player.name}.`
    }
  }

  if (player.hp <= 0) {
    player.hp = 0
    gameOver = true
    playerDead = ` ${player.name} is knocked out!`
  }

  received = true

  res.send({
    playerHp: player.hp,
    enemyHp: enemy.hp,
    playerMessage: playerMessage,
    enemyMessage: enemyMessage,
    playerDead: playerDead,
    gameOver: gameOver,
    received: received
  })
})

module.exports = battleController
