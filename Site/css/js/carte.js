 
var map = document.querySelector('#map')
var paths = map.querySelectorAll('.map__image a')
var links = map.querySelectorAll('.map__list a')


console.log(map);


var activeArea = function (id) {
 map.querySelectorAll('.is-active').forEach(function (item){
        item.classList.remove('is-active')
    })
    
    if (id !== undefined) {
        document.querySelector('#list_' + id).classList.add('is-active')
        document.querySelector('#_' + id).classList.add('is-active')
    }

    
}

//Compatible que sur Chrome donc Nodelist pour les autres nav
paths.forEach(function(path){
    path.addEventListener('mouseenter', function (){
        var id = this.id.replace('_', '')
        activeArea(id)
       
    })
})

links.forEach(function (link) {
    link.addEventListener('mouseenter', function () {
        var id = this.id.replace('list_', '')
        activeArea(id)
    })
})

map.addEventListener('mouseover', function (){
    activeArea()
})


