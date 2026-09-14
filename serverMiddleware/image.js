// Dev-only middleware: serves gallery images for /image.php?part=ID
// Nuxt dev server does NOT execute PHP, so this replicates image.php
// using the same source of truth: static/images_db.php
const fs = require('fs')
const path = require('path')

let imageDb = null

function loadImageDb() {
  if (imageDb) return imageDb
  imageDb = {}
  const phpPath = path.join(__dirname, '..', 'static', 'images_db.php')
  const php = fs.readFileSync(phpPath, 'utf8')
  const re = /"(\d+)"\s*=>\s*array\("file_name"\s*=>\s*"([^"]+)"/g
  let m
  while ((m = re.exec(php)) !== null) {
    imageDb[m[1]] = m[2]
  }
  return imageDb
}

module.exports = function (req, res, next) {
  const raw = req.url || ''
  const qIndex = raw.indexOf('?')
  const pathname = qIndex === -1 ? raw : raw.slice(0, qIndex)

  if (pathname !== '/image.php') {
    return next()
  }

  const params = new URLSearchParams(qIndex === -1 ? '' : raw.slice(qIndex + 1))
  const part = params.get('part') || ''
  const file = loadImageDb()[part]

  const fallback = path.join(__dirname, '..', 'static', 'galleries', 'no-image.jpeg')
  const fullPath = file
    ? path.join(__dirname, '..', 'static', file)
    : fallback

  if (!fs.existsSync(fullPath)) {
    res.statusCode = 404
    res.end('Not found')
    return
  }

  res.setHeader('Content-Type', 'image/jpeg')
  res.setHeader('Cache-Control', 'no-cache')
  fs.createReadStream(fullPath).pipe(res)
}