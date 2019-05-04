const {
  openSync: open,
  closeSync: close,
  readFileSync: read,
  writeFileSync: write
} = require('fs')

exports.create = (ns) => close(open(`.data/${ns}.json`, 'w'))
exports.load = (ns) => JSON.parse(read(`.data/${ns}.json`, 'utf8'))
exports.save = (ns, state) => write(`.data/${ns}.json`, JSON.stringify(state, null, 2), 'utf8')
