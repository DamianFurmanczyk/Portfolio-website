import $ from 'jquery'

const $header = $('.header'),
    $header_w = $header.width(),
    $header_h = $header.height();

$header.on('mousemove', function (e) {
    if (e.target != this) 
        return;
    
    let newBgPosX = ($header_w / 2 - e.offsetX) / 40;
    let newBgPosY = ($header_h / 2 - e.offsetY) / 5;

    $header.css('background-position', `${ 50 - newBgPosX}% ${ 50 - newBgPosY}%`);
});