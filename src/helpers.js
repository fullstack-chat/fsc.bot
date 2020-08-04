const fs = require('fs')

exports.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

exports.parseCommands = async function () {
  const commands = {}
  // TODO: Figure out a better way to parse in commands
  const files = fs.readdirSync(process.env.CMDS_ROOT)
  const jsFiles = files.filter(file => file.endsWith('.js'))
  jsFiles.forEach(commandFile => {
    const imported = require(`./commands/${commandFile}`)
    if (imported.command && imported.fn) {
      commands[imported.command] = imported.fn;
    }
  })
  return commands;
}