import $ from 'jquery';

const $a_lis = $('#nav').find('li'),
    nav_bg = $('.nav-spy'),
    nav_ul_box = $('#nav-ul-box');

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

    if (navigatingFlag) 
        return false;
    
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

    setTimeout(() => navigatingFlag = false, 610 + time);
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

function switchNavSpy($li, throughScrollingFlag = false) {

    const $coords = $li.offset(),
        width = $li.innerWidth(),
        height = $li.innerHeight(),
        open = nav_ul_box.hasClass('open');

    if (throughScrollingFlag) {
        $a_lis
            .find('a')
            .removeClass('active');
    }

    $li
        .find('a')
        .addClass('active');

    nav_bg.css({
        height: height,
        width: open
            ? width - 80
            : width - 20,
        left: open
            ? $coords.left + 40
            : $coords.left - 10,
        top: open
            ? $li
                .position()
                .top + 75
            : 0
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

//
//
//
//
//

const $techStack = $('#stack'),
    $tech_rows = $techStack.find('.tech-stack-row'),
    $techStack_cards = $techStack.find('.tech-stack-item'),
    $w_h = $(window).height(),
    $showcase_tiles = $('#showcase').find('.project-tile'),
    $sections = $('#header, #about, #showcase, #stack'),
    $main = $('#main');

const t = $techStack[0].querySelectorAll('.tech-stack-item-content'),
    // techStackItem^
    headings = document.querySelectorAll('.section-name');

console.log($('body'));

function toggleCard(card) {
    const dl = card.querySelector('.tech-item-box');

    if (card.classList.contains('hovered')) {
        card
            .classList
            .remove('hovered');
        if (!dl) 
            return;
        dl
            .classList
            .remove('active');

        if (dl.classList.contains('trans')) {
            dl
                .classList
                .remove('trans');
        }
        return;
    }

    card
        .classList
        .add('hovered');

    if (!dl) 
        return;
    
    dl
        .classList
        .add('active');

    setTimeout(() => {
        dl
            .classList
            .add('trans');
    }, 100);
}

t.forEach(tile => tile.addEventListener('mouseenter', function (e) {
    t.forEach(t => t == e.target
        ? toggleCard(t.parentNode)
        : t.parentNode.classList.add('filter'))
}));

t.forEach(tile => tile.addEventListener('mouseleave', function (e) {
    t.forEach(t => t == e.target
        ? toggleCard(t.parentNode)
        : t.parentNode.classList.remove('filter'));
}));

$(window).on('scroll', () => {
    const $top = $(document).scrollTop(),
        WinnHigh = window.innerHeight,
        WsY = window.scrollY,
        docHeight = document.body.offsetHeight;

    $sections.each((i, section) => {
        if (navigatingFlag) {
            return false;
        }

        const $this = $(section),
            sectionDistance = $this
                .offset()
                .top,
            height = $this.innerHeight();

        if ($top + ($w_h / 10) > sectionDistance && $top < sectionDistance + height) {
            const nav_li = WinnHigh + WsY - $('#footer').height() / 1.4 >= docHeight
                ? $('[href="#footer"]').parent('li')
                : $(`[href="#${$this.attr('id')}"]`).parent('li');

            switchNavSpy(nav_li, true);
            current$a = nav_li;
        }
    });

    headings.forEach(heading => {
        const $h = $(heading),
            sectionTop = $h
                .offset()
                .top;

        sectionTop - window.outerHeight / 1.5 < $top && !$h.hasClass('open') && $h.addClass('open');
    });

    $techStack_cards.each((i, item) => {
        $showcase_tiles.each((i, item) => {
            const $item = $(item),

                trigger = (item) => {
                    item.addClass('active');
                };

            $item
                .offset()
                .top - window.outerHeight / 2 < $top && trigger($item);
        });

        const $item = $(item),
            time = i % 4,

            trigger = (time, item) => {
                setTimeout(() => {
                    item.removeClass('unseen');
                }, time * 450 + 200);
            };

        $item
            .offset()
            .top - window.outerHeight / 1.5 < $top && trigger(time, $item);
    });
});
