import $ from 'jquery'

const $a_lis = $('#nav').find('li'),
    nav_bg = $('.nav-spy');

let current$a = $a_lis.eq(0);

$a_lis.hover($ahover);

$a_lis.click($aclick);

$a_lis.mouseleave($amouseleave);

function $amouseleave() {
    const $this = $(this);

    if (this != current$a[0]) {
        switchNavSpy(current$a);
        $this
            .find('a')
            .removeClass('active');
    }
}

function $aclick(e) {
    e.preventDefault();

    const $this = $(this),
        aPointingSection = $this
            .find('a')
            .attr('href'),
        sectionOffset = $(aPointingSection)
            .offset()
            .top;

    current$a = $this;

    $('html, body').animate({
        scrollTop: sectionOffset - 80
    }, 800);
}

function $ahover() {
    const $this = $(this);

    current$a
        .find('a')
        .removeClass('active');
    switchNavSpy($this);
}

function switchNavSpy($li) {
    const $coords = $li.offset(),
        width = $li.innerWidth(),
        height = $li.innerHeight();
    $li
        .find('a')
        .addClass('active');

    nav_bg.css({height: height, width: width, left: $coords.left});
}

switchNavSpy(current$a);