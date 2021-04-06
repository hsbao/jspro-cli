#!/usr/bin/env node
const { program } = require('commander')

const helpOptions  = require('./lib/core/help')
const createCommands = require('./lib/core/create')

// 查看版本号
program.version(require('./package.json').version)

// 帮助和可选信息
helpOptions()

// 创建指令
createCommands()

// 解析终端输入的命令
program.parse(process.argv)