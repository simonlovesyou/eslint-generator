window.addEventListener('load', () => {
  let $rules= $('#rules');
  $rules.children('div').find('div > input').click((e) => {

    let $ul = $(e.currentTarget).parent().parent().children('ul').children();
    $ul.each((index, li) => {
      $(li).find('input').prop('checked', e.currentTarget.checked);
    });
  });

  $(".container > .row > div > div > .row > h3 > a").click(event => {
    $(event.currentTarget).parent().parent().parent().find('ul').toggle();
  });
});

