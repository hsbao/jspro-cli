const { program } = require('commander')
const inquirer = require('inquirer')

const { initPrompt, componentPrompt, pagePrompt } = require('../utils/prompts')
const { createProjectAction, addComponentAction, addPageAndRouteAction, addStoreAction } = require('./actions')

const createCommands = () => {
  program
    .command('init')
    .alias('i')
    .description('将远程存储库把项目克隆到本地文件夹中')
    .action(() => {
      inquirer.prompt(initPrompt).then((answers) => {
        createProjectAction(answers)
      })
    })

  program
    .command('component <name>')
    .alias('c')
    .description('创建一个组件, 例如: jspro component HelloWorld [-d src/components]')
    .action((name) => {
      inquirer.prompt(componentPrompt).then((answers) => {
        addComponentAction(answers.type, name, program.opts().dest || 'src/components')
      })
    })
  
  program
    .command('page <name>')
    .alias('p')
    .description('创建页面路由, 例如: jspro page Home [-d src/pages]')
    .action((name) => {
      inquirer.prompt(pagePrompt).then((answers) => {
        addPageAndRouteAction(answers.type, name, program.opts().dest || 'src/pages')
      })
    })  

  program
    .command('store <store>')
    .alias('s')
    .description('给vuex创建一个module, 例如: jspro store Home [-d src/store/modules]')
    .action((store) => {
      addStoreAction(store, program.opts().dest || 'src/store/modules')
    })
}

module.exports = createCommands