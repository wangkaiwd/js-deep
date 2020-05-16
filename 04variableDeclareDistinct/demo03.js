function fn () {
  var temp = 10
  console.log(window.temp)
  console.dir(fn.temp)
}

fn()
