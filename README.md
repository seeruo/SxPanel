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
        "agency_name": "",
        "agency_fee": "0.00",
        "business_from": "1",
        "customer_name_phone": "阿里巴巴 13948787848 (普通)",
        "customer_card": "5107221985152312312",
        "seller_name": "田国清",
        "loan_common": {
            "mortgage_status": "否",
            "device_status": "否",
            "contract_num": "FSDF093323",
            "bank_bill_img": [
                "http://7xr3m7.com2.z0.glb.qiniucdn.com/1523956613233",
                "http://7xr3m7.com2.z0.glb.qiniucdn.com/1523956618356"
            ],
            "credit_report_img": [
                "http://7xr3m7.com2.z0.glb.qiniucdn.com/1523956624026"
            ],
            "contract_img": [
                "http://7xr3m7.com2.z0.glb.qiniucdn.com/1523956629210",
                "http://7xr3m7.com2.z0.glb.qiniucdn.com/1523956645576"
            ]
        },
        "list_cars": [
            {
                "master_id": "4102",
                "class_id": "1726",
                "car_id": "8262",
                "car_type": "库存车",
                "car_price": "50000.00",
                "sell_company_name": "玩儿",
                "business_type": "按揭,保险,短借,挂靠,牌证,销售",
                "guakao_company": "",
                "vin": "KFKE43435353WREW4",
                "class_str": "联合卡车 U系 重型 集装箱牵引车",
                "data_insurance": {
                    "class_id": "1726",
                    "use_property": "特种车",
                    "all_fee": "1400.00",
                    "jqx_fee": "200.00",
                    "jqx_brand_name": "锦泰保险",
                    "syx_fee": "300.00",
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
                    "ywx_fee": "400.00",
                    "ywx_brand_name": "华泰保险",
                    "ywx_baoe": "SDGG",
                    "ccs_fee": "500.00",
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
                            "license_type": "行驶证",
                            "picture_fee": "123.00",
                            "check_fee": "24.00",
                            "deal_fee": "12.00"
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
                            "license_type": "购置证",
                            "picture_fee": "1241.00",
                            "check_fee": "41.00",
                            "deal_fee": "24124.00"
                        }
                    ],
                    "total_amount": "25807.00",
                    "xsz_fee": "159.00",
                    "ysz_fee": "176.00",
                    "whz_fee": "47.00",
                    "jly_fee": "19.00",
                    "gzz_fee": "25406.00"
                },
                "data_linked": {
                    "class_id": "1726",
                    "freight_type": "普通货运",
                    "affiliated_fee": "1000.00",
                    "start_time": "2018-04-17",
                    "pay_years": "1.00",
                    "margin": "3.00",
                    "transfer_ownership_fee": "2.00",
                    "change_native_fee": "2.00",
                    "total_amount": "1003.00",
                    "class_str": "联合卡车 U系 重型 集装箱牵引车",
                    "class_vin": ""
                },
                "data_weihu": {
                    "class_id": "1729",
                    "total_amount": "123124.00",
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
            "loan_person": "阿里巴巴",
            "car_price": "100000.00",
            "car_first_pay_ratio": "20.00",
            "car_first_pay_amount": "20000.00",
            "loan_amount": "80000.00",
            "loan_type": "1",
            "loan_periods": "4",
            "loan_rate": "5.00000000",
            "monthly": "20208.77",
            "loan_interest": "835.08",
            "ensure_fee": "800.00",
            "risk_fee": "800.00",
            "formalities_fee": "800.00",
            "survey_fee": "100.00",
            "notary_fee": "200.00",
            "record_fee": "300.00",
            "device_fee": "400.00",
            "ensure_fee_renew": "500.00"
        },
        "list_dj": {
            "loan_amount": "80000.00",
            "loan_type": "1",
            "loan_periods": "7",
            "loan_rate": "6.00000000",
            "monthly": "11658.28",
            "loan_interest": "1607.96",
            "formalities_fee": "800.00",
            "device_fee": "100.00",
            "survey_fee": "200.00",
            "notary_fee": "300.00"
        },
        "list_xs": {
            "sale_total_price": "100000.00",
            "car_sale_maoli": "0",
            "earnest": "100.00",
            "gift_money": "20.00",
            "sale_time": "2018-04-17",
            "pre_connect_time": "2018-04-17"
        }
    }
}
```
