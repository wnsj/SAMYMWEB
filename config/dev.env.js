'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
	// API_HOST:'"https://cs.miyuejk.com:4093/samy"',
    API_HOST:'"http://172.16.16.255:8080"'
})
