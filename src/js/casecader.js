(function ($, doc) {

    //mock数据
    var firstItems = [

        {
            code: "11110",
            name: "指南"
        },
        {
            code: "11111",
            name: "咖喱味"
        },
        {
            code: "11112",
            name: "电音"
        },
        {
            code: "11113",
            name: "特技"
        }
    ];

    var secondItems = [{
            parentCode: "11110",
            code: "111110",
            name: "指南1"
        },
        {
            parentCode: "11110",
            code: "111111",
            name: "指南2"
        },
        {
            parentCode: "11110",
            code: "111112",
            name: "指南3"
        },
        {
            parentCode: "11110",
            code: "111113",
            name: "指南4"
        }
    ]

    var thirdItems = [

        {
            parentCode: "111110",
            code: "1111110",
            name: "指南1"
        },
        {
            parentCode: "111110",
            code: "1111111",
            name: "指南2"
        },
        {
            parentCode: "111110",
            code: "1111112",
            name: "指南3"
        },
        {
            parentCode: "111110",
            code: "1111113",
            name: "指南4"
        }

    ]

    var data = [firstItems, secondItems, thirdItems];

    var defaults = {

        liEvent: 'mousedown',
        data: data

    };


    var caseCaderApp = function () {

        this.eventsMap = {

            'blur #input-select': 'inputSelectBlur',
            'mousedown .el-cascader-menu__item': 'liClick'

        }

        this.Eles = {

            $el_cascader_menus: ".el-cascader-menus",
            $input_select: '#input-select',
            $el_input__icon: '.el-input__icon'

        }


        this.methods = {

            liClick: function (jqObj, options, app, e, _$this) {
                e.preventDefault(); //组织li标签聚焦触发下拉框的清空

                //var $el_cascader_menus = $('.el-cascader-menus');
                var $this = _$this; //点击的li
                //因为事件绑在document上，所以要阻止非li元素
                if($this[0].tagName!='LI'){

                    return;
                }
                //添加li点击样式，移除未点击样式
                var $thisitems = $this.parent().children('li');
                var index = $thisitems.index($this);
                Array.prototype.splice.apply($thisitems, [index, 1]); //在当前ul所有li中剔除点击项
                $this.addClass('selected-item');
                $thisitems.removeClass('selected-item');
                //
                //回头点击父选项清除后面的选项
                var level = $this.attr('data-level');
                var $uls = caseCaderApp.Eles.$el_cascader_menus.find('ul');
                var ulAmount = $uls.length;
                for (var i = level; i < ulAmount; i++) {
                    // $($uls[i]).find('selected-item').removeClass('selected-item');
                    $($uls[i]).remove();
                }
                //

                //添加一个子选项
                var $ul = $('<ul></ul>');

                $ul.addClass('el-cascader-menu');

                var li = "";
                var iTag = "";
                $.each(options.data[level], function (index, item) {

                    if (item.parentCode == $this.attr('data-code')) {


                        li =
                            '<li class="el-cascader-menu__item el-cascader-menu__item--extensible" data-level=' +
                            (level * 1 + 1) + ' data-code=' +
                            item.code +
                            '>' + item.name;
                        //是否有子集
                        var f = app.methods.judgeHasNextLi(level * 1 + 1, item.code, options);
                        // if (f) {
                        //     $(li).append('<i class="fa fa-angle-right"></i>');
                        // }

                        if (f) {
                            li = li + '<i class="fa fa-angle-right"></i>';
                        }
                        li = li + '</li>';
                    }


                    $ul.append(li);

                })
                //判断这个子选项是不是没内容
                if ($ul[0].hasChildNodes()) {

                    caseCaderApp.Eles.$el_cascader_menus.append($ul);

                } else {
                    //没内容就把选的值赋到选择框里去
                    var selecteds = $('.el-cascader-menus').find('.selected-item');
                    var vals = "";
                    var jsonData = {};
                    //组织数据
                    for (var i = 0; i < selecteds.length; i++) {
                        vals += $(selecteds[i]).text() + '/';
                        jsonData["code" + i] = $(selecteds[i]).attr('data-code');
                    }
                    vals = vals.substring(0, vals.length - 1);
                    var jsondata = JSON.stringify(jsondata);
                    caseCaderApp.Eles.$input_select.val(vals).attr('jsondata', jsondata);
                    caseCaderApp.Eles.$el_cascader_menus.hide();

                    caseCaderApp.Eles.$el_input__icon.removeClass('el-input-spinner');
                }

            },

            judgeHasNextLi: function (level, code, options) {
                var f = false;
                $.each(options.data[level], function (index, item) {

                    if (item.parentCode == code) {

                        f = true;
                    }

                })

                return f;

            },

            addSelectItems: function (jqObj, options, app) {

                caseCaderApp.Eles.$el_input__icon.addClass('el-input-spinner');

                if (!app.methods.checkIfHasInputValue(jqObj, false)) {

                    return;
                } else if (!app.methods.checkIfHasUls()) {

                    return;
                };
                var $uls = caseCaderApp.Eles.$el_cascader_menus.find('ul');
                //判断有没有已经选过
                //判断初始下拉加载
                if ($uls.length != 0) {

                    if (jqObj.find('#input-select').val()) {

                        caseCaderApp.Eles.$el_cascader_menus.show();

                        return;
                    }
                    return;
                }

                var data = options.data[0];

                //var $el_cascader_menus = $('.el-cascader-menus');
                var $ul = $('<ul></ul>');
                $.each(data, function (index, item) {



                    $ul.addClass('el-cascader-menu');


                    var li =
                        '<li class="el-cascader-menu__item el-cascader-menu__item--extensible" data-level="1" data-code=' +
                        item.code +
                        '>' + item.name;

                    //判断是否有下一个层级

                    var f = app.methods.judgeHasNextLi(1, item.code, options);

                    if (f) {
                        li = li + '<i class="fa fa-angle-right"></i>';
                    }

                    li = li + '</li>';

                    $ul.append(li);


                })


                caseCaderApp.Eles.$el_cascader_menus.append($ul);
            },

            checkIfHasInputValue: function (jqObj, f) {

                if ($(jqObj).find('#input-select').val()) {
                    if (!f) {

                        caseCaderApp.Eles.$el_cascader_menus.show();

                    } else {

                        caseCaderApp.Eles.$el_cascader_menus.hide();
                    }

                    return false;

                } else {

                    return true;
                }

            },
            checkIfHasUls: function () {



                var $uls = caseCaderApp.Eles.$el_cascader_menus.find('ul');

                if ($uls.length != 0) {

                    return false;

                } else {

                    return true;
                }
            },

            //在根元素内添加dom
            addInnerDom: function (obj) {

                var div =
                    '<div class="el-input el-input--suffix">' +

                    '<input id="input-select" type="text" readonly="readonly" placeholder="请选择" class="el-input__inner" aria-expanded="false">' +

                    '<span class="el-input__suffix">' +
                    '<span class="el-input__suffix-inner">' +

                    '<i class="el-input__icon fa fa-caret-down">' +

                    '</i>'

                '</span>' +

                '</span>' +

                '</div>';

                $(obj).append(div);


            },
            //在根元素后面添加dom，作为下拉内容的容器
            addAfterDom: function (obj) {

                var div =
                    '<div class="el-cascader-menus el-popper" style="z-index: 2024; position: absolute; top: 50px; left: 8px;" x-placement="bottom-start">' +

                    '<div x-arrow="true" class="popper__arrow" style="left: 35px;">' +

                    '</div>' +

                    '</div>';

                $(obj).after(div);

            },

            inputSelectBlur: function (jqObj, options, app) {

                $('.el-input__icon').removeClass('el-input-spinner');
                if (app.methods.checkIfHasInputValue($('.el-cascader'), true)) {

                    $('.el-cascader-menus').find('ul').remove();
                }


            }



        }

    }

    caseCaderApp.Eles = {

        $el_cascader_menus: ".el-cascader-menus",
        $input_select: '#input-select',
        $el_input__icon: '.el-input__icon'

    }

    caseCaderApp.prototype = {

        initializeElements: function () {
            var eles = caseCaderApp.Eles;
            for (var name in eles) {
                if (eles.hasOwnProperty(name)) {
                    eles[name] = $(eles[name]);
                }
            }
        },

        init: function (jqObj, options, app) {
            var that = this;
            return function () {
                app.methods.addInnerDom.apply(null, arguments);
                app.methods.addAfterDom.apply(null, arguments);//dom元素添加
                that.initializeElements();//初始化selector


                $(jqObj).on('click', () => app.methods.addSelectItems.apply(null, arguments));
                

                //this.bindEvent.apply(null,arguments);
                //this.loadGrid();
                that._scanEventsMap.apply(null, arguments);
            }
        },

        _scanEventsMap: function (jqObj, options, app) {
            var delegateEventSplitter = /^(\S+)\s*(.*)$/;
            var bind = app.__proto__._delegate;
            var maps = app.eventsMap;


            for (var keys in maps) {
                if (maps.hasOwnProperty(keys)) {
                    var matchs = keys.match(delegateEventSplitter);
                    if (typeof maps[keys] === 'string') {

                        maps[keys] = app.methods[maps[keys]]; //改变this的指向
                    }

                    var arg = Array.prototype.slice.call(arguments);
                    arg.push([]);
                    arg.push([]); //因为bind形成的闭包会不停存储，故加个位置来区分
                    bind(matchs[1], matchs[2], function (e) {

                        //因为bind形成的闭包会不停存储，故加个位置来区分
                        if (arg.length == 5) {
                            arg.pop();
                            arg.pop();
                            arg.push(e);
                            arg.push($(this));
                        }
                        maps[keys].apply(null, arg);
                    });
                }
            }

        },
        _delegate: function (name, selector, func) {
            $(doc).on(name, selector, func);
        },
        initializeOrdinaryEvents: function () {
            this._scanEventsMap.apply(null, arguments);
        },
        bindEvent: function () {

            this.initializeOrdinaryEvents.apply(null, arguments);
        }
    }



    //step02 插件的扩展方法名称
    $.fn.caseCader = function (options) {
        //step03-b 合并用户自定义属性，默认属性
        var options = $.extend(defaults, options);
        //step4 支持JQuery选择器
        //step5 支持链式调用
        return this.each(function () {
            //step06-b 在插件里定义方法
            //addElements.addInnerDom(this);

            //addElements.addAfterDom(this);

            //eventBinding(this, options);$


            new caseCaderApp().init(this, options, new caseCaderApp())(this, options, new caseCaderApp());


        });
    }
})(jQuery, document);