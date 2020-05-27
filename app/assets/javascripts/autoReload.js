$(function(){
  function buildHTML(message){
    let image = message.image ? `<img class="message-comment__image" src=${message.image}>` : ``
      let html = `<div class="message">
                    <div class="MessageBox" data-message-id=${message.id}>
                      <div class="message-box">
                        <div class="message-box__group-name">
                          ${message.user_name}
                        </div>
                        <div class="message-box__date">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="message-comment">
                        ${message.body}
                        ${image}
                      </div>
                    </div>
                  </div>`
      return html
  }
  let reloadMessages = function() {
    let last_message_id = $('.MessageBox:last').data("message-id");
    $.ajax ({
      url: "api/messages",
      type: 'get',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-contents').append(insertHTML);
        $('.main-contents').animate({scrollTop: $('.main-contents')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});