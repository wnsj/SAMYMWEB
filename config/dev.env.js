'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
	// API_HOST:'"http://172.16.66.248:8080"',
	// API_HOST:'"http://172.16.213.210:8080/sam"',
	//API_HOST:'"http://172.16.4.50:8080"',
	 API_HOST:'"https://cs.miyuejk.com:4093/samy"',
    // API_HOST:'"http://localhost:8080"'
})
