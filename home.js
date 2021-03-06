//createboards
function createboards(data) {
    var arr = data.boards;     // jxc ,replace this 
    if (arr.length > 0) {
        var section = document.createElement('section')
        section.classList.add('boards')   // jxc 
        var h3 = document.createElement('h3')
        h3.innerText = 'boards'   // jxc 
        section.appendChild(h3)

        var ul = document.createElement('ul')

        for (var i = 0; i < arr.length; i++) {
            var li = document.createElement('li')
            li.classList.add('unstarred')    // jxc 
            li.dataset.id = arr[i].id

            if (arr[i].bg[0] == 'color') {
                li.style.backgroundColor = data.color[arr[i].bg[1]]
            }
            else {
                var fade = document.createElement('div')
                fade.className = 'fade'
                li.appendChild(fade)
                li.style.backgroundImage = 'url(common/data/img/' + data.img[arr[i].bg[1]] + '_small.jpg)'
            }

            var p = document.createElement('p')
            p.innerText = arr[i].header    //  jxc , board标题
            var button = document.createElement('button')
            button.addEventListener('click', function (event) {
                event.stopPropagation()
                var parent = this.parentNode.parentNode
                var currentId = parseInt(parent.dataset.id)
                /*    deleted by jxc , for starred board not needed till now 
                if (!parent.classList.contains('unstarred')) {
                    var n = data.feature['starred-boards'].indexOf(currentId)
                    data.feature['starred-boards'].splice(n, 1)
                }
                else {
                    data.feature['starred-boards'].push(currentId)
                }
                */
                parent.classList.toggle('unstarred')
            })
            p.appendChild(button)
            li.appendChild(p)

            li.addEventListener('click', function (event) {
                location.href = 'board/board.html?id=' + this.dataset.id   // jxc 点击跳转相应board
            })
            ul.appendChild(li)
        }

        var addli = document.createElement('li')
        addli.innerText = 'Create new boards...'
        addli.classList.add('add')
        addli.onclick = createNewBoard
        ul.appendChild(addli)
        

        section.appendChild(ul)
        return section
    }
}

function initBoards(data) {
    var parent = document.querySelector('main')
    // jxc for remove star boards ,only personal boards
    if (createList(data)) {
            var item = createboards(data)   // jxc 
            parent.appendChild(item)
    }
}

/*   jxc delete for not needed ,以后可以根据工作、生活来进行board的区分
function removeBoards(arr) {
    var main = document.querySelector('main')
    for (var i = 0; i < arr.length; i++) {
        if (main.querySelector('.' + arr[i] + '-list')) {
            var item = main.querySelector('.' + arr[i] + '-list')
            var parent = item.parentNode
            parent.removeChild(item)
        }
    }
}

function updateBoards(arr, data) {
    removeBoards(arr)
    initBoards(arr, data)
}
*/

(function () {
    initBoards(data)   // jxc 
    //监听star内容的改变,jxc 不再监听star，不需要这个
    /*
    window.addEventListener('starChange', function () {      // jxc
        console.log('starChange')
        //更新DOM
        updateBoards(['starred-boards', 'personal-boards'], data)
    })
    */
})()



