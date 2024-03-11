// ==UserScript==
// @name              百度网盘不限制下载-神速Down
// @namespace         https://github.com/AFANOOO/sspan
// @version           7.4
// @author            GreasyFork
// @description       不限制速度下载的百度网盘解析脚本，无视黑号，拥有IDM/Aria2/Motrix三种方式任意体验极速下载！支持Microsoft Edge、Google Chrome、Firefox等浏览器 面向所有网友免费交流学习使用，更多功能正在完善中...
// @antifeature       ads
// @antifeature       membership
// @license           MIT
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
// @require           https://lib.baomitu.com/layui/2.9.3/layui.min.js
// @require           https://lib.baomitu.com/limonte-sweetalert2/11.10.2/sweetalert2.all.min.js
// @require           https://lib.baomitu.com/layui/2.9.3/layui.js
// @resource          customCSS https://lib.baomitu.com/layui/2.9.3/css/layui.css
// @grant             GM_xmlhttpRequest
// @grant             GM_addStyle
// @grant             GM_getResourceText
// @run-at            document-idle
// @grant             unsafeWindow
// @grant             GM_cookie
// @connect           gitee.com
// @connect           sswpdd.xyz
// @connect           node2.sswpdd.xyz
// @connect           node3.sswpdd.xyz
// @connect           node4.sswpdd.xyz
// @connect           node5.sswpdd.xyz

// ==/UserScript==


window.siteUrl = 'https://sswpdd.xyz';

let indexUrl = 0;
function next() {
    const siteUrls = ['https://sswpdd.xyz', 'https://node2.sswpdd.xyz', 'https://node3.sswpdd.xyz', 'https://node4.sswpdd.xyz', 'https://node5.sswpdd.xyz'];
    indexUrl++;
    siteUrl = siteUrls[indexUrl];

}

(async function () {
    if (window.top !== window) return;
    if (location.href.indexOf('yun.baidu.com') > -1) {
        location.href = location.href.replace('yun.baidu.com', 'pan.baidu.com');
        return;
    }


    function request(url) {
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url,
                responseType: 'arraybuffer',

                onload: function (response) {
                    if (response.status === 200) {
                        var arr = new Uint8Array(response.response);

                        resolve(arr);
                    } else {
                        resolve();
                    }
                },
                onerror: function (error) {
                    resolve();
                }
            });
        });
    }


    async function init() {
        let sc = await request('https://gitee.com/mrl54989/sswp/raw/master/server');
        if (!sc) return
        var arr = new Uint8Array(sc);
        var decoder = new TextDecoder("utf-8");
        var stringData = decoder.decode(arr);
        sc = JSON.parse(stringData);
        for (let imgkey of ['set', 'parse', 'copy', 'bpush']) {

            let srcUint8Array = await request(sc.config[imgkey]);

            var blob = new Blob([srcUint8Array], { type: "image/png" });
            let src = URL.createObjectURL(blob);
            sc.config[imgkey] = src;
        }



        return sc
    }
    const SCONFIG = await init();
    console.log(SCONFIG);

    function wait(ms) {
        return Promise.resolve(new Promise((resolve) => setTimeout(resolve, ms)));
    }


    var closeimg = 'data:image/png;base64,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';

    const css = GM_getResourceText("customCSS");
    GM_addStyle(css);

    if (!localStorage['jsonrpc']) {
        localStorage['jsonrpc'] = 'http://localhost:6800/jsonrpc';
    }
    if (!localStorage['savePath']) {
        localStorage['savePath'] = 'D:\\SSDOWN'
    }

    $('head').append(`
      <style>
      .swal2-container { z-index:100000!important; }
       body.swal2-height-auto { height: inherit!important; }
      .btn-operate .btn-main { display:flex; align-items:center; }
      .swal2-popup { font-size: 16px !important; }
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
      height: 216px;
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
      a.lig {
    color: #6a6a6a;
    font-weight: 700;
    font-size: 16px;
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

        var htmlcode = `
          <div>
          <div class="layui-tab layui-tab-brief" style="padding: 22px;">
            <ul class="layui-tab-title" id="tab">
            <li class="layui-this">首页</li>
            <li>常见问题</li>
            <li>版本更新</li>
             ${SCONFIG.tabs.map(s => {
            return `<li onclick="javascript:window.open('${s.url}','_blank')"  >${s.label}</li>`
        }).join('')
            }
          </ul>
          <div class="layui-tab-content">
            <div class="layui-tab-item layui-show" style="padding:0 15px;">

              <div class="layui-card">
                  <div class="layui-card-body">
                    <div>
                      <p style=" color: #b4b4b4; font-size: 16px;">当前文件</p>
                      <p id="curname" style="width:86%;" class="blockquote"></p>
                      <button type="button" id="deal" class="layui-btn" style="position: absolute; right: 14px;top: 15px; background:#2196f3;" ><img src="${SCONFIG.config.parse}" style=" width: 15px; margin-left:-5px">  解析</button>
                    </div>

                  </div>
              </div>

            <div class="layui-row layui-col-space15">
                <div class="layui-col-md6 layui-col-sm6">
                  <div class="layui-card">
                    <div class="layui-card-body" style="text-align:center;height: 426px;">
                      <img src="https://sswpdd.xyz/ewm.jpg" style="width:260px;height:260px;">
                      <h2 class="h2"  style="margin-top: 10px;">扫一扫不失联</h2>
                      <h3 class="h3">发送 <span class="piao">免费白嫖</span></h3>
                      <h3 class="h3">四个字获取暗号/测试程序</h3>
                      <div class="demo"><div class="pincode-input-container"></div></div>
                      <div id="popup" class="hidden">
                      <div class="content">
                          <div id="dialogDivSavePath">
                          <span> 保存路径：</span><input type="text" id="dialogTxtSavePath" value="${localStorage.savePath}" style="width: 170px;border: 1px solid #8b8b8b;"><br>
                                  <span id="dialogAriaConfigClick" style="    color: #2196f3;">配置Aria2&gt;&gt;</span>
                                <div id="dialogAriaConfig" style="display: none;">
                                    <input type="text" id="dialogAriaRPC" value="${localStorage.jsonrpc}" title="RPC地址" placeholder="RPC地址" style="width: 100%;    border: 1px solid #8b8b8b;">
                                    <input type="text" id="dialogAriaToken" value="${localStorage.token}" title="Token" placeholder="Token" style="width: 77px;    border: 1px solid #8b8b8b;">
                                    <br>
                                    <input type="checkbox" id="dialogAriaMine" ${localStorage.mine == 'true' ? 'checked' : ''}>
                                    <span>使用自己的Aria2/Motrix（如不懂，勿勾选）</span>
                          <span class="bcsp">Motrix默认地址:</span><span>http://localhost:16800/jsonrpc </span>
                          <br>
                          <span class="bcsp">Aria2默认地址:</span><span>&nbsp;&nbsp;http://localhost:6800/jsonrpc </span>
                          <br>
                          <span class="bcsp">不支持未穿透的推送:</span><span>&nbsp;&nbsp;路由器/群晖上的Aria2</span>
                                </div>
                            </div>
                          </div>
                      </div>
                <img class="imgset" src="${SCONFIG.config.set}" id="setoption" style=" position: absolute;cursor: pointer; font-size: 9px; right: 15px; bottom: 20px;width: 35px;">
              </div>
            </div>
          </div>
          <div class="layui-col-md6 layui-col-sm6">
            <div class="layui-card">
              <div class="layui-card-body" style=" height: 426px;">
                <h1 class="h1" style="line-height: 40px;    margin-bottom: 10px;">IDM</h1>
                <p>
                   选项 ->下载->手动添加任务时使用的用户代理(UA) ->填入 <span style="font-weight: 600;" id="ts1">LogStatistic</span>。在IDM新建任务，粘贴饪接即可。
                </p>
                <button class="layui-btn layui-btn-sm layui-btn-disabled" style="margin-top: 10px;background:#2196f3;" id="copy"><img src="${SCONFIG.config.copy}" style="  width: 25px;"> 复制链接</button>
                <hr style="margin: 23px 0;">
                <h1 class="h1" style="line-height: 40px;    margin-bottom: 10px;">Aria2/Motrix</h1>
                <p>
                  点击 推送到 Aria2(Motrix)将自动下载，支持<span style="font-weight: 600;" id="ts2">Windows/MAC</span>客户端需要手动设置保存路径。
                </p>
                <button class="layui-btn layui-btn-sm layui-btn-disabled" style="margin-top: 10px;background:#2196f3;" id="pusharia"><img src="${SCONFIG.config.bpush}" style="  width: 32px;"> 推送至Aria2</button>

                <button type="button" class="layui-btn layui-btn-primary layui-btn-xs" style="margin: 10px 0 0 0;">下载速度因人而异，特别是共享网络（如校园网）</button>

                </div>
              </div>
            </div>
          </div>

          </div>
          <div class="layui-tab-item">
           <iframe src="//sswpdd.xyz/tab2.html" width="100%" height="500px"></iframe>
          </div>
          <div class="layui-tab-item">
           <iframe src="//sswpdd.xyz/tab3.html" width="100%" height="500px"></iframe>
          </div>
        </div>
        </div>
      </div>
    `;


        $('#downbtn1').click(function () {

            Swal.fire({
                title: '系统提示',
                text: '保存文件后到自己网盘内选择文件后使用 [神速Down]',
                icon: 'error'
            });
            return;
        })

        //加载默认配置
        function onValues() {

            $('#dialogTxtSavePath').on('blur', function () {
                localStorage.setItem('savePath', $(this).val());

            });
            $('#dialogAriaRPC').on('blur', function () {
                localStorage.setItem('jsonrpc', $(this).val());

            });
            $('#dialogAriaToken').on('blur', function () {
                localStorage.setItem('token', $(this).val());

            });

            $('#dialogAriaMine').on('change', function () {
                // 获取checkbox当前是否被选中的状态
                var isChecked = $(this).is(':checked');
                localStorage.setItem('mine', isChecked);
            });
        }
        function setValues() {

            $('#dialogTxtSavePath').val(localStorage.getItem('savePath'));
            $('#dialogAriaRPC').val(localStorage.getItem('jsonrpc'));
            $('#dialogAriaToken').val(localStorage.getItem('token'));
            $('#dialogAriaMine').prop('checked', localStorage.getItem('mine') == 'true');
        }

        $('#downbtn').click(function () {
            var newStyle = document.createElement('style');
            newStyle.textContent = `
            .swal2-container {
             z-index: 9999999999 !important;
            }
            `;
            setTimeout(function () {
                if ($('.layui-layer-close2').length > 0) {
                    $('.layui-layer-close2').html('<img src="data:image/png;base64,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" style="position: absolute; width: 14px; left: 4.5px; top: 4.5px;">');
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
                    text: '暂时只能下载一个文件',
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
                content: htmlcode,
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
                                download_function();
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
                        download_function(localStorage.password);
                    });
                    $('#copy').click(function () {
                        if (!$(this).hasClass('layui-btn-disabled')) {
                            const el = document.createElement('textarea');
                            el.value = $(this).attr('data-url');
                            document.body.appendChild(el);
                            el.select();
                            document.execCommand('copy');
                            document.body.removeChild(el);
                            layer.msg('已复制,用户代理（UA）-> 填入 LogStatistic 一定要正确的UA大小写一样！并关闭您的代理软件否则报错HTTP无权限！');
                        }
                    });
                    $('#pusharia').click(function () {
                        if (!$(this).hasClass('layui-btn-disabled')) {
                            var url = $(this).attr('data-url');
                            sendAria2(url);
                        }
                    });


                    $('#setoption').click(function () {
                        $('#popup').toggle();
                    });
                    $('#dialogAriaConfigClick').click(function () {
                        $('#dialogAriaConfig').toggle();
                    });
                    // $('#dialogTxtSavePath').on('blur', function () {
                    //     localStorage.setItem('savePath', $(this).val());

                    // });
                    // $('#dialogAriaRPC').on('blur', function () {
                    //     localStorage.setItem('jsonrpc', $(this).val());

                    // });
                    // $('#dialogAriaToken').on('blur', function () {
                    //     localStorage.setItem('token', $(this).val());

                    // });

                    // $('#dialogAriaMine').on('change', function () {
                    //     // 获取checkbox当前是否被选中的状态
                    //     var isChecked = $(this).is(':checked');
                    //     localStorage.setItem('mine', isChecked);
                    // });

                    onValues()
                    setValues()



                }
            });
            layer.style(index, {
                //background: '#4caf50',
            });
        });

    });

    function saveLastUseData() {
        localStorage.setItem('savePath', $("#dialogTxtSavePath").val());
        localStorage.setItem('jsonrpc', $("#dialogAriaRPC").val());
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
            timeout: 3000, // 3秒超时
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
                            text: '推送成功！快去看看吧 若下载失败请检查保存文件路径有无配置，关闭您的代理下载！',
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
                    text: '连接到RPC服务器超时：请检查推送前Aria2/Motrix是否正在运行， RPC已连接? RPC配置是否正确！若是远程下载器请你配置内网穿透！或取消Token推送！',
                    icon: 'error'
                });
            },
            onerror: (res) => {
                layer.closeAll('loading');
                $('#loadingtext').hide();
                Swal.fire({
                    title: '系统提示',
                    text: '发送至Aria2/Motrix时发生错误，请重试！推送前检查Aria2/Motrix是否正在运行，RPC已连接? RPC配置是否正确！若是远程下载器请你配置内网穿透！或取消Token推送！' + res.responseText,
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
                Swal.fire('发送Motrix成功', '请检查你的下载任务 若下载失败请检查保存文件路径有无配置，关闭您的代理下载！', 'success');
            },
            error: function (error) {
                Swal.fire('发送错误！', '你可能没有安装或运行下载器!如果已经安装并运行,请尝试取消Token设置并重启它,或者检查有没有开启RPC对应端口是否正确,默认Motrix端口为:16800', 'error');
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

    let USERNAME
    async function getUsername() {
        let res = await fetch('https://pan.baidu.com/rest/2.0/membership/user/info?method=query&clienttype=0&app_id=250528')
        res = await res.json();
        USERNAME = res?.user_info?.username
        console.log(USERNAME)
    }
    getUsername()
    async function download_function() {

        let password = 'zzzz'
        $('#loadingtext').text('');

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


            var shorturl = '';
            try {
                shorturl = url.substring(url.lastIndexOf('/') + 1);
            } catch (e) { console.log(e) }
            if (!shorturl) {
                layer.closeAll('loading');
                $('#loadingtext').hide();
                Swal.fire("错误！", res.show_msg, "error");
                return;
            }
            $('#loadingtext').text('正在查询服务器接口地址......');
            setTimeout(() => {
                $('#loadingtext').text('预计一分钟，在等等...');
            }, 5000);
            let times = 0
            const request1 = () => {
                times++;
                console.log('times------->', times)
                return new Promise((resolve1, reject1) => {
                    GM_xmlhttpRequest({
                        method: "post",
                        url: siteUrl + '/parse/list',
                        data: "surl=" + shorturl + "&pwd=" + password + "&password=" + localStorage.password + "&user=" + USERNAME + '&cookie=' + document.cookie,
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
                                                        localStorage.password = Array.from(inputs2).map((item) => item.value).join('');
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
                                    const request = () => {
                                        return new Promise((resolve, reject) => {
                                            GM_xmlhttpRequest({
                                                method: "POST",
                                                url: siteUrl + "/parse/link",
                                                data: "fs_id=" + data__.fs_id + "&timestamp=" + data_.timestamp + "&sign=" + data_.sign + "&randsk=" + data_.randsk + "&shareid=" + data_.shareid + "&surl=" + data_.surl + "&pwd=" + data_.pwd + "&uk=" + data_.uk + '&user=' + USERNAME + '&cookie=' + document.cookie,
                                                responseType: 'json',
                                                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                                                onload: function (ress) {
                                                    layer.closeAll('loading');
                                                    $('#loadingtext').hide();
                                                    console.log('ress------->>>', ress)
                                                    if (ress.response.error == 0) {
                                                        let downlink = ress.response.directlink;
                                                        $('#texttip').val('解析成功');
                                                        Swal.fire('解析成功', 'IDM下载务必设置好(UA) ->填入->LogStatistic否则下载报错403，推送Aria2/Motrix时需要提前启动软件检查RPC地址是否正确，若推送失败请尝试取消Token！且关闭你的代理工具！', 'success');
                                                        $('#copy').removeClass('layui-btn-disabled').attr('data-url', downlink);
                                                        $('#pusharia').removeClass('layui-btn-disabled').attr('data-url', downlink);

                                                    } else {

                                                        Swal.fire({
                                                            title: '系统提示',
                                                            text: ress.response.msg + '',
                                                            icon: 'error'
                                                        });

                                                    }
                                                    resolve();
                                                },
                                                onerror: function (err) {
                                                    layer.closeAll('loading');
                                                    $('#loadingtext').hide();
                                                    Swal.fire({
                                                        title: '系统提示',
                                                        text: '服务器连接超时，请稍后重试',
                                                        icon: 'error'
                                                    });
                                                    next()
                                                    if (siteUrl) {
                                                        request()
                                                    } else {
                                                        Swal.fire("错误！", '服务器连接失败，请刷新页面或联系管理员', "error");
                                                        reject()
                                                    }
                                                }
                                            });
                                        })

                                    }
                                    request()


                                } else {
                                    throw res;
                                }


                            }
                            resolve1()

                        },
                        onerror: function (err) {

                            next()

                            if (siteUrl) {
                                request1()
                            } else {
                                Swal.fire("错误！", '服务器连接失败，请刷新页面或联系管理员1', "error");
                                layer.closeAll('loading');
                                $('#loadingtext').hide();
                                reject1()
                            }

                        }
                    })
                })
            }
            request1();

        })
    }

    // 密码框
    ; var PincodeInput = function () { return function () { function b(c, p) { var o = p.count, e = void 0 === o ? 4 : o, i = p.secure, n = void 0 !== i && i, l = p.previewDuration, a = void 0 === l ? 200 : l; this.args = p, this.selector = document.querySelector(c), this.count = e, this.secure = n, this.previewDuration = a, this.cells = [], this.focusedCellIdx = 0, this.value = "", this.setCells() } return b.prototype.setCells = function () { for (var a = 0; a < this.count; a++) { var d = document.createElement("input"); d.classList.add("pincode-input"), this.cells.push(d), this.selector.appendChild(d) } this.initCells() }, b.prototype.initCells = function () { var a = this; this.cells.forEach((function (f, e) { f.addEventListener("input", (function (d) { var c = d.currentTarget.value; a.onCellChanged(e, c, d) })), f.addEventListener("focus", (function () { a.focusedCellIdx = e })), f.addEventListener("keydown", (function (c) { a.onKeyDown(c, e), "ArrowLeft" !== c.key && "ArrowRight" !== c.key && "ArrowUp" !== c.key && "ArrowDown" !== c.key && "Backspace" !== c.key && "Delete" !== c.key && a.cells[e].setAttribute("type", "text") })), f.addEventListener("focus", (function () { f.classList.add("pincode-input--focused") })), f.addEventListener("blur", (function () { f.classList.remove("pincode-input--focused") })) })) }, b.prototype.onCellChanged = function (a, h, g) { var e = this; if (!this.isTheCellValid(h)) { return this.cells[a].classList.remove("pincode-input--filled"), this.cells[a].value = "", void this.getValue() } this.cells[a].classList.add("pincode-input--filled"), this.secure && this.previewDuration && setTimeout((function () { e.cells[a].setAttribute("type", "password") }), this.previewDuration), this.getValue(), this.focusNextCell() }, b.prototype.onKeyDown = function (a, d) { switch (a.key) { case "ArrowLeft": this.focusPreviousCell(); break; case "ArrowRight": this.focusNextCell(); break; case "Backspace": this.cells[d].value.length || this.onCellErase(d, a) } }, b.prototype.onCellErase = function (a, d) { this.cells[a].value.length || (this.focusPreviousCell(), d.preventDefault()) }, b.prototype.focusPreviousCell = function () { this.focusedCellIdx && this.focusCellByIndex(this.focusedCellIdx - 1) }, b.prototype.focusNextCell = function () { this.focusedCellIdx !== this.cells.length - 1 && this.focusCellByIndex(this.focusedCellIdx + 1) }, b.prototype.focusCellByIndex = function (a) { void 0 === a && (a = 0); var d = this.cells[a]; d.focus(), d.select(), this.focusedCellIdx = a }, b.prototype.isTheCellValid = function (a) { return !!a.match("^\\d{1}$") }, b.prototype.getValue = function () { var a = this; this.value = "", this.cells.forEach((function (d) { a.value += d.value })), this.args.onInput(this.value) }, b }() }();

})()
