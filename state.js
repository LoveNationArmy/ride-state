const {
  readFileSync: read,
  writeFileSync: write
} = require('fs')

exports.load = (ns) => JSON.parse(read(`.data/${ns}.json`, 'utf8'))
exports.save = (ns, state) => write(`.data/${ns}.json`, JSON.stringify(state, null, 2), 'utf8')
