'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
<<<<<<< HEAD
     // API_HOST:'"https://cs.miyuejk.com:4093/samy"',
=======
	 //API_HOST:'"https://cs.miyuejk.com:4093/samy"',
>>>>>>> af57d6f8923034a24bf729a3ed3cb692e6d99da6
    // API_HOST:'"http://172.16.56.1:8080"',
	API_HOST:'"http://172.16.3.92:8080"',
	// API_HOST:'"http://172.16.213.210:8080/samy"',
	// API_HOST:'"https://172.16.213.210/samy"',
	//API_HOST:'"http://172.16.3.116:8080/"'
	API_HOST:'"http://172.16.3.33:8082/"'
})
