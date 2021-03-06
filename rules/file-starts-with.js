// Copyright 2017 TODO Group. All rights reserved.
// Licensed under the Apache License, Version 2.0.

const path = require('path')

module.exports = function (targetDir, options) {
  const fs = options.fs || require('../lib/file_system')
  const files = fs.findAll(targetDir, options.files)
  const failures = []
  files.forEach(file => {
    const lines = fs.readLines(file, options.lineCount)
    const allMatch = options.patterns.every(pattern => {
      return lines.match(pattern)
    })
    if (!allMatch) {
      failures.push(path.relative(targetDir, file) + ' doesn\'t contain all the patterns')
    };
  })
  return {
    failures: failures,
    passes: failures.length === 0 ? ['exist'] : []
  }
}
