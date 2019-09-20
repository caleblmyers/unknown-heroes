import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import './enemymodel.css'
import AuthContext from '../../contexts/AuthContext'
import API from '../../lib/API'
import Bat from '../../img/bat1.png'
import Goblin from '../../img/goblin1.png'
import Dragon from '../../img/dragon1.png'
import Scroll from '../../img/stats-scroll.png'
import CharacterMusic from '../../music/2012-10-09_Preparation_-_David_Feslyan.mp3'

class EnemySelect extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.sound = new Audio(CharacterMusic)
  }

  state = {
    hero: this.props.location.state,
    enemies: [],
    enemy: 0,
    redirectToReferrer: false,
    isLoaded: false,
    images: [Bat, Goblin, Dragon]
  }

  componentDidMount() {
    if (!this.context.user || !this.props.location.state) {
      this.setState({ redirectToReferrer: true })
    } else {
      this.sound.play()
      API.Characters.getEnemies()
        .then(res => {
          this.setState({
            enemies: res.data,
            isLoaded: true
          })
        })
        .catch(err => console.log(err))
    }
  }

  componentWillUnmount() {
    this.sound.pause()
  }

  changeEnemy = event => {
    let enemy = this.state.enemy

    if (event.target.value === '<') {
      if (enemy === 0) enemy = this.state.enemies.length - 1
      else enemy--
    } else {
      if (enemy === this.state.enemies.length - 1) enemy = 0
      else enemy++
    }

    this.setState({ enemy })
  }

  render() {
    const { redirectToReferrer, isLoaded } = this.state
    if (redirectToReferrer) return <Redirect to='/' />

    return (
      <div className='EnemySelect bg-tan' id='enemybackground'>
        {isLoaded ? (
          <div>
            <div className='page-title'>Enemy Select - You chose: {this.state.hero.name}</div>
            <div className='row vh-75 no-gutters'>
              <div className='col-12 col-md-6 mx-auto'>
                <div className='scroll-container'>
                  <img src={Scroll} alt='Scroll with stats' />
                  <div id='stats-text'>
                    <div id='hero-name'>Enemy: <strong>{this.state.enemies[this.state.enemy].name}</strong></div>
                    <div className='stat'>HP: {this.state.enemies[this.state.enemy].maxHp}</div>
                    <div className='stat'>Attack: {this.state.enemies[this.state.enemy].atk}</div>
                    <div className='stat'>Defense: {this.state.enemies[this.state.enemy].def}</div>
                    <div className='stat'>Accuracy: {this.state.enemies[this.state.enemy].acc}</div>
                    <div className='stat'>Evasion: {this.state.enemies[this.state.enemy].eva}</div>
                    <div className='stat'>Speed: {this.state.enemies[this.state.enemy].spd}</div>
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-6'>
                <div className='enemy-container'>
                  <img src={this.state.images[this.state.enemy]} alt={this.state.enemies[this.state.enemy].name} id='heromodel' />
                </div>
              </div>
            </div>
            <div className='row no-gutters w-100' id='bottom-row'>
              <div className='col'>
                <input onClick={this.changeEnemy} className='btn btn-info mx-3' type='button' value='<' />
                <Link className='btn-choice' to={{
                  pathname: '/battle',
                  state: {
                    hero: this.state.hero,
                    enemy: this.state.enemies[this.state.enemy],
                    herolv: this.context.user[`${this.state.hero.name.toLowerCase()}Level`]
                  }
                }} ><button className='btn btn-success mx-3' type='button'>Choose Enemy</button></Link>
                <input onClick={this.changeEnemy} className='btn btn-info mx-3' type='button' value='>' />
              </div>
            </div>
          </div>
        ) : (
            <div></div>
          )}
      </div>
    )
  }
}

export default EnemySelect
