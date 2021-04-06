module.exports = {
  initPrompt: [
    {
      type: 'input',
      message: '输入项目名称:',
      name: 'name',
      default: 'MyProject',
    },
    {
      type: 'list',
      message: '选择项目类型:',
      name: 'type',
      choices: ['Vue'],
    },
  ],
  componentPrompt: [
    {
      type: 'list',
      message: '选择组件类型:',
      name: 'type',
      choices: ['Vue'],
    }
  ],
  pagePrompt: [
    {
      type: 'list',
      message: '选择页面类型:',
      name: 'type',
      choices: ['Vue'],
    }
  ]
}
