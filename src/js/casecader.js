(function ($) {
    
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
    
            //输入框是否有值，有点击就显示选项
            var checkIfHasInputValue = function (jqObj, f) {
    
                if (jqObj.find('#input-select').val()) {
                    if (!f) {
    
                        $('.el-cascader-menus').show();
    
                    } else {
    
                        $('.el-cascader-menus').hide();
                    }
    
                    return false;
    
                } else {
    
                    return true;
                }
    
            }
    
            //是否已有下拉内容，防止多次触发初始下拉
            var checkIfHasUls = function () {
    
                $el_cascader_menus = $('.el-cascader-menus');
    
                $uls = $el_cascader_menus.find('ul');
    
                if ($uls.length != 0) {
    
                    return false;
    
                } else {
    
                    return true;
                }
            }
            //初始下拉
            var addSelectItems = function (jqObj, options) {
    
                $('.el-input__icon').addClass('el-input-spinner');
    
                if (!checkIfHasInputValue(jqObj, false)) {
    
                    return;
                } else if (!checkIfHasUls()) {
    
                    return;
                };
    
                //判断有没有已经选过
                //判断初始下拉加载
                if ($uls.length != 0) {
    
                    if (jqObj.find('#input-select').val()) {
    
                        $('.el-cascader-menus').show();
    
                        return;
                    }
                    return;
                }
    
                var data = options.data[0];
    
                var $el_cascader_menus = $('.el-cascader-menus');
                var $ul = $('<ul></ul>');
                $.each(data, function (index, item) {
    
    
    
                    $ul.addClass('el-cascader-menu');
    
    
                    var li =
                        '<li class="el-cascader-menu__item el-cascader-menu__item--extensible" data-level="1" data-code=' +
                        item.code +
                        '>' + item.name;
    
                    var f = judgeHasNextLi(1, item.code, options);
                    if (f) {
                        li = li + '<i class="fa fa-angle-right"></i>';
                    }
                    li = li + '</li>';
                    $ul.append(li);
    
    
                })
    
    
                $el_cascader_menus.append($ul);
            }
    
            //判断li是否有子集，有就加上箭头
            var judgeHasNextLi = function (level, code, options) {
                var f = false;
                $.each(options.data[level], function (index, item) {
    
                    if (item.parentCode == code) {
    
                        f = true;
                    }
    
                })
    
                return f;
    
            }
            //step06-a 在插件里定义方法
            // var showLink = function (obj) {
            //     $(obj).append(function () { return "(" + $(obj).attr("href") + ")" });
            // }
    
            //dom添加
            var addElements = {
    
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
    
                addAfterDom: function (obj) {
    
                    var div =
                        '<div class="el-cascader-menus el-popper" style="z-index: 2024; position: absolute; top: 50px; left: 8px;" x-placement="bottom-start">' +
    
                        '<div x-arrow="true" class="popper__arrow" style="left: 35px;">' +
    
                        '</div>' +
    
                        '</div>';
    
                    $(obj).after(div);
    
                }
    
            }
    
    
            var inputSelectBlur = function () {
    
    
                $('.el-cascader-menus').find('ul').remove();
    
            }
    
            var liClick = function (jqObj, options, e) {
                e.preventDefault();
                var $el_cascader_menus = $('.el-cascader-menus');
                var $this = jqObj; //点击的li
    
                //添加li点击样式，移除未点击样式
                var $thisitems = $this.parent().children('li');
                var index = $thisitems.index($this);
                Array.prototype.splice.apply($thisitems, [index, 1]); //在当前ul所有li中剔除点击项
                $this.addClass('selected-item');
                $thisitems.removeClass('selected-item');
                //
                //回头点击父选项清除后面的选项
                var level = $this.attr('data-level');
                $uls = $el_cascader_menus.find('ul');
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
                        var f = judgeHasNextLi(level * 1 + 1, item.code, options);
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
    
                    $el_cascader_menus.append($ul);
    
                } else {
                    //没内容就把选的值赋到选择框里去
                    var selecteds = $('.el-cascader-menus').find('.selected-item');
                    var vals = "";
                    var jsonData = {};
                    for (var i = 0; i < selecteds.length; i++) {
                        vals += $(selecteds[i]).text() + '/';
                        jsonData["code" + i] = $(selecteds[i]).attr('data-code');
                    }
                    vals = vals.substring(0, vals.length - 1);
                    var jsondata = JSON.stringify(jsondata);
                    $('.el-cascader #input-select').val(vals).attr('jsondata', jsondata);
                    $('.el-cascader-menus').hide();
    
                    $('.el-input__icon').removeClass('el-input-spinner');
                }
    
            }
    
            //事件绑定
            var eventBinding = function (obj, options) {
    
                $(obj).on('click', function () {
    
                    addSelectItems($(obj), options);
    
                })
    
    
                $('.el-cascader-menus').on(options.liEvent, '.el-cascader-menu__item', function (e) {
    
                    e.preventDefault();
    
                    var jqobj = $(this);
    
                    liClick(jqobj, options, e);
    
                })
    
                $('#input-select').on('blur', function (e) {
                    //debugger
                    $('.el-input__icon').removeClass('el-input-spinner');
                    if (checkIfHasInputValue($('.el-cascader'), true)) {
    
                        inputSelectBlur();
                    }
                })
    
    
    
            }
    
            //step02 插件的扩展方法名称
            $.fn.caseCader = function (options) {
                //step03-b 合并用户自定义属性，默认属性
                var options = $.extend(defaults, options);
                //step4 支持JQuery选择器
                //step5 支持链式调用
                return this.each(function () {
                    //step06-b 在插件里定义方法
                    addElements.addInnerDom(this);
    
                    addElements.addAfterDom(this);
    
                    eventBinding(this, options);
                });
            }
        })(jQuery);