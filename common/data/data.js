function totalInit () {

    // added by jxc , 把特征feature从data中分离开来
    /*
    var feature_data = {
        color: {
            default: '#1169a6',
            green: '#4ca257',
            cyan: '#2295b0',
            grass: '#4b8029',
            darkred: '#933c26',
            yellow: '#b17a1d',
            purple: '#8662a0',
            fuschia: '#c85b92',
            gray: '#838c91'
        },

        img: {
            lake: 'lake',
            leaf: 'leaf',
            sunrise: 'sunrise',
            moutain: 'mountain',
            castle: 'castle',
            sand: 'sand'
        },
        menuOn: false
    }
    */
    /*   deleted by jxc 
    var data = {
        color: {
            default: '#1169a6',
            green: '#4ca257',
            cyan: '#2295b0',
            grass: '#4b8029',
            darkred: '#933c26',
            yellow: '#b17a1d',
            purple: '#8662a0',
            fuschia: '#c85b92',
            gray: '#838c91'
        },

        img: {
            lake: 'lake',
            leaf: 'leaf',
            sunrise: 'sunrise',
            moutain: 'mountain',
            castle: 'castle',
            sand: 'sand'
        },

        boards: [
            {
                id: 0,
                header: '早读课',
                bg: ['color', 'default'],
                team: 'default',
                listOrder: [0, 1],
                lists: [
                    {
                        'l_id': 0,
                        'title': 'todo',
                        'cardList': [1]
                    },
                    {
                        'l_id': 1,
                        'title': 'doing',
                        'cardList': [0]
                    }
                ],
                cards: [
                    {
                        c_id: 0,
                        name: 'exercise'
                    },
                    {
                        c_id: 1,
                        name: 'studying'
                    }
                ]
            },
            {
                id: 1,
                header: '水滴1',
                bg: ['color', 'cyan'],
                team: 'default',
                listOrder: [],
                lists: [],
                cards: []
            }
        ],
        feature: {
            'boards': [0, 1]
        },
        menuOn: false
    }
    */
    //  从网路获取data数据, 由于异步，需要刷新两次页面才能获取到完整数据，后期调整
    var { Query, User } = AV;
    // test gitignore again
    AV.init('Jzs7V61hwrwGnRz20LGrsya0-gzGzoHsz', 'LXnj0ytf6kJyxzfQ7bvqna80');
    var query = new AV.Query('trello');
    query.equalTo('flag', 'boards');
    query.addDescending('createdAt');
    query.first().then(function (data) {
        // data 就是符合条件的第一个 AV.Object
        var board_content = data.get('board_data');
        // var json_data = board_content.toJSON();
        // console.log('json_data is :'+board_content)
        if(!localStorage.getItem('data')) {
         localStorage.setItem('data', board_content)
        }
    }, function (error) {
        // console.log('initialize error ..... ')
    });


    // jxc ， 所有的数据存储于此。
    /*
    if(!localStorage.getItem('data')) {
        localStorage.setItem('data', JSON.stringify(data))
    }
    */
}
totalInit ()