## Inteface

> http://192.168.5.130/WORKSTATION/bug/merchantSystem/Mobile/InteServ/getDetail

## Params
id: 4102  必须
其他公共参数

## Result

``` bash
{
    "response_status": 200,
    "result_info": "获取详情成功",
    "data": {
        "id": "4102",
        "system_number": "ZHYW201803210001", //系统单号
        "customer_id": "8490",
        "agency_name": "",  //中介人       
        "agency_fee": "0.00",  //中介费    
        "business_from": "1",    //订单类型,1:新车,2：旧车    
        "customer_name_phone": "阿里巴巴 13948787848 (普通)",
        "customer_card": "5107221985152312312",    //证件
        "seller_name": "田国清",    //业务员
        "loan_common": {
            "mortgage_status": "否",      //抵押办理
            "device_status": "否",    //定位设备
            "contract_num": "FSDF093323",     //合同编号
            "bank_bill_img": [
                "http://7xr3m7.com2.z0.glb.qiniucdn.com/1523956613233",
                "http://7xr3m7.com2.z0.glb.qiniucdn.com/1523956618356"
            ],    //银行流水 
            "credit_report_img": [
                "http://7xr3m7.com2.z0.glb.qiniucdn.com/1523956624026"
            ],    //征信报告
            "contract_img": [
                "http://7xr3m7.com2.z0.glb.qiniucdn.com/1523956629210",
                "http://7xr3m7.com2.z0.glb.qiniucdn.com/1523956645576"
            ]    //合同
        },
        "list_cars": [
            {
                "master_id": "4102",
                "class_id": "1726",
                "car_id": "8262",
                "car_type": "库存车",         //属性
                "car_price": "50000.00",     //车价
                "sell_company_name": "玩儿",    //车辆销售公司
                "business_type": "按揭,保险,短借,挂靠,牌证,销售",   //业务类型
                "guakao_company": "",    //挂靠公司信息
                "vin": "KFKE43435353WREW4",
                "class_str": "联合卡车 U系 重型 集装箱牵引车",
                "data_insurance": {
                    "class_id": "1726",
                    "use_property": "特种车",             //使用性质
                    "all_fee": "1400.00",                //保费合计
                    "jqx_fee": "200.00",                 //交强险保费
                    "jqx_brand_name": "锦泰保险",
                    "syx_fee": "300.00",                 //商业险保费
                    "syx_brand_name": "亚太财险",
                    "syx_list": [
                        {
                            "class_id": "1726",
                            "kind_id": "车损险",
                            "isnon": "N",
                            "fee": "50.00",
                            "baoe": "ASD"
                        },
                        {
                            "class_id": "1726",
                            "kind_id": "三者险",
                            "isnon": "Y",
                            "fee": "50.00",
                            "baoe": "FADS"
                        },
                        {
                            "class_id": "1726",
                            "kind_id": "乘坐险（驾驶员）",
                            "isnon": "Y",
                            "fee": "50.00",
                            "baoe": "FAS"
                        },
                        {
                            "class_id": "1726",
                            "kind_id": "乘坐险（乘客）",
                            "isnon": "N",
                            "fee": "50.00",
                            "baoe": "DGFAS"
                        },
                        {
                            "class_id": "1726",
                            "kind_id": "自燃险",
                            "isnon": "N",
                            "fee": "50.00",
                            "baoe": "FGSDFG"
                        },
                        {
                            "class_id": "1726",
                            "kind_id": "涉水险",
                            "isnon": "Y",
                            "fee": "50.00",
                            "baoe": "SDFHGSD"
                        }
                    ],
                    "ywx_fee": "400.00",                       //意外险保费
                    "ywx_brand_name": "华泰保险",               //机构
                    "ywx_baoe": "SDGG",                        //意外险保额
                    "ccs_fee": "500.00",                       //车船税
                    "ccs_brand_name": "都邦财产保险股份有限公司",
                    "class_str": "联合卡车 U系 重型 集装箱牵引车",
                    "class_vin": ""
                },
                "data_license": {
                    "class_id": "1726",
                    "class_str": "联合卡车 U系 重型 集装箱牵引车",
                    "zhengzhao": [
                        {
                            "class_id": "1726",
                            "license_type": "行驶证",           //项目
                            "picture_fee": "123.00",           //证照费
                            "check_fee": "24.00",              //检测费
                            "deal_fee": "12.00"                //代办费
                        },
                        {
                            "class_id": "1726",
                            "license_type": "道路运输证",
                            "picture_fee": "12.00",
                            "check_fee": "123.00",
                            "deal_fee": "41.00"
                        },
                        {
                            "class_id": "1726",
                            "license_type": "危化证",
                            "picture_fee": "12.00",
                            "check_fee": "23.00",
                            "deal_fee": "12.00"
                        },
                        {
                            "class_id": "1726",
                            "license_type": "行驶记录仪",
                            "picture_fee": "3.00",
                            "check_fee": "12.00",
                            "deal_fee": "4.00"
                        },
                        {
                            "class_id": "1726",
                            "license_type": "购置证",   //项目
                            "picture_fee": "1241.00",  //证照费
                            "check_fee": "41.00",      //检测费
                            "deal_fee": "24124.00"     //代办费
                        }
                    ],
                    "total_amount": "25807.00",
                    "xsz_fee": "159.00",   //行驶证   
                    "ysz_fee": "176.00",   //道路运输证
                    "whz_fee": "47.00",    //危化证
                    "jly_fee": "19.00",    //行驶记录仪  
                    "gzz_fee": "25406.00"  //购置证 
                },
                "data_linked": {
                    "class_id": "1726",
                    "freight_type": "普通货运",             //货运类型
                    "affiliated_fee": "1000.00",           //挂靠费
                    "start_time": "2018-04-17",            //挂靠开始时间
                    "pay_years": "1.00",                   //缴款年数
                    "margin": "3.00",                      //安全保证金
                    "transfer_ownership_fee": "2.00",      //过户费
                    "change_native_fee": "2.00",           //转籍费
                    "total_amount": "1003.00",             //费用合计
                    "class_str": "联合卡车 U系 重型 集装箱牵引车",
                    "class_vin": ""
                },
                "data_weihu": {
                    "class_id": "1729",
                    "total_amount": "123124.00",           //二级维护费
                    "class_str": "联合卡车 U系 重型 牵引车"
                }
            },
            {
                "master_id": "4102",
                "class_id": "1727",
                "car_id": "8252",
                "car_type": "库存车",
                "car_price": "50000.00",
                "sell_company_name": "测试采购",
                "business_type": "按揭,保险,短借,挂靠,牌证,销售",
                "guakao_company": "",
                "vin": "EJACK678DKL344",
                "class_str": "联合卡车 U系 重型 牵引车",
                "data_insurance": {
                    "class_id": "1727",
                    "use_property": "运营货车",
                    "all_fee": "400.00",
                    "jqx_fee": "100.00",
                    "jqx_brand_name": "中国人寿",
                    "ywx_fee": "300.00",
                    "ywx_brand_name": "永诚财产保险股份有限公司",
                    "ywx_baoe": "4124",
                    "class_str": "联合卡车 U系 重型 牵引车",
                    "class_vin": ""
                },
                "data_license": {
                    "class_id": "1727",
                    "class_str": "联合卡车 U系 重型 牵引车",
                    "zhengzhao": [
                        {
                            "class_id": "1727",
                            "license_type": "行驶证",
                            "picture_fee": "12.00",
                            "check_fee": "0.00",
                            "deal_fee": "0.00"
                        },
                        {
                            "class_id": "1727",
                            "license_type": "道路运输证",
                            "picture_fee": "23.00",
                            "check_fee": "0.00",
                            "deal_fee": "1241.00"
                        },
                        {
                            "class_id": "1727",
                            "license_type": "危化证",
                            "picture_fee": "414.00",
                            "check_fee": "0.00",
                            "deal_fee": "24.00"
                        },
                        {
                            "class_id": "1727",
                            "license_type": "行驶记录仪",
                            "picture_fee": "123.00",
                            "check_fee": "0.00",
                            "deal_fee": "2.00"
                        }
                    ],
                    "total_amount": "1839.00",
                    "xsz_fee": "12.00",
                    "ysz_fee": "1264.00",
                    "whz_fee": "438.00",
                    "jly_fee": "125.00"
                },
                "data_linked": {
                    "class_id": "1727",
                    "freight_type": "普通货运",
                    "affiliated_fee": "1000.00",
                    "start_time": "2018-04-17",
                    "pay_years": "2.00",
                    "margin": "4.00",
                    "transfer_ownership_fee": "1.00",
                    "change_native_fee": "",
                    "total_amount": "2004.00",
                    "class_str": "联合卡车 U系 重型 牵引车",
                    "class_vin": ""
                },
                "data_weihu": {}
            }
        ],
        "list_aj": {
            "loan_person": "阿里巴巴",             //贷款人
            "car_price": "100000.00",             //贷款车价
            "car_first_pay_ratio": "20.00",       //首付比例
            "car_first_pay_amount": "20000.00",   //首付车款
            "loan_amount": "80000.00",            //贷款额
            "loan_type": "1",                     //还贷方式
            "loan_periods": "4",                  //期数
            "loan_rate": "5.00000000",            //年利率
            "monthly": "20208.77",                //月供
            "loan_interest": "835.08",            //利息
            "ensure_fee": "800.00",               //保证金
            "risk_fee": "800.00",                 //风险费
            "formalities_fee": "800.00",          //手续费
            "survey_fee": "100.00",               //调查费
            "notary_fee": "200.00",               //公证费
            "record_fee": "300.00",               //档案费
            "device_fee": "400.00",               //定位设备费
            "ensure_fee_renew": "500.00"          //续保保证金
        },
        "list_dj": {
            "loan_amount": "80000.00",            //借款额
            "loan_type": "1",                     //还贷方式
            "loan_periods": "7",                  //期数
            "loan_rate": "6.00000000",            //年利率
            "monthly": "11658.28",                //月供
            "loan_interest": "1607.96",           //利息
            "formalities_fee": "800.00",          //手续费
            "device_fee": "100.00",               //定位设备费
            "survey_fee": "200.00",               //调查费
            "notary_fee": "300.00"                //公证费
        },
        "list_xs": {
            "sale_total_price": "100000.00",     //合计售价
            "car_sale_maoli": "0",               //毛利
            "earnest": "100.00",                 //定金
            "gift_money": "20.00",               //赠送价值
            "sale_time": "2018-04-17",           //定车时间
            "pre_connect_time": "2018-04-17"     //预计交车时间
        }
    }
}
```
