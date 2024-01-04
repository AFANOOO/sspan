// ==UserScript==
// @name              百度网盘不限制下载-神速Down6.1
// @namespace         https://github.com/AFANOOO/sspan
// @version           6.1
// @author            GreasyFork
// @description       不限制速度下载的百度网盘解析脚本，无视黑号，拥有IDM/Aria2/Motrix三种方式任意体验极速下载！ 面向所有网友免费交流学习使用，更多功能正在完善中...
// @license           AGPL-3.0-or-later
// @icon              https://vitejs.dev/logo.svg
// @match             *://pan.baidu.com/*
// @match             *://yun.baidu.com/*
// @connect           localhost
// @connect           127.0.0.1
// @connect           baidu.com
// @connect           sswpdd.xyz
// @require           https://lib.baomitu.com/layui/2.9.3/layui.min.js
// @require           https://lib.baomitu.com/layui/2.9.3/layui.js
// @resource          customCSS https://lib.baomitu.com/layui/2.9.3/css/layui.css
// @grant             GM_xmlhttpRequest
// @grant             GM_addStyle
// @grant             GM_getResourceText
// ==/UserScript==


var siteUrl = 'https://sswpdd.xyz';




$(function(){

    setInterval(function(){
        if($('.layui-layer-close').length>0){
            $('.layui-layer-close').html('<img src="https://s11.ax1x.com/2024/01/04/pivY2VA.png" style="position: absolute; width: 14px; left: 4px; top: 4px;">');
        }
    },100);

    var closeimg = 'https://s11.ax1x.com/2024/01/04/pivYEjg.png';

    const css = GM_getResourceText("customCSS");
    GM_addStyle(css);

    if(!localStorage['jsonrpc']){
        localStorage['jsonrpc'] = 'http://localhost:6800/jsonrpc';
    }

    $('head').append(`
      <style>
      .pincode-input{width:38px;height:38px;line-height:50px;border-radius:3px;border:2px solid gray;text-align:center;font-size:1.5rem}.pincode-input:not(:last-child){margin-right:1rem}.pincode-input.pincode-input--focused{border-color:#000}.pincode-input.pincode-input--filled{border-color:dodgerblue}
      .layui-layer-setwin .layui-layer-close2 {
      position: absolute;
      right: -5px!important;
      top: -5px!important;
      }
      .layui-layer-close::before {
        content: none!important;
    }

      .swal2-container{
      z-index: 999999999;
      }
      .swal2-popup{
      padding-top: 20px!important;
      justify-items: center!important;
      }
      .blockquote {
      display: inline-block;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      }
      .layui-tab .layui-tab-title{
        border-bottom-width: 0;
      }
      .layui-tab-brief>.layui-tab-title li {
      color:#6a6a6a;
      font-weight: 700;
      font-size: 16px;
      }
      .layui-tab-brief>.layui-tab-title .layui-this {
      color: #2196f3;
      font-weight: 700;
      font-size: 16px;
      }
      .layui-tab-brief>.layui-tab-more li.layui-this:after, .layui-tab-brief>.layui-tab-title .layui-this:after {
      border: none;
      border-radius: 0;
      width: 50%;
      left: 25%;
      border-bottom: 5px solid #2196f3;
      }
      .layui-tab{
      margin:0;
      }
      .layui-tab-title{
      background: #fff;
      }
      .layui-layer-page{
      border-radius: 25px;
      }
      .demo{
      display:none;
      margin-top: 12px;
      }

      #popup{
      width: 320px;
      height: 195px;
      position: absolute;
      right: 6px;
      bottom: 58px;
      border: 1px solid #000;
      background-color: #fff;
      display: none;
      }
      #dialogDivSavePath {
      text-align: left;
      line-height: 23px;
      position: absolute;
      padding: 15px;
      color: rgba(0,0,0,.86);
      }
      .layui-btn-sm{
      height:45px;
      line-height:30px;
      padding:0 15px;
      font-size:14px;
      }
      .piao{
      background-image: linear-gradient(90deg, rgb(114, 9, 212), rgb(40, 50, 212) 33%, rgb(0, 165, 178));
      color: rgba(0, 0, 0, 0);
      -webkit-background-clip: text;
      font-style: normal;
      }
      .layui-layer-content{
      overflow: hidden!important;
      }
    </style>`);



    var UA;
    var password = '6688';
    // var requestTimeouts = 20000;
    // var timeoutId = setTimeout(function () {
    //     Swal.fire({
    //         title: '系统提示',
    //         text: '初始化脚本失败，可能后台无法通讯，也有可能正在被攻击。建议查看公告或者群消息获取最新信息。',
    //         icon: 'error'
    //     });
    // }, requestTimeouts);


    let configDefault = {
        savePath: localStorage['savePath'] || 'D:\\Download',
        jsonRpc:  localStorage['jsonRpc'] || 'http://localhost:6800/jsonrpc',
        token: localStorage['token'] || '',
        mine: localStorage['mine'] || '',
        code: '',
    };

  // Usage
  layui.use(['layer', 'element'],function(){
    var layer = layui.layer;
    var element = layui.element;

    $('.wp-s-agile-tool-bar__header.is-header-tool').prepend('<div class="wp-s-agile-tool-bar__h-group"><button style="    margin-right: 10px;" id="downbtn" class="u-button nd-file-list-toolbar-action-item is-need-left-sep u-button--primary u-button--default u-button--small is-has-icon  u-button--danger"><i class="iconfont icon-download"></i> <span>神速Down</span></button></div>');

    if(self == top){
      $('body').append(`
      <div id="loadingtext" style=" display:none;padding: 1px;background: rgb(255 255 255);position: absolute;z-index: 2147483647;text-align: center;top: 57%;font-weight: 500;color: rgb(3, 169, 244);font-size: 25px;left: 50%;transform: translate(-50%, -50%);">加载中</div>`);
    }

    var html = `
          <div>
          <div class="layui-tab layui-tab-brief" style="padding: 22px;">
          <ul class="layui-tab-title">
            <li class="layui-this">首页</li>
            <li>外部资源</li>
            <li>版本更新</li>
          </ul>
          <div class="layui-tab-content">
            <div class="layui-tab-item layui-show" style="padding:0 15px;">

              <div class="layui-card">
                  <div class="layui-card-body">
                    <div>
                      <p style=" color: #b4b4b4; font-size: 16px;">当前文件</p>
                      <p id="curname" style="width:86%;" class="blockquote"></p>
                      <button type="button" id="deal" class="layui-btn" style="position: absolute; right: 0;top: 15px; background:#2196f3;" ><img src="https://s11.ax1x.com/2024/01/04/pivNAmQ.png" style=" width: 15px;">  解析</button>
                    </div>

                  </div>
              </div>

            <div class="layui-row layui-col-space15">
                <div class="layui-col-md6 layui-col-sm6">
                  <div class="layui-card">
                    <div class="layui-card-body" style="text-align:center;height: 428px;">
                      <img src="https://sswpdd.xyz/ewm.jpg" style="width:240px;height:240px;">
                      <h2 style="margin-top: 10px;">扫一扫不失联</h2>
                      <h3>发送 <span class="piao">免费白嫖</span></h3>
                      <h3>四个字获取暗号/无套路</h3>
                      <div class="demo"><div class="pincode-input-container"></div></div>
                      <div id="popup" class="hidden">
                      <div class="content">
                          <div id="dialogDivSavePath">
                          <span> 保存路径：</span><input type="text" id="dialogTxtSavePath" value="${configDefault.savePath}" style="width: 170px;border: 1px solid #8b8b8b;"><br>
                                  <span id="dialogAriaConfigClick" style="    color: #2196f3;">配置Aria2&gt;&gt;</span>
                                <div id="dialogAriaConfig" style="display: none;">
                                    <input type="text" id="dialogAriaRPC" value="${configDefault.jsonRpc}" title="RPC地址" placeholder="RPC地址" style="width: 100%;    border: 1px solid #8b8b8b;">
                                    <input type="text" id="dialogAriaToken" value="${configDefault.token}" title="token" placeholder="token" style="width: 77px;    border: 1px solid #8b8b8b;">
                                    <br>
                                    <input type="checkbox" id="dialogAriaMine" ${configDefault.mine=='checked'?'checked':''}>
                                    <span>使用自己的Aria2/Motrix（如不懂，勿勾选）</span>
                          <span class="bcsp">Motrix默认地址:</span><span>http://localhost:16800/jsonrpc </span>
                          <br>
                          <span class="bcsp">Aria2默认地址:</span><span>&nbsp;&nbsp;http://localhost:6800/jsonrpc </span>
                                </div>
                            </div>
                          </div>
                      </div>


                <img src="https://s11.ax1x.com/2024/01/04/pivJjje.png" id="setoption" style=" position: absolute;cursor: pointer; font-size: 22px; right: 15px; bottom: 20px;    width: 38px;">
              </div>
            </div>
          </div>
          <div class="layui-col-md6 layui-col-sm6">
            <div class="layui-card">
              <div class="layui-card-body" style=" height: 428px;">
                <h1 style="line-height: 40px;    margin-bottom: 10px;">IDM</h1>
                <p>
                   选项 ->下载->手动添加任务时使用的用户代理(UA) ->填入 Logstatistic。在IDM新建任务，粘贴饪接即可下载，
                </p>
                <button class="layui-btn layui-btn-sm layui-btn-disabled" style="margin-top: 10px;background:#2196f3;" id="copy"><img src="https://s11.ax1x.com/2024/01/04/pivJjje.png" style="  width: 18px;"> 复制链接</button>
                <hr style="margin: 23px 0;">
                <h1 style="line-height: 40px;    margin-bottom: 10px;">Aria2</h1>
                <p>
                  点击 推送到 Aria2(Motrix)将自动下载，支持Windows/Android。
                </p>
                <button class="layui-btn layui-btn-sm layui-btn-disabled" style="margin-top: 10px;background:#2196f3;" id="pusharia"><img src="https://s11.ax1x.com/2024/01/04/pivJjje.png" style="  width: 18px;"> 推送至Aria2</button>

                <button type="button" class="layui-btn layui-btn-primary layui-btn-xs" style="margin: 10px 0 0 0;">下载速度因人而异，特别是共享网络（如校园网）</button>


                </div>
              </div>
            </div>
          </div>

          </div>
          <div class="layui-tab-item">
            <p style="text-align:center;">开发中...</p>
          </div>
          <div class="layui-tab-item">
            <p style="text-align:center;">开发中...</p>
          </div>
        </div>
        </div>
      </div>
    `;

    $('#downbtn').click(function(){

      var htmlString = $("html").html();
      var regex = /"bdstoken":"(\w+)"/;
      var match = regex.exec(htmlString);
      var bdstoken = match[1];
      var selectedIds = [];
      var downlist = [];
      $('tr.selected').each(function () {
          var dataId = $(this).data('id');
          selectedIds.push(dataId);
      });
      $('.mouse-choose-box .is-checked').each(function() {
          let dataId = $(this).data('id');
          if (dataId) {
              selectedIds.push(dataId);
          }
      });
      if( $('tr.selected img[src*="ceH8M5EZYnGhnBKRceGqmaZXPPw2xbO+1x"]').length>0){
          Swal.fire({
              title: '系统提示',
              text: '请不要选择文件夹解析,因为还没学会.',
              icon: 'error'
          });
          return;
      }
      if (selectedIds.length === 0) {
          Swal.fire({
              title: '系统提示',
              text: '请选择需要下载的文件',
              icon: 'error'
          });
          return;
      }
      var index = layer.open({
            type:1,
            closeBtn:2,
            title:'',
            shadeClose: true,
            area:['850px','600px'],
            content:html,
            success:function(index){
                $('#loadingtext').text('');

                password='';
                UA = 'netpan';
                new PincodeInput('.pincode-input-container',{count:4,secure:false,previewDuration:200,onInput:(value) =>{
                    console.log(value)
                    if(value.length==4){
                        $('.demo').hide();
                        layer.load(2,{
                            shade: [0.3, '#FFF'],
                        });
                        $('#loadingtext').show();
                        download_function(value);
                    }
                }})

                $('#jsonrpc').val(localStorage['jsonrpc']);

                element.init();

                var selectedone = [];
                $('tr.selected').each(function(index,item){
                    selectedone.push($(item).find('td').eq(1).find('a').attr('title'));
                });
                var text = ( selectedone+'等'+$('tr.selected').length+'个文件...');
                $('#curname').text(selectedone.join('、'));


                $('#deal').click(function(){
                    layer.load(2,{
                        shade: [0.3, '#FFF'],
                    })
                       $('#loadingtext').show();
                    download_function();
                });
                $('#copy').click(function(){
                    if(!$(this).hasClass('layui-btn-disabled')){
                        const el = document.createElement('textarea');
                        el.value = $(this).attr('data-url');
                        document.body.appendChild(el);
                        el.select();
                        document.execCommand('copy');
                        document.body.removeChild(el);
                        layer.msg('已复制');
                    }
                });
                $('#pusharia').click(function(){
                    if(!$(this).hasClass('layui-btn-disabled')){
                        var url = $(this).attr('data-url');
                        sendAria2(url);
                    }
                });

                $('#savejsonrpc').click(function(){
                    localStorage['jsonrpc'] = $('#jsonrpc').val();
                    layer.msg('已保存');
                });

                $('#setoption').click(function(){
                    $('#popup').toggle();
                });
                $('#dialogAriaConfigClick').click(function(){
                    $('#dialogAriaConfig').toggle();
                });


            }
        });
        layer.style(index, {
            //background: '#4caf50',
        });
    });

  });

  function saveLastUseData() {
        localStorage.setItem('savePath', $("#dialogTxtSavePath").val());
        localStorage.setItem('jsonRpc', $("#dialogAriaRPC").val());
        localStorage.setItem('token', $("#dialogAriaToken").val());
        let mine = "";
        if ($("#dialogAriaMine").prop("checked") == true) {
            mine = "checked";
        }
        localStorage.setItem('mine', mine);
  }
  function sendAria2(url){

      layer.load(2,{
          shade: [0.3, '#FFF'],
      })
          let rpcDir = ($("#dialogTxtSavePath").val()).replace(/\\/g, '/');
          let rpcHostUrl = $("#dialogAriaRPC").val();
          let rpcToken = $("#dialogAriaToken").val();
          var ddconfig = {
              "id":"shensuDown",
              "jsonrpc": "2.0",
              "method": "aria2.addUri",
              "params":[
                  [
                      url
                  ],
                  {
                      "max-connection-per-server":16,
                      "dir":rpcDir,
                      "out":$('#curname').text(),
                      "user-agent": "LogStatistic"
                  }
              ]
          }
          let data = JSON.stringify(ddconfig);
          //发送至aria2
          let details = {
              method: 'POST',
              responseType: 'json',
              timeout: 5000, // 3秒超时
              url: rpcHostUrl,
              data: data,
              onload: function (res) {
                  if (res.status === 200) {
                      layer.closeAll('loading');
                        $('#loadingtext').hide();
                      if (res.response.result) {
                          // 正常返回

                          Swal.fire({
                              title: '系统提示',
                              text: '推送成功',
                              icon:'success'
                          });
                      } else {
                          // 其它错误
                          Swal.fire({
                              title: '系统提示',
                              text: '发生错误,请关闭窗口重试1',
                              icon:'error'
                          });
                      }
                  } else {
                          Swal.fire({
                              title: '系统提示',
                              text: '发生错误,请关闭窗口重试2'+res.responseText,
                              icon:'error'
                          });
                  }
              },
              ontimeout: (res) => {
               layer.closeAll('loading');
                        $('#loadingtext').hide();
                  Swal.fire({
                      title: '系统提示',
                      text: '连接到RPC服务器超时：请检查Aria2是否已连接，RPC配置是否正确！',
                      icon:'error'
                  });
              },
              onerror: (res) => {
              layer.closeAll('loading');
                        $('#loadingtext').hide();
                  Swal.fire({
                      title: '系统提示',
                      text: '发送至Aria2时发生错误，请重试！'+res.responseText,
                      icon:'error'
                  });
              }
          };
          try {
              GM_xmlhttpRequest(details);
          } catch (error) {
              layer.closeAll('loading');
                        $('#loadingtext').hide();
              Swal.fire({
                  title: '系统提示',
                  text: '发生错误,请关闭窗口重试！',
                  icon:'error'
              });
          }
  }
  function sendMotrix(url) {
      var jsonrpcData = {
          jsonrpc: '2.0',
          id: '1',
          method: 'aria2.addUri',
          params: [
              [url],
              {
                  "header": ["User-Agent: " + UA]
              }
          ]
      };

      $.ajax({
          url: 'http://localhost:16800/jsonrpc',
          type: 'POST',
          data: JSON.stringify(jsonrpcData),
          contentType: 'application/json',
          success: function (response) {
              Swal.fire('发送Motrix成功', '请检查你的下载任务', 'success');
          },
          error: function (error) {
              Swal.fire('发送错误！', '你可能没有安装或运行下载器!如果已经安装并运行,请尝试重启它,或者检查有没有开启RPC对应端口是否正确,默认Motrix端口为:16800', 'error');
              return;
          }
      });
  }
  var getSelectedList = function () {
      let pType = getCurType();
      if (pType === 'old') {
          return require('system-core:context/context.js').instanceForSystem.list.getSelected();
      }
      if (pType === 'new') {
          let mainList = document.querySelector('.nd-main-list');
          if (!mainList) mainList = document.querySelector('.nd-new-main-list');
          return mainList.__vue__.selectedList;
      }
  }
  var getCurType = function () {
      if (isOPage()) return 'old';
      if (isNPage()) return 'new';
      if (isSharePage()) return 'share';
      return '';
  }
  var isOPage = function () {
      if (document.location.href.indexOf(".baidu.com/disk/home") > 0) {
          return true;
      }
      return false;
  };
  var isNPage = function () {
      if (document.location.href.indexOf(".baidu.com/disk/main") > 0) {
          return true;
      }
      return false;
  };
  var isSharePage = function () {
      let pathurl = document.location.pathname.replace('/disk/', '');
      if (/^\/(s|share)\//.test(pathurl)) {
          return true;
      }
      return false;
  }
  function download_function(password='zzzz') {

     $('#loadingtext').text('');
     //password = anhao||password;
     saveLastUseData();
     $('#loadingtext').text('正在分享文件...');
     if(!$('#copy').hasClass('layui-btn-disabled')){
         $('#copy').addClass('layui-btn-disabled');
     }
     if(!$('#pusharia').hasClass('layui-btn-disabled')){
         $('#pusharia').addClass('layui-btn-disabled');
     }
    var htmlString = $("html").html();
    var regex = /"bdstoken":"(\w+)"/;
    var match = regex.exec(htmlString);
    var bdstoken = match[1];
    var selectedIds = [];
    var downlist = [];

     var filelists = getSelectedList();
     for(var i=0;i<filelists.length;i++){
        selectedIds.push(filelists[i].fs_id);
     }
     //SubStrString(theFile.server_filename, 35)

    /*$('tr.selected').each(function () {
        var dataId = $(this).data('id');
        selectedIds.push(dataId);
    });
    $('.mouse-choose-box .is-checked').each(function() {
        let dataId = $(this).data('id');
        if (dataId) {
            selectedIds.push(dataId);
        }
    });*/

     console.log('selectedIds------->>>>',selectedIds)

    $.post("https://pan.baidu.com/share/set?channel=chunlei&bdstoken=" + bdstoken + "", "period=1&pwd=" + password + "&eflag_disable=true&channel_list=%5B%5D&schannel=4&fid_list=[" + selectedIds + "]", function (res) {
        if (res.show_msg == "该文件禁止分享") {
            layer.closeAll('loading');
                      $('#loadingtext').hide();
            $('#texttip').val('违规文件，不能进行下载');
            Swal.fire("错误！", "所选择的文件中包含违规文件，不能进行下载", "error");
            return;
        }
        var url = res.link;
        console.log(res,password)
        //siteUrl +/parse/listpost surl=百度地址1&pwd=百度密码&password=站点密码
        var shorturl='';
        try{
        shorturl = url.substring(url.lastIndexOf('/') + 1);
        }catch(e){console.log(e)}
        if(!shorturl){
            layer.closeAll('loading');
                      $('#loadingtext').hide();
            Swal.fire("错误！", res.msg, "error");
            return;
        }
        $('#loadingtext').text('正在查询服务器接口地址......');
        GM_xmlhttpRequest({
            method: "post",
            url: siteUrl+'/parse/list',
            data: "surl=" + shorturl +"&pwd=" + password + "&password=" + password + "",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function (response) {
                //clearTimeout(timeoutId);
                if (response.status == 200) {
                    const getres = JSON.parse(response.responseText);
                    console.log('getres------->',getres);
                    if(getres.error == -1 || getres.error == 1 ){ //系统维护
                        layer.closeAll('loading');
                      $('#loadingtext').hide();
                        $('#texttip').val('系统维护中...');
                        Swal.fire({
                            title: '系统提示',
                            text: getres.msg,
                            icon: 'error'
                        });
                    }else if(getres.error == 101){
                        layer.closeAll('loading');
                      $('#loadingtext').hide();
                        $('#texttip').val(getres.err);
                        Swal.fire({
                            title: '系统提示',
                            text: getres.err,
                            icon: 'error'
                        });
                        $('.demo').show();
                    } else if(getres.error == 1012){ //系统维护
                        layer.closeAll('loading');
                      $('#loadingtext').hide();
                        $('#texttip').val('系统维护中...');
                        Swal.fire({
                            title: '系统提示',
                            text: getres.err,
                            icon: 'error'
                        });
                    }else if(getres.error == 1011){ //系统维护
                        layer.closeAll('loading');
                      $('#loadingtext').hide();
                        $('#texttip').val('系统维护中...');
                        Swal.fire({
                            title: '系统提示',
                            text: getres.err,
                            icon: 'error'
                        });
                    } else if (getres.error == 0) {

                      //  $('#loadingtext').text('正在查询服务器接口地址......');
                        var data_ = getres.dirdata
                        var data__ = getres.filedata[0]

                        GM_xmlhttpRequest({
                            method: "POST",
                            url: siteUrl+"/parse/link",
                            data:"fs_id="+data__.fs_id+"&timestamp="+data_.timestamp+"&sign="+data_.sign+"&randsk="+data_.randsk+"&shareid="+data_.shareid+"&surl="+data_.surl+"&pwd="+data_.pwd+"&uk="+data_.uk,
                            responseType: 'json',
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            onload: function (ress) {
                                layer.closeAll('loading');
                                $('#loadingtext').hide();
                                console.log('ress------->>>',ress)
                                if(ress.response.error == 0){
                                    let downlink = ress.response.directlink;
                                    $('#texttip').val('解析成功');


                                    Swal.fire('解析成功', '请复制链接或推送aria', 'success');
                                    $('#copy').removeClass('layui-btn-disabled').attr('data-url',downlink);
                                    $('#pusharia').removeClass('layui-btn-disabled').attr('data-url',downlink);


                                } else {

                                    Swal.fire({
                                        title: '系统提示',
                                        text: ress.response.msg,
                                        icon: 'error'
                                    });

                                }
                            }
                        });

                    } else {
                        throw res;
                    }

                }

            }
        })

    })
  }

  // 密码框
  ;var PincodeInput=function(){return function(){function b(c,p){var o=p.count,e=void 0===o?4:o,i=p.secure,n=void 0!==i&&i,l=p.previewDuration,a=void 0===l?200:l;this.args=p,this.selector=document.querySelector(c),this.count=e,this.secure=n,this.previewDuration=a,this.cells=[],this.focusedCellIdx=0,this.value="",this.setCells()}return b.prototype.setCells=function(){for(var a=0;a<this.count;a++){var d=document.createElement("input");d.classList.add("pincode-input"),this.cells.push(d),this.selector.appendChild(d)}this.initCells()},b.prototype.initCells=function(){var a=this;this.cells.forEach((function(f,e){f.addEventListener("input",(function(d){var c=d.currentTarget.value;a.onCellChanged(e,c,d)})),f.addEventListener("focus",(function(){a.focusedCellIdx=e})),f.addEventListener("keydown",(function(c){a.onKeyDown(c,e),"ArrowLeft"!==c.key&&"ArrowRight"!==c.key&&"ArrowUp"!==c.key&&"ArrowDown"!==c.key&&"Backspace"!==c.key&&"Delete"!==c.key&&a.cells[e].setAttribute("type","text")})),f.addEventListener("focus",(function(){f.classList.add("pincode-input--focused")})),f.addEventListener("blur",(function(){f.classList.remove("pincode-input--focused")}))}))},b.prototype.onCellChanged=function(a,h,g){var e=this;if(!this.isTheCellValid(h)){return this.cells[a].classList.remove("pincode-input--filled"),this.cells[a].value="",void this.getValue()}this.cells[a].classList.add("pincode-input--filled"),this.secure&&this.previewDuration&&setTimeout((function(){e.cells[a].setAttribute("type","password")}),this.previewDuration),this.getValue(),this.focusNextCell()},b.prototype.onKeyDown=function(a,d){switch(a.key){case"ArrowLeft":this.focusPreviousCell();break;case"ArrowRight":this.focusNextCell();break;case"Backspace":this.cells[d].value.length||this.onCellErase(d,a)}},b.prototype.onCellErase=function(a,d){this.cells[a].value.length||(this.focusPreviousCell(),d.preventDefault())},b.prototype.focusPreviousCell=function(){this.focusedCellIdx&&this.focusCellByIndex(this.focusedCellIdx-1)},b.prototype.focusNextCell=function(){this.focusedCellIdx!==this.cells.length-1&&this.focusCellByIndex(this.focusedCellIdx+1)},b.prototype.focusCellByIndex=function(a){void 0===a&&(a=0);var d=this.cells[a];d.focus(),d.select(),this.focusedCellIdx=a},b.prototype.isTheCellValid=function(a){return !!a.match("^\\d{1}$")},b.prototype.getValue=function(){var a=this;this.value="",this.cells.forEach((function(d){a.value+=d.value})),this.args.onInput(this.value)},b}()}();

});
