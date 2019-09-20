battlefunctions = {
  random(min, max) {
    return Math.floor((Math.random() * max) + min)
  },

  accuracy(attacker, defender) {
    let hitRate = 75 + ((attacker.acc - defender.eva) * 3)

    let accCheck = battlefunctions.random(1, 100)

    
    if (accCheck <= hitRate) return true
    return false
  },

  attack(attacker, defender) {
    let damage = (battlefunctions.random(1, 5) + (attacker.atk - defender.def))

    
    if (damage < 0) return 0
    return damage

  },

  defend(attacker) {
    return Math.floor(attacker.atk + battlefunctions.random(0, attacker.level))
  }
}

module.exports = battlefunctions
