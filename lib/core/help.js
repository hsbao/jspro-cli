const { program } = require('commander')
const colors = require('colors')

const helpOptions = () => {
  // 增加自己的options
  program.option(
    '-d, --dest <dest>',
    'a destination folder, 例如: -d /src/pages'
  )
  program.on('--help', function () {
    console.log('')
    console.log('Other:'.blue)
    console.log('  other options~：待完善'.blue)
  })
}

module.exports = helpOptions
