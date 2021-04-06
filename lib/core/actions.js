const { promisify } = require('util')
const path = require('path')

const colors = require('colors')
const download = promisify(require('download-git-repo'))
const open = require('open')

const { vueRepo } = require('../config/repo')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')

/**
 * 创建项目
 * @param { name: '项目名称', type: '类型：现在只有Vue，后续会陆续加上React' } data
 */
const createProjectAction = async (data) => {
  console.log('正在为您创建项目，请稍候...'.blue)
  // 1.clone项目
  await download(vueRepo, data.name, { clone: true })

  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${data.name}` })

  // 3.运行npm run serve
  await commandSpawn(command, ['run', 'serve'], { cwd: `./${data.name}` })

  console.log(`项目：${data.name}创建成功`.green)

  // 4.打开浏览器
  open('http://localhost:8080/')
}

/**
 * 添加组件的action 
 * @param type 组件的类型（现在只有Vue，后续会陆续加上React）
 * @param name 组件名称
 * @param dest 组件存放的路径
 */ 
const addComponentAction = async (type, name, dest) => {
  const ext = type.toLowerCase() === 'vue' ? 'vue' : 'js'

  // 1.编译ejs模板 result
  const result = await compile(type.toLowerCase(), 'component.ejs', {name, lowerName: name.toLowerCase()})

  // 2.写入文件的操作
  const targetPath = path.resolve(dest, `${name}.${ext}`)
  writeToFile(targetPath, result)
}


/**
 * 添加页面和路由
 * @param type 页面的类型（现在只有Vue，后续会陆续加上React）
 * @param name 页面名称
 * @param dest 页面存放的路径
 */ 
const addPageAndRouteAction = async (type, name, dest) => {
  // 1.编译ejs模板
  const data = { name, lowerName: name.toLowerCase() }
  const pageResult = await compile(type.toLowerCase(), 'component.ejs', data)
  const routeResult = await compile(type.toLowerCase(), 'router.ejs', data)

  // 3.写入文件
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`)
    const targetRoutePath = path.resolve(targetDest, 'router.js')
    writeToFile(targetPagePath, pageResult)
    writeToFile(targetRoutePath, routeResult)
  }
}

/**
 * vuex store
 * @param name module name
 * @param dest module存放的路径
 */ 
const addStoreAction = async (name, dest) => {
  // 1.遍历的过程
  const storeResult = await compile('vue', 'store.ejs', {})
  const typesResult = await compile('vue', 'types.ejs', {})

  // 2.创建文件
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `index.js`)
    const targetRoutePath = path.resolve(targetDest, 'types.js')
    writeToFile(targetPagePath, storeResult)
    writeToFile(targetRoutePath, typesResult)
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}
