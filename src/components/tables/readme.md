### 各类表格组件使用说明

#### DataTable
1.准备组件。。。
```
// 引入组件
import DataTable from '@/components/tables/DataTable';
// components
...
// 准备数据：数据是一个对象
datagrid: {
    url: '/api/fuckman',	// 远程获取数据，数据接口地址
    // 本地获取数据，数据结构为对象
    data: {
            rows: [],   // 行数
            total: 12,  // 条数
            footer: {}  // 合计
        },			    
    columns: [
        { 	
            field: 'system_number', // 字段
        	name: '单号', 			// 别名
        	width: 200, 		    // 最小列宽
        	sortable: true, 		// 排序  true/custom
            align: "center",        // 对齐方向
            hide: false             // 隐藏  true/false
        	overflow: 'hidden',     // 数据太长，tooltip显示数据 hidden/不设置
        },
        ...
    ],
    selection: true, 	// 开启checkbox,只能多选
    showSummary: true, 	// 合计显示
    queryParams: {},			// 查询参数
    // 设置行样式
    setRowStyle(row, index){}
    // 单元格点击事件
    onClickCell(row, column, cell, even){}
    // 行点击事件
    onClickRow(row, event, column) {}
    // 行双击事件
    onDbClickRow(row, event) {}
    // 行选择事件
    onSelect(selection, row) {}
    // 全选事件
    onSelectAll(selection) {}
    // 合计事件 TODO::重写合计事件
    getSummaries(param) {}
}
```
2.使用组件
```
<DataTable :datagrid="datagrid" class="data-table">
    <!--  工具条 -->
    <template slot="toolbar">
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" size="small">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </template>

    <!-- 添加列 -->
    <template slot="columnbar">
        <el-table-column :fixed="false" label="操作" min-width="200" align="center">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" circle type="primary" icon="el-icon-edit">
                </el-button>
                <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" circle type="danger" icon="el-icon-delete">
                </el-button>
            </template>
        </el-table-column>
    </template>
</DataTable>
```