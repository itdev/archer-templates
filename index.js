$(function() {
  let data = [];

  $.ajax({
    url: 'data.json',
    async: false,
    dataType: 'json',
    success: function(resp) {
      data = resp.data;
    }
  });

  if (data.length === 0) {
    return;
  }

  const dataLength = data.length;
  let isMobile = window.matchMedia('(max-width: 823px)').matches;

  if (!isMobile) {
    if (dataLength && dataLength <= 5) {
      $('.svg-des-container').remove();
      $('.line-des-container').show();

      const items = [];

      $.each(data, function(key, val) {
        items.push(
          `<div id="${key}" class="col p-0">
                <div class="card">
                    <div class="card-body">
                        <p class="card-text text-center text-break">${val.description}</p>
                    </div>
                    <div class="card-footer text-white">
                        <h4 class="card-title text-white">${val.title}</h4>
                    </div>
                </div>
            </div>
          `
        );
      });

      $('<div/>', {
        'class': 'row justify-content-center row-cols-md-3 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-5 mb-3 text-center',
        html: items.join('')
      }).appendTo('.container.line-des-container');
    }

    if (dataLength && dataLength > 5) {
      let items = data;

      if (dataLength === 6) {
        $('.svg-des-container #section-7').remove();
        $('.section.items-eight-qty').remove();
        $('.section.items-six-qty').show();
      }

      if (dataLength && dataLength === 7) {
        $('#section-7').remove();
      }

      if (dataLength && dataLength >= 8) {
        items = data.slice(0, 8);
      }

      $.each(items, function(key, val) {
        const descriptionTextEl = $(`[id^=section-${key}-outer-text]`);
        const titleTextEl = $(`[id^=section-${key}-inner-text]`);

        const tspanItems = [];

        const parsedOnPhrasesDescriptionArr = getPhrases(val.description, 3);

        let parsedData = parsedOnPhrasesDescriptionArr;

        if (parsedOnPhrasesDescriptionArr.length > 8) {
          parsedData = parsedOnPhrasesDescriptionArr.slice(0, 8);
          const lastDataString = parsedData[parsedData.length - 1].concat('...');
          parsedData.splice(parsedData.length - 1, 1, lastDataString);
        }

        let tspanXAttrValue = 115;

        $.each(descriptionTextEl, function() {
          const bodyTextId = $(this).attr('id');

          switch (bodyTextId) {
            case 'section-3-outer-text':
              tspanXAttrValue = 190;
              break;
            case 'section-5-outer-text':
              tspanXAttrValue = 210;
              break;
            case 'section-6-outer-text':
              tspanXAttrValue = 103;
              break;
            case 'section-7-outer-text':
              tspanXAttrValue = 490;
              break;
            case 'section-4-outer-text':
            case 'section-3-outer-text-six-qty':
              tspanXAttrValue = 195;
              break;
            case 'section-4-outer-text-six-qty':
              tspanXAttrValue = 300;
              break;
            case 'section-5-outer-text-six-qty':
              tspanXAttrValue = 120;
              break;
          }
        });

        $.each(parsedData, function(pKey, pVal) {
          tspanItems.push(
            `<tspan x=${tspanXAttrValue} dy="1.2em">${pVal}</tspan>`
          );
        });

        descriptionTextEl.html(tspanItems.join(''));
        titleTextEl.text(val.title);
      });
    }

    $('g.section').hover(
      function() {
        $(this).appendTo('#loop');
      }
    );
  }

  if (isMobile) {
    $(`path#connect-line-${dataLength}`).show();
    $(`path:not(#connect-line-${dataLength})`).remove();

    if (dataLength < 8) {
      const lastActiveBullet = $(`.svg-des-container #mobile #bullet-line g#section-${dataLength}`);
      lastActiveBullet.nextAll('g.section').remove();
    }

    const items = data.slice(0, dataLength);
    $.each(items, function(iKey, iVal) {
      const titleTextEl = $(`#section-${iKey}-title-text`);
      const descriptionTextEl = $(`#section-${iKey}-description-text`);

      const mobileTspanItems = [];

      const parsedOnPhrasesDescriptionArr = getPhrases(iVal.description, 4);

      let parsedData = parsedOnPhrasesDescriptionArr;

      if (parsedOnPhrasesDescriptionArr.length > 7) {
        parsedData = parsedOnPhrasesDescriptionArr.slice(0, 7);
        const lastDataString = parsedData[parsedData.length - 1].concat('...');
        parsedData.splice(parsedData.length - 1, 1, lastDataString);

      }

      $.each(parsedData, function(pKey, pVal) {
        mobileTspanItems.push(
          `<tspan x="40" dy="1.2em">${pVal}</tspan>`
        );
      });

      descriptionTextEl.html(mobileTspanItems.join(''));
      titleTextEl.text(iVal.title);
    });
  }

});

function getPhrases(text, wordsPerPhrase) {
  const words = text.split(/\s+/);
  const result = [];
  for (let i = 0; i < words.length; i += wordsPerPhrase) {
    result.push(words.slice(i, i + wordsPerPhrase).join(' '));
  }
  return result;
}
