import $ from 'jquery'

console.log('hej')

const $techStack = $('.tech-stack'),
    $techStack_h = $techStack.find('.tech-stack-heading'),
    $tech_rows = $techStack.find('.tech-stack-row'),
    $techStack_cards = $techStack.find('.tech-stack-item'),
    $w_h = $(window).height();

const t = document.querySelectorAll('.tech-stack-item-content');

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
    const sectionTop = $techStack_h
            .offset()
            .top,
        $w = $(this),
        $top = $(document).scrollTop();

    sectionTop - $w_h / 1.3 < $top && !$techStack_h.hasClass('open') && $techStack_h.addClass('open');

    $techStack_cards.each((i, item) => {

        const $item = $(item),
            time = i % 4,

            trigger = (time, item) => {
                setTimeout(() => {
                    item.removeClass('unseen');
                }, time * 300)
            };

        $item
            .offset()
            .top - $w_h / 1.2 < $top && trigger(time, $item);
    });
});
