# jquery-casecader
一个jquery级联下拉组件

<h5>1.使用方法</h5>
$(class or id).caseCader({data:yourData});

<h5>2.data数据格式</h5>
            
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