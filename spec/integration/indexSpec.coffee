app = require __dirname + '/../../app'

zombie = require 'zombie'

describe 'home page', ->
  it 'contains title TeamTalk', ->
    zombie.visit 'http://localhost:3000/', (err, browser) ->
      expect(browser.text('title')).toEqual('TeamTalk')
      asyncSpecDone()
    asyncSpecWait()