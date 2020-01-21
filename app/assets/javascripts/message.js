$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
     var html =
      `<div class="chat-main__message-list__all" data-message-id=${message.id}>
         <div class="chat-main__message-list__all__status">
           <div class="chat-main__message-list__all__status__member">
             ${message.user_name}
           </div>
           <div class="chat-main__message-list__all__status__date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message-list__all__message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat-main__message-list__all" data-message-id=${message.id}>
         <div class="chat-main__message-list__all__status">
           <div class="chat-main__message-list__all__status__member">
             ${message.user_name}
           </div>
           <div class="chat-main__message-list__all__status__date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message-list__all__message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type:'POST',
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__message-list').append(html);
    $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    $('form')[0].reset()
  })
  .fail(function(){
    alert('エラー');
  })
  .always(function () {
    $(".form__submit").removeAttr("disabled");
  });

})

// ↓自動更新の記述
  $(function() {
    var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      // ↓カスタムデータを利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.chat-main__message-list__all').last().attr('data-message-id')
      // console.log(last_message_id)コンソールテスト表示
      $.ajax({
        // ↓ルーティングで設定した通りのurlを設定
        url: "api/messages",
        // ↓ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        // ↓形式をjsonタイプに指定
        dataType: 'json',
        // ↓dataオプションでリクエストに値を含める
        data: {last_id: last_message_id}
      })
      .done(function (messages) {
        // ↓追加するhtmlの入れ物を作る
        var insertHTML = '';
        // ↓配列messagesの中身を一つ一つを取り出し、HTMLに変換したものを入れ物に足し入れる ?
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          // メッセージが入ったHTMLに入れ物ごと追加  ?
          $('.chat-main__message-list').append(insertHTML)
        }) 
        $('.chat-main__message-list').animate({scrollTop: $('.chat-main__message-list')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
  });
});