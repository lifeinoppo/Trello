//为标记星星的内容改变定义事件
var changeStarEvent = new Event('starChange')
var data = getData()

//根据数据呈现内容
function createList(data) {
    var arr = data.boards;    // jxc 

    var div = document.createElement('div')
    div.className = 'boards'

    var header = document.createElement('header')
    var h3 = document.createElement('h3')
    h3.innerText = 'boards'   // jxc 
    var button = document.createElement('button')
    button.className = 'collapseBtn'
    button.innerText = '-'

    button.addEventListener('click', function () {
        if (ul.hidden) {
            ul.hidden = false
            this.innerText = '-'
        }
        else {
            ul.hidden = true
            this.innerText = '+'
        }
    })

    header.appendChild(h3)
    header.appendChild(button)

    var ul = document.createElement('ul')
    for (var i = 0; i < arr.length; i++) {
        var li = createItem(arr[i], data)
        ul.appendChild(li)
    }

    div.appendChild(header)
    div.appendChild(ul)

    return div

}
/*  deleted by jxc for feature not needed 
function featureList(feature, data) {
    //筛选不同的list数据
    
    var list = data.feature[feature]
    return list.map(function (el) {
        return data.boards.find(function (val) {
            return val.id === el
        })
    })
    
}
*/

// 此函数只会在初始化时被调用一次
function createItem(obj, data) {
    var li = document.createElement('li')
    li.dataset.id = obj.id
    li.innerHTML = '<label>' + obj.header + '</label>'

    li.style.backgroundColor = data.color['cyan']   // jxc ,制定todo板的颜色


    var btn = document.createElement('button')

    li.appendChild(btn)
    li.addEventListener('click', function () {
        location.href = 'board.html?id=' + this.dataset.id     // jxc 左上角的board快捷方式， 首页场景会失灵，但是首页使用这个按钮的频率很低，故不进行修改
    })
    return li
}

function initList(data) {
    var sideList = document.querySelector('#sideList')
    var p = sideList.querySelector('p')

    // jxc 
    if (createList(data)) {
        var item = createList(data)
        sideList.insertBefore(item, p)
    }
    
    addDrag()
}

function removeList(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (document.querySelector('.' + arr[i])) {
            var item = document.querySelector('.' + arr[i])
            var parent = item.parentNode
            parent.removeChild(item)
        }
    }
}

function updateList(arr, data) {
    removeList(arr)
    initList(data)
}

//为starredBoard 添加拖拽事件
function starlistDrag(target) {
    var start = false
    var moving = false
    var startY, targetY
    var placeholder = document.createElement('div')
    placeholder.className = 'placeholder'
    var sideList = document.querySelector('#sideList')
    var parent = target.parentNode
    var itemHeight, itemWidth

    target.addEventListener('mousedown', function (event) {
        event.preventDefault()
        event.stopPropagation()
        itemHeight = target.offsetHeight
        itemWidth = target.offsetWidth
        start = true
        startY = event.clientY
    })
    document.addEventListener('mousemove', function (event) {
        event.stopPropagation()
        if (start) {
            if (!moving) {
                moving = true
                target.classList.add('moving')
                parent.insertBefore(placeholder, target)
                target.style.width = itemWidth + 'px'
                targetY = target.offsetTop - itemHeight - sideList.scrollTop
            }
            else {
                var path = eventPath(event)
                target.style.top = targetY + event.clientY - startY + 'px'
                var brother = path.find(function (val) {
                    return val.parentNode === parent
                })
                //模拟边缘滚动
                if (event.clientY > sideList.offsetHeight - 30) {
                    sideList.scrollTop += 5
                }
                else if (event.clientY < sideList.offsetTop + itemHeight) {
                    sideList.scrollTop -= 5
                }

                //插入占位元素
                if (brother) {
                    parent.insertBefore(placeholder, brother)
                }

                else if (event.clientY >
                    parent.parentNode.offsetHeight +
                    sideList.offsetTop + parent.parentNode.offsetTop -
                    sideList.scrollTop) {
                    parent.appendChild(placeholder)
                }
                else if (event.clientY < sideList.offsetTop + itemHeight * 3) {
                    parent.insertBefore(placeholder, parent.firstElementChild)
                }
            }
        }
    })
    document.addEventListener('mouseup', function (event) {
        event.preventDefault()
        event.stopPropagation()
        if (start) {
            start = false
            if (moving) {
                moving = false
                target.classList.remove('moving')
                target.style.left = ''
                target.style.top = ''
                target.style.width = ''
                var mytarget = parent.removeChild(target)
                parent.insertBefore(mytarget, placeholder)
                parent.removeChild(placeholder)

                data.feature['starred-boards'] = Array.prototype.map.call(parent.querySelectorAll('li'), function (val) {
                    return parseInt(val.dataset.id)
                })
                window.dispatchEvent(changeStarEvent)
            }
        }
    })

}

function addDrag() {
    if (document.querySelector('.starred-boards') &&
        document.querySelector('.starred-boards').querySelectorAll('li')) {
        var starul = document.querySelector('.starred-boards')
        Array.prototype.forEach.call(starul.querySelectorAll('li'), function (val) {
            starlistDrag(val)
            val.addEventListener('myDrag', function () {
                window.dispatchEvent(changeStarEvent)
            }, false)
        })
    }
}

(function () {
    //创建结构内容
    function createHeaderBtns(header) {
        /*  创建各部分内容  */
        var sidePart = document.createElement('div')
        var sideBtn = document.createElement('span')
        sideBtn.id = 'sideBtn'
        var label = document.createElement('label')
        label.innerText = 'Boards'
        sideBtn.appendChild(label)
        sidePart.appendChild(sideBtn)
        var input = document.createElement('input')
        input.type = 'search'
        input.id = 'searchBtn'
        sidePart.appendChild(input)
        header.appendChild(sidePart)

        var logoLink = document.createElement('a')
        logoLink.id = 'logo'
        //index.html
        logoLink.href = '../index.html'
        header.appendChild(logoLink)


        // jxc 首页右上角的button，没啥用, 后期可以加进相应的功能。
        var btnLists = document.createElement('div')
        var createBtn = document.createElement('button')
        createBtn.innerText = '+'
        createBtn.id = 'createBtn'
        var infoBtn = document.createElement('button')
        infoBtn.innerText = 'i'
        infoBtn.id = 'infoBtn'
        var notiBtn = document.createElement('button')
        notiBtn.innerText = 'no'
        notiBtn.id = 'notiBtn'
        var userBtn = document.createElement('span')
        userBtn.innerText = 'C'
        userBtn.id = 'userBtn'
        btnLists.appendChild(createBtn)
        btnLists.appendChild(infoBtn)
        btnLists.appendChild(notiBtn)
        btnLists.appendChild(userBtn)
        header.appendChild(btnLists)

        /*  绑定相应事件  */
        // function addBtnEvent(arr) {
        //     arr.forEach(function (str, index, arr) {
        //         var elem = document.querySelector('#' + str + 'Btn')
        //         var target = document.querySelector('#' + str + 'Panel')
        //         elem.addEventListener('click', function () {
        //             allClosed(arr)
        //             target.hidden = !target.hidden
        //         })
        //     })
        //
        //     function allClosed(arr) {
        //         arr.forEach(function (str) {
        //             var target = document.querySelector('#' + str + 'Panel')
        //             target.hidden = true
        //         })
        //     }
        // }
        //
        // addBtnEvent(['search', 'create', 'info', 'noti', 'user'])

        createSideList(header.parentNode, document.querySelector('.overlay'))
    }

    var header = document.querySelector('#header')
    createHeaderBtns(header)

    function toggleHidden() {
        var sideList = document.querySelector('#sideList')
        sideList.hidden = !sideList.hidden
    }

    function createSideList(parent, refChild) {
        var sideList = document.createElement('div')
        sideList.id = 'sideList'
        sideList.hidden = true

        var searchBoard = document.createElement('input')
        searchBoard.type = 'search'
        searchBoard.placeholder = 'Find boards by name...'
        searchBoard.autofocus = true
        sideList.appendChild(searchBoard)

        var p1 = document.createElement('p')
        p1.innerText = 'Create new board...'
        p1.onclick = createNewBoard
        sideList.appendChild(p1)

        var keepBtn = document.createElement('p')
        sideList.appendChild(keepBtn)

        var p2 = document.createElement('p2')
        p2.innerText = 'See closed boards.'
        sideList.appendChild(p2)
        parent.insertBefore(sideList, refChild)

        keepBtn.update = function () {
            var header = document.querySelector('#header')
            var sideBtn = header.querySelector('#sideBtn')
            var main =  document.querySelector('main')
            keepBtn.innerText = data.menuOn?'Dont\'t keep this menu open':
                'Always keep this menu open.'
            if (data.menuOn) {
                sideBtn.removeEventListener('click', toggleHidden)
                main.classList.add('keep-open-main')
                header.classList.add('keep-open')
                sideList.hidden = false
            }
            else {
                sideBtn.addEventListener('click', toggleHidden)
                main.classList.remove('keep-open-main')
                header.classList.remove('keep-open')
                sideList.hidden = true
            }
        }
        keepBtn.update()
        keepBtn.addEventListener('click', function () {
            data.menuOn = !data.menuOn
            saveData(data)
            keepBtn.update()
        })
        return sideList
    }

    initList(data)
})()

//获取move事件传播的所有target
function eventPath(e) {
    if (!e.path) {
        var path = []
        var node = e.target
        while (node !== document.body) {
            path.push(node)
            node = node.parentNode
        }
        return path
    }
    else return e.path
}
/*  deleted by jxc  for not needed
window.addEventListener('starChange', function () {
    saveData(data)
    updateList(['starred-boards', 'personal-boards'], data)
})
*/

