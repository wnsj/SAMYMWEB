'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
	// API_HOST:'"https://cs.miyuejk.com:4093/samy"',
    // API_HOST:'"http://172.16.2.107:8080"'
    API_HOST:'" http://vip.miyuexli.com:88/samy20200930"'
	API_HOST:'"https://cs.miyuejk.com:4093/samy"',
  //API_HOST:'"http://172.16.3.234:8080"'

})
