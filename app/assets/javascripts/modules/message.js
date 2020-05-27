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
  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('actiion');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-contents').append(html);
      $('.form')[0].reset();
      $('.main-contents').animate({scrollTop: $('.main-contents')[0].scrollHeight});
      $('.form-btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});