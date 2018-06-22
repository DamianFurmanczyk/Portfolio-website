import $ from 'jquery';

const footer = document.querySelector('#footer'),
    main = document.querySelector('main'),
    $footer = $(footer),
    $main = $(main),
    $footer_form = $footer.find('form');

$main.css('margin-bottom', $footer.outerHeight());

$footer_form.on('submit', footerForm_submit);

function footerForm_submit(e) {
    e.preventDefault();

    const data = $(this).serialize();

    const status = $.ajax({url: 'https://blogspot-node.herokuapp.com/email', type: 'POST', data});
}