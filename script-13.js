var prizes = [
    // {id: 1, img: 'images/1.png', text: '"好好生活"贴纸', count: 90},
    // {id: 2, img: 'images/2.png', text: '"好好学习"贴纸', count: 90},
    // {id: 3, img: 'images/3.png', text: '掘金码赛克编织包', count: 5},
    // {id: 4, img: 'images/4.png', text: '乐高积木', count: 20},
    // {id: 5, img: 'images/5.png', text: 'YOYO草坪绿植', count: 25},
    // {id: 6, img: 'images/6.png', text: '掘金IP棒球帽', count: 10},
    {id: 1, img: 'https://bistutu-apk.oss-cn-beijing.aliyuncs.com/images/1.png', text: '"好好生活"贴纸', count: 0},    // +20
    {id: 2, img: 'https://bistutu-apk.oss-cn-beijing.aliyuncs.com/images/2.png', text: '"好好学习"贴纸', count: 40},    // +20
    {id: 3, img: 'https://bistutu-apk.oss-cn-beijing.aliyuncs.com/images/3.png', text: '掘金码赛克编织包', count: 2},   // +2
    {id: 4, img: 'https://bistutu-apk.oss-cn-beijing.aliyuncs.com/images/4.png', text: '乐高积木', count: 0},      // +10
    {id: 5, img: 'https://bistutu-apk.oss-cn-beijing.aliyuncs.com/images/5.png', text: 'YOYO草坪绿植', count: 4},  // +10
    {id: 6, img: 'https://bistutu-apk.oss-cn-beijing.aliyuncs.com/images/6.png', text: '掘金IP棒球帽', count: 0},   // +2
];

var currentIndex = 0;
var intervalId = null;
var isDrawing = false;
var debounceTimer = null;

function showPrize(index) {
    document.getElementById('prize-img').src = prizes[index].img;
    document.getElementById('prize-text').innerText = prizes[index].text;
}

intervalId = setInterval(function () {
    currentIndex = (currentIndex + 1) % prizes.length;
    showPrize(currentIndex);
}, 100);

document.getElementById('draw-btn').addEventListener('click', function () {
    if (debounceTimer !== null) {
        return;  // 如果在防抖期间点击了按钮，不做任何事情
    }
    debounceTimer = setTimeout(function () {
        debounceTimer = null;
    }, 1000);  // 1秒后解除防抖状态

    if (isDrawing) {
        intervalId = setInterval(function () {
            currentIndex = (currentIndex + 1) % prizes.length;
            showPrize(currentIndex);
        }, 100);
        document.getElementById('draw-result').innerText = '';
        isDrawing = false;
    } else {
        clearInterval(intervalId);

        var total = prizes.reduce((total, prize) => total + prize.count, 0);
        var random = Math.floor(Math.random() * total);
        var prizeId = prizes.find(prize => {
            random -= prize.count;
            return random < 0;
        }).id;

        var prizeIndex = prizes.findIndex(prize => prize.id === prizeId);
        if (prizeIndex !== -1) {
            showPrize(prizeIndex);
            document.getElementById('draw-result').innerText = '恭喜你中奖了！';
        } else {
            document.getElementById('draw-result').innerText = '抱歉，未找到对应奖品';
        }
        isDrawing = true;
    }
});
