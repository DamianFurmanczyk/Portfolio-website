import $ from 'jquery'

const $a_lis = $('#nav').find('li'),
    nav_bg = $('.nav-spy');

let current$a = $a_lis.eq(0),
    navigatingFlag = false;

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

    navigatingFlag = true;

    const $this = $(this),
        time = Math.abs(current$a.index() - $this.index()) * 300,
        aPointingSection = $this
            .find('a')
            .attr('href'),
        sectionOffset = $(aPointingSection)
            .offset()
            .top;

    current$a = $this;

    $('html, body').animate({
        scrollTop: aPointingSection == '#footer'
            ? $('body').height()
            : sectionOffset - 105
    }, 600 + time);
}

function $ahover() {
    const $this = $(this);
    if (this == current$a[0]) 
        return;
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

    nav_bg.css({
        height: height,
        width: width - 20,
        left: $coords.left - 10
    });
}

switchNavSpy(current$a);

$(window).resize(() => {
    switchNavSpy(current$a);
    adjustFooter();
});

function adjustFooter() {
    $('#main').css('margin-bottom', $('#footer').height());
}

adjustFooter();