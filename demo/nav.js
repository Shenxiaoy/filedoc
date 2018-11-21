var angle = document.getElementsByClassName('arrow-svg')

for(var i = 0; i<= angle.length; i++) {

  angle[i].onclick = function(e) {
    var classNames = this.className
    var liDom = +this.id + '-dis'
    var secondTitle = document.getElementsByClassName(liDom)[0]

    if(classNames.indexOf('setDeg') > -1) {
      secondTitle.style.display = 'none'
      this.classList.remove('setDeg')
      this.classList.add('delDeg')
    } else {
      secondTitle.style.display = 'block'
      this.classList.remove('delDeg')
      this.classList.add('setDeg')
    }

  }
}