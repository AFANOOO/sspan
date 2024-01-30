// ==UserScript==
// @name              百度网盘不限制下载-神速Down
// @namespace         https://github.com/AFANOOO/sspan
// @version           6.9
// @author            GreasyFork
// @description       不限制速度下载的百度网盘解析脚本，无视黑号，拥有IDM/Aria2/Motrix三种方式任意体验极速下载！支持Microsoft Edge、Google Chrome、Firefox等浏览器 面向所有网友免费交流学习使用，更多功能正在完善中...
// @antifeature       ads
// @antifeature       membership
// @license           MIT
// @icon              https://vitejs.dev/logo.svg
// @match             *://pan.baidu.com/*
// @match             *://yun.baidu.com/*
// @match             *://pan.baidu.com/disk/home*
// @match             *://yun.baidu.com/disk/home*
// @match             *://pan.baidu.com/disk/main*
// @match             *://yun.baidu.com/disk/main*
// @match             *://pan.baidu.com/s/*
// @match             *://yun.baidu.com/s/*
// @match             *://pan.baidu.com/share/*
// @match             *://yun.baidu.com/share/*
// @connect           localhost
// @connect           127.0.0.1
// @connect           baidu.com
// @connect           sswpdd.xyz
// @require           https://lib.baomitu.com/layui/2.9.3/layui.min.js
// @require           https://lib.baomitu.com/limonte-sweetalert2/11.10.2/sweetalert2.all.min.js
// @require           https://lib.baomitu.com/layui/2.9.3/layui.js
// @resource          customCSS https://lib.baomitu.com/layui/2.9.3/css/layui.css
// @grant             GM_xmlhttpRequest
// @grant             GM_addStyle
// @grant             GM_getResourceText
// @run-at            document-idle
// @downloadURL https://update.greasyfork.org/scripts/480255/%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E4%B8%8D%E9%99%90%E5%88%B6%E4%B8%8B%E8%BD%BD-%E7%A5%9E%E9%80%9FDown.user.js
// @updateURL https://update.greasyfork.org/scripts/480255/%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E4%B8%8D%E9%99%90%E5%88%B6%E4%B8%8B%E8%BD%BD-%E7%A5%9E%E9%80%9FDown.meta.js
// ==/UserScript==


var siteUrl = 'https://sswpdd.xyz';


$(function () {

    function wait(ms) {
        return Promise.resolve(new Promise((resolve) => setTimeout(resolve, ms)));
    }


    var closeimg = 'https://s11.ax1x.com/2024/01/04/pivYEjg.png';

    const css = GM_getResourceText("customCSS");
    GM_addStyle(css);

    if (!localStorage['jsonrpc']) {
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
         z-index: 999999999 !important;
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
       .h1 {
      font-family: PingFangSC-Regular, sans-serif, Microsoft YaHei, SimHei, Tahoma !important;
      font-weight: 700;
      margin-bottom: 16px;
      font-size: 32px;
      line-height: 48px;
        }
      .h2{
      font-size: 21px;
      line-height: 2;
        }
      .h3{
      font-size: 16.38px;
      line-height: 2;
        }
      .layui-card-body{
      position:relative;
      padding:10px 15px;
      line-height:22px;
      }
      .imgset{
     position: absolute;
     cursor: pointer;
     font-size: 9px;
     right: 15px;
     bottom: 23px;
     width: 35px;
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
        savePath: localStorage['savePath'] || 'D:\\SSDOWN',
        jsonRpc: localStorage['jsonRpc'] || 'http://localhost:6800/jsonrpc',
        token: localStorage['token'] || '',
        mine: localStorage['mine'] || '',
        code: '',
    };

    // Usage
    layui.use(['layer', 'element'], async function () {
        var layer = layui.layer;
        var element = layui.element;
        if (location.href.match(/^https:\/\/pan\.baidu\.com\/s\/[^\s]*$/)) {
            //prepend是在最前面添加，加在后面用append
            $('.x-button-box').eq(0).prepend('<a class="g-button g-button-blue" style="background-color: #ff436a;color: #fff;border-color: #ff436a;font-weight:700;" id="downbtn1"  href="javascript:;" ><span class="g-button-right"><em class="icon icon-download" title=""></em><span class="text" style="width: auto;">神速Down</span></span></a>');

        } else if (location.href.startsWith('https://pan.baidu.com/disk/home')) {
            console.log(location.href, 22222222, $('.tcuLAu'));
            await wait(1000);
            $('.tcuLAu').prepend('<a class="g-button  g-button-blue" style="background-color: #ff436a;color: #fff;border-color: #ff436a;font-weight:700;" id="downbtn"  href="javascript:;" ><span class="g-button-right"><em class="icon icon-download" title=""></em><span class="text" style="width: auto;">神速Down</span></span></a>');

        }
        else {
            $('.wp-s-agile-tool-bar__header.is-header-tool').prepend('<div class="wp-s-agile-tool-bar__h-group"><button style="    margin-right: 10px;" id="downbtn" class="u-button nd-file-list-toolbar-action-item is-need-left-sep u-button--primary u-button--default u-button--small is-has-icon  u-button--danger"><i class="iconfont icon-download"></i> <span>神速Down</span></button></div>');

        }

        if (self == top) {
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
                    <div class="layui-card-body" style="text-align:center;height: 426px;">
                      <img src="data:image/jpeg;base64,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Ff1T96/lYoA/qnPNAGK/lYooA/qnx7CjHsK/lYooA/qnJIGcZr+VkjGD70gODRkk0Af1T4yKAAKB0paAExX8rQOa/qmr+Vj0oAXtn07V/VKBx0oxkUAYGBQB/KyBz1pSPWv6pSMiv5Wc0AL06HFJ+Nf1TDpS0AfysY96X8RX9U1FAH8rI6ZzSHg9a/qmIzX8rBOaAFwPWv6pQ2SeO1KRkUYAHFAH8rIXOaCoB60Zxmv6pgMCgBD06V/K4RxTOlf1T460ANPpzX8rZPPX8qTODQTk0Af1TkcdKaDzgCnEZr+VnNAH9UwOa/lYr+qcdq/lYoA/qmboePyoXk8V/KyDg1/VOBigBCdpoHIBxSkZr+VgnJoA/qoooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9k=" style="width:240px;height:240px;">
                      <h2 class="h2"  style="margin-top: 10px;">扫一扫不失联</h2>
                      <h3 class="h3">发送 <span class="piao">免费白嫖</span></h3>
                      <h3 class="h3">四个字获取暗号/测试程序</h3>
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
                                    <input type="checkbox" id="dialogAriaMine" ${configDefault.mine == 'checked' ? 'checked' : ''}>
                                    <span>使用自己的Aria2/Motrix（如不懂，勿勾选）</span>
                          <span class="bcsp">Motrix默认地址:</span><span>http://localhost:16800/jsonrpc </span>
                          <br>
                          <span class="bcsp">Aria2默认地址:</span><span>&nbsp;&nbsp;http://localhost:6800/jsonrpc </span>
                                </div>
                            </div>
                          </div>
                      </div>


                <img class="imgset" src="https://s11.ax1x.com/2024/01/08/pFSYwSx.png" id="setoption" style=" position: absolute;cursor: pointer; font-size: 9px; right: 15px; bottom: 20px;width: 35px;">
              </div>
            </div>
          </div>
          <div class="layui-col-md6 layui-col-sm6">
            <div class="layui-card">
              <div class="layui-card-body" style=" height: 426px;">
                <h1 class="h1" style="line-height: 40px;    margin-bottom: 10px;">IDM</h1>
                <p>
                   选项 ->下载->手动添加任务时使用的用户代理(UA) ->填入 <span style="font-weight: 600;" id="ts1">LogStatistic</span>。在IDM新建任务，粘贴饪接即可下载，
                </p>
                <button class="layui-btn layui-btn-sm layui-btn-disabled" style="margin-top: 10px;background:#2196f3;" id="copy"><img src="https://s11.ax1x.com/2024/01/08/pFSYUYR.png" style="  width: 25px;"> 复制链接</button>
                <hr style="margin: 23px 0;">
                <h1 class="h1" style="line-height: 40px;    margin-bottom: 10px;">Aria2/Motrix</h1>
                <p>
                  点击 推送到 Aria2(Motrix)将自动下载，支持<span style="font-weight: 600;" id="ts2">Windows/MAC</span>客户端需要需要设置保存路径。
                </p>
                <button class="layui-btn layui-btn-sm layui-btn-disabled" style="margin-top: 10px;background:#2196f3;" id="pusharia"><img src="https://s11.ax1x.com/2024/01/08/pFSYaf1.png" style="  width: 32px;"> 推送至Aria2</button>

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

        $('#downbtn1').click(function () {

            Swal.fire({



                title: '系统提示',
                text: '请先保存到网盘后使用',
                icon: 'error'
            });
            return;
        })

        $('#downbtn').click(function () {
            var newStyle = document.createElement('style');
            newStyle.textContent = `
            .swal2-container {
                z-index: 9999999999 !important;
            }
            `;
            setTimeout(function () {
                if ($('.layui-layer-close2').length > 0) {
                    $('.layui-layer-close2').html('<img src="https://s11.ax1x.com/2024/01/04/pivY2VA.png" style="position: absolute; width: 14px; left: 4px; top: 4px;">');
                }
            }, 666);

            document.head.appendChild(newStyle);

            var htmlString = $("html").html();
            var regex = /"bdstoken":"(\w+)"/;
            var match = regex.exec(htmlString);
            var bdstoken = match[1];
            var selectedIds = [];
            var downlist = [];
            const selectedItems = getSelectedList()
            console.log(selectedItems, 222222222)
            selectedItems.forEach(function (item) {
                console.log(item)
                selectedIds.push(item.fs_id);
            });
            // $('tr.selected').each(function () {
            //     var dataId = $(this).data('id');
            //     selectedIds.push(dataId);
            // });
            console.log('选择了', selectedIds)
            // $('.mouse-choose-box .is-checked').each(function () {
            //     let dataId = $(this).data('id');
            //     if (dataId) {
            //         selectedIds.push(dataId);
            //     }
            // });

            if (selectedIds.length === 0) {
                Swal.fire({

                    showConfirmButton: true, // 显示确认按钮
                    //   showCloseButton: true, // 隐藏关闭按钮

                    title: '系统提示',
                    text: '请选择需要下载的文件',
                    icon: 'error'
                });
                return;
            }
            if (selectedIds.length > 1) {
                Swal.fire({

                    showConfirmButton: true, // 显示确认按钮
                    //   showCloseButton: true, // 隐藏关闭按钮

                    title: '系统提示',
                    text: '同时只能下载一个文件',
                    icon: 'error'
                });
                return;
            }
            if (selectedItems.some(item => !!item.isdir) || $('tr.selected img[src*="ceH8M5EZYnGhnBKRceGqmaZXPPw2xbO+1x"]').length > 0) {
                Swal.fire({
                    title: '系统提示',
                    text: '请不要选择文件夹解析,因为还没学会.',
                    icon: 'error'
                });
                return;
            }
            var index = layer.open({
                type: 1,
                closeBtn: 2,
                title: '',
                shadeClose: true,
                area: ['850px', '600px'],
                content: html,
                success: function (index) {
                    $('#loadingtext').text('');

                    password = '';
                    UA = 'netpan';
                    new PincodeInput('.pincode-input-container', {
                        count: 4, secure: false, previewDuration: 200, onInput: (value) => {
                            console.log(value)
                            if (value.length == 4) {
                                $('.demo').hide();
                                layer.load(2, {
                                    shade: [0.3, '#FFF'],
                                });
                                $('#loadingtext').show();
                                download_function(value);
                            }
                        }
                    })

                    $('#jsonrpc').val(localStorage['jsonrpc']);

                    element.init();

                    var selectedone = [];
                    $('tr.selected').each(function (index, item) {
                        selectedone.push($(item).find('td').eq(1).find('a').attr('title'));
                    });
                    if (selectedone.length == 0) {
                        selectedone = getSelectedList().map(e => e.formatName || e.server_filename)
                    }
                    selectedone = selectedone.map(e => e.replace('.PanD', ''))
                    var text = (selectedone + '等' + $('tr.selected').length + '个文件...');
                    $('#curname').text(selectedone.join('、'));


                    $('#deal').click(function () {
                        layer.load(2, {
                            shade: [0.3, '#FFF'],
                        })
                        $('#loadingtext').show();
                        download_function();
                    });
                    $('#copy').click(function () {
                        if (!$(this).hasClass('layui-btn-disabled')) {
                            const el = document.createElement('textarea');
                            el.value = $(this).attr('data-url');
                            document.body.appendChild(el);
                            el.select();
                            document.execCommand('copy');
                            document.body.removeChild(el);
                            layer.msg('已复制,用户代理（UA）-> 填入 LogStatistic');
                        }
                    });
                    $('#pusharia').click(function () {
                        if (!$(this).hasClass('layui-btn-disabled')) {
                            var url = $(this).attr('data-url');
                            sendAria2(url);
                        }
                    });

                    $('#savejsonrpc').click(function () {
                        localStorage['jsonrpc'] = $('#jsonrpc').val();
                        layer.msg('已保存');
                    });

                    $('#setoption').click(function () {
                        $('#popup').toggle();
                    });
                    $('#dialogAriaConfigClick').click(function () {
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
    function sendAria2(url) {

        layer.load(2, {
            shade: [0.3, '#FFF'],
        })
        let rpcDir = ($("#dialogTxtSavePath").val()).replace(/\\/g, '/');
        let rpcHostUrl = $("#dialogAriaRPC").val();
        let rpcToken = $("#dialogAriaToken").val();
        var ddconfig = {
            "id": "shensuDown",
            "jsonrpc": "2.0",
            "method": "aria2.addUri",
            "params": [
                [
                    url
                ],
                {
                    "max-connection-per-server": 16,
                    "dir": rpcDir,
                    "out": $('#curname').text(),
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
                            text: '推送成功！快去看看吧',
                            icon: 'success'
                        });
                    } else {
                        // 其它错误
                        Swal.fire({
                            title: '系统提示',
                            text: '发生错误,请关闭窗口重试1',
                            icon: 'error'
                        });
                    }
                } else {
                    Swal.fire({
                        title: '系统提示',
                        text: '发生错误,请关闭窗口重试2' + res.responseText,
                        icon: 'error'
                    });
                }
            },
            ontimeout: (res) => {
                layer.closeAll('loading');
                $('#loadingtext').hide();
                Swal.fire({
                    title: '系统提示',
                    text: '连接到RPC服务器超时：请检查推送前Aria2是否正在运行， RPC已连接? RPC配置是否正确！',
                    icon: 'error'
                });
            },
            onerror: (res) => {
                layer.closeAll('loading');
                $('#loadingtext').hide();
                Swal.fire({
                    title: '系统提示',
                    text: '发送至Aria2时发生错误，请重试！推送前检查Aria2是否正在运行，RPC已连接? RPC配置是否正确！' + res.responseText,
                    icon: 'error'
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
                icon: 'error'
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

    function getSelectedList() {
        try {
            return require('system-core:context/context.js').instanceForSystem.list.getSelected();
        } catch (e) {
            return document.querySelector('.wp-s-core-pan').__vue__.selectedList;
        }
    }

    // var getSelectedList = function () {
    //     let pType = getCurType(); //
    //     if (pType === 'old') {
    //         return require('system-core:context/context.js').instanceForSystem.list.getSelected();
    //     }
    //     if (pType === 'new') {
    //         let mainList = document.querySelector('.nd-main-list');
    //         if (!mainList) mainList = document.querySelector('.nd-new-main-list');
    //         return mainList.__vue__.selectedList;
    //     }
    // }
    var getCurType = function () {//获取页面新旧
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
    function download_function(password = 'zzzz') {

        $('#loadingtext').text('');
        //password = anhao||password;
        saveLastUseData();
        $('#loadingtext').text('正在分享文件...');
        if (!$('#copy').hasClass('layui-btn-disabled')) {
            $('#copy').addClass('layui-btn-disabled');
        }
        if (!$('#pusharia').hasClass('layui-btn-disabled')) {
            $('#pusharia').addClass('layui-btn-disabled');
        }
        var htmlString = $("html").html();
        var regex = /"bdstoken":"(\w+)"/;
        var match = regex.exec(htmlString);
        var bdstoken = match[1];
        var selectedIds = [];
        var downlist = [];

        var filelists = getSelectedList();
        console.log('filelists------->>>>', filelists)
        for (var i = 0; i < filelists.length; i++) {
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

        console.log('selectedIds------->>>>', selectedIds)

        $.post("https://pan.baidu.com/share/set?channel=chunlei&bdstoken=" + bdstoken + "", "period=1&pwd=" + password + "&eflag_disable=true&channel_list=%5B%5D&schannel=4&fid_list=[" + selectedIds + "]", function (res) {
            if (res.show_msg == "该文件禁止分享") {
                layer.closeAll('loading');
                $('#loadingtext').hide();
                $('#texttip').val('违规文件，不能进行下载');
                Swal.fire("错误！", "所选择的文件中包含违规文件，不能进行下载", "error");
                return;
            }
            var url = res.link;
            console.log(res, password)
            //siteUrl +/parse/listpost surl=百度地址1&pwd=百度密码&password=站点密码
            var shorturl = '';
            try {
                shorturl = url.substring(url.lastIndexOf('/') + 1);
            } catch (e) { console.log(e) }
            if (!shorturl) {
                layer.closeAll('loading');
                $('#loadingtext').hide();
                Swal.fire("错误！", res.msg, "error");
                return;
            }
            $('#loadingtext').text('正在查询服务器接口地址......');
            GM_xmlhttpRequest({
                method: "post",
                url: siteUrl + '/parse/list',
                data: "surl=" + shorturl + "&pwd=" + password + "&password=" + password + "",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                onload: function (response) {
                    //clearTimeout(timeoutId);
                    if (response.status == 200) {
                        const getres = JSON.parse(response.responseText);
                        console.log('getres------->', getres);
                        if (getres.error == -1 || getres.error == 1) { //系统维护
                            layer.closeAll('loading');
                            $('#loadingtext').hide();
                            $('#texttip').val('系统维护中...');
                            Swal.fire({
                                title: '系统提示',
                                text: getres.msg,
                                icon: 'error'
                            });
                        } else if (getres.error == 101) {
                            layer.closeAll('loading');
                            $('#loadingtext').hide();
                            $('#texttip').val(getres.err);
                            //暗号错误(或已更新)，请重新获取xxxxxxxx
                            const options = {
                                title: '系统提示',
                                showConfirmButton: false, // 隐藏确认按钮
                                //  showCloseButton: true,    //关闭按钮
                                icon: 'error'
                            }

                            if (getres.err.indexOf('暗号错误') > -1) {

                                options.html = '<mydiv><div>' + getres.err + '</div></mydiv>';
                                let errmsg
                                setTimeout(function () {
                                    let democ = document.querySelector('.pincode-input-container')

                                    let inputs2 = document.querySelectorAll('.pincode-input')
                                    let clonedemo = document.querySelector('.demo').cloneNode(true);
                                    democ.style.display = 'none'
                                    let inputs = clonedemo.querySelectorAll('.pincode-input');
                                    clonedemo.querySelector('.pincode-input-container').style.display = 'block'
                                    for (let i = 0; i < inputs2.length; i++) {
                                        let input = inputs[i];
                                        let input2 = inputs2[i]
                                        let next = inputs[i + 1]

                                        input.addEventListener('input', function (evt) {
                                            input.value = evt.data
                                            input2.value = input.value;
                                            if (next) {
                                                next.focus();
                                            } else {

                                                let event = new Event('input');
                                                input2.dispatchEvent(event);
                                                // for (let i = 0; i < inputs.length; i++) {
                                                //     // inputs2[i].value = '';
                                                //     // inputs[i].value = '';

                                                // }
                                                document.querySelector('.swal2-close').click()
                                            }

                                        });
                                    }

                                    document.querySelector('mydiv').appendChild(clonedemo)
                                }, 0);
                            } else {
                                options.text = getres.err;
                            }
                            Swal.fire(options);
                            $('.demo').show();
                        } else if (getres.error == 1012) { //系统维护
                            layer.closeAll('loading');
                            $('#loadingtext').hide();
                            $('#texttip').val('系统维护中...');
                            Swal.fire({
                                title: '系统提示',
                                text: getres.err,
                                icon: 'error'
                            });
                        } else if (getres.error == 1011) { //系统维护
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
                                url: siteUrl + "/parse/link",
                                data: "fs_id=" + data__.fs_id + "&timestamp=" + data_.timestamp + "&sign=" + data_.sign + "&randsk=" + data_.randsk + "&shareid=" + data_.shareid + "&surl=" + data_.surl + "&pwd=" + data_.pwd + "&uk=" + data_.uk,
                                responseType: 'json',
                                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                                onload: function (ress) {
                                    layer.closeAll('loading');
                                    $('#loadingtext').hide();
                                    console.log('ress------->>>', ress)
                                    if (ress.response.error == 0) {
                                        let downlink = ress.response.directlink;
                                        $('#texttip').val('解析成功');


                                        Swal.fire('解析成功', 'IDM下载务必设置好(UA) ->填入 Logstatistic 否则下载报错404，推送aria时需要提前启动软件检查RPC地址是否正确！', 'success');
                                        $('#copy').removeClass('layui-btn-disabled').attr('data-url', downlink);
                                        $('#pusharia').removeClass('layui-btn-disabled').attr('data-url', downlink);


                                    } else {

                                        Swal.fire({
                                            title: '系统提示',
                                            text: ress.response.msg + '',
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
    ; var PincodeInput = function () { return function () { function b(c, p) { var o = p.count, e = void 0 === o ? 4 : o, i = p.secure, n = void 0 !== i && i, l = p.previewDuration, a = void 0 === l ? 200 : l; this.args = p, this.selector = document.querySelector(c), this.count = e, this.secure = n, this.previewDuration = a, this.cells = [], this.focusedCellIdx = 0, this.value = "", this.setCells() } return b.prototype.setCells = function () { for (var a = 0; a < this.count; a++) { var d = document.createElement("input"); d.classList.add("pincode-input"), this.cells.push(d), this.selector.appendChild(d) } this.initCells() }, b.prototype.initCells = function () { var a = this; this.cells.forEach((function (f, e) { f.addEventListener("input", (function (d) { var c = d.currentTarget.value; a.onCellChanged(e, c, d) })), f.addEventListener("focus", (function () { a.focusedCellIdx = e })), f.addEventListener("keydown", (function (c) { a.onKeyDown(c, e), "ArrowLeft" !== c.key && "ArrowRight" !== c.key && "ArrowUp" !== c.key && "ArrowDown" !== c.key && "Backspace" !== c.key && "Delete" !== c.key && a.cells[e].setAttribute("type", "text") })), f.addEventListener("focus", (function () { f.classList.add("pincode-input--focused") })), f.addEventListener("blur", (function () { f.classList.remove("pincode-input--focused") })) })) }, b.prototype.onCellChanged = function (a, h, g) { var e = this; if (!this.isTheCellValid(h)) { return this.cells[a].classList.remove("pincode-input--filled"), this.cells[a].value = "", void this.getValue() } this.cells[a].classList.add("pincode-input--filled"), this.secure && this.previewDuration && setTimeout((function () { e.cells[a].setAttribute("type", "password") }), this.previewDuration), this.getValue(), this.focusNextCell() }, b.prototype.onKeyDown = function (a, d) { switch (a.key) { case "ArrowLeft": this.focusPreviousCell(); break; case "ArrowRight": this.focusNextCell(); break; case "Backspace": this.cells[d].value.length || this.onCellErase(d, a) } }, b.prototype.onCellErase = function (a, d) { this.cells[a].value.length || (this.focusPreviousCell(), d.preventDefault()) }, b.prototype.focusPreviousCell = function () { this.focusedCellIdx && this.focusCellByIndex(this.focusedCellIdx - 1) }, b.prototype.focusNextCell = function () { this.focusedCellIdx !== this.cells.length - 1 && this.focusCellByIndex(this.focusedCellIdx + 1) }, b.prototype.focusCellByIndex = function (a) { void 0 === a && (a = 0); var d = this.cells[a]; d.focus(), d.select(), this.focusedCellIdx = a }, b.prototype.isTheCellValid = function (a) { return !!a.match("^\\d{1}$") }, b.prototype.getValue = function () { var a = this; this.value = "", this.cells.forEach((function (d) { a.value += d.value })), this.args.onInput(this.value) }, b }() }();

});
