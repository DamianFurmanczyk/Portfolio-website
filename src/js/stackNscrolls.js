import $ from 'jquery'

console.log('hej')

const $techStack = $('.tech-stack'),
    $tech_rows = $techStack.find('.tech-stack-row'),
    $techStack_cards = $techStack.find('.tech-stack-item'),
    $w_h = $(window).height();

const t = document.querySelectorAll('.tech-stack-item-content'),
    headings = document.querySelectorAll('.section-name');

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
        : t.parentNode.classList.remove('filter'))
}));

$(window).on('scroll', () => {
    const $top = $(document).scrollTop();

    headings.forEach(heading => {
        const $h = $(heading),
            sectionTop = $h
                .offset()
                .top;
        sectionTop - $w_h / 1.3 < $top && !$h.hasClass('open') && $h.addClass('open');
    });

    $techStack_cards.each((i, item) => {

        const $item = $(item),
            time = i % 4,

            trigger = (time, item) => {
                setTimeout(() => {
                    item.removeClass('unseen');
                }, time * 450);
            };

        $item
            .offset()
            .top - $w_h / 1.2 < $top && trigger(time, $item);
    });
});
