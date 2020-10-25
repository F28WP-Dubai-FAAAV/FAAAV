import Player from './Player.js'

const canvas = document.getElementById("canvas")

const players = []
players.push(new Player('AbdulKader',players.length+1))

const img = document.querySelector(".hero")
img.src = players[0].sprite;