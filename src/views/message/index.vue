<template>
    <div class="message">
        <data-table ref="datatable" :datagrid="datagrid" :row-dblclick="handleEdit">
            <template slot="toolbar">
                <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleAdd()">发送</el-button>
                <el-button type="primary" size="small" icon="el-icon-delete" @click.native="handleDelete()">删除</el-button>
            </template>
        </data-table>
    </div>
</template>
<script>
import DataTable from '@/components/tables/DataTable';
export default {
    name: 'message',
    data(){
        return{
            datagrid: {
                url: 'message',
                columns: [
                    { field: 'type', name: '类型', min_width: "150", sortable: 'custom', overflow_tooltip: true, align: "center", on: true },
                    { field: 'title', name: '标题', min_width: "250", sortable: true, align: "center", on: true },
                    { field: 'content', name: '内容', min_width: "500", sortable: true, align: "center", on: true },
                    { field: 'from', name: '来源', min_width: "150", sortable: true, align: "center", on: true },
                ],
                queryParams: {},
                selection: true,    //是否多选
                showSummary: true,  //合计显示
            },
        }
    },
    activated() {
        // 不是你期望的数据 则销毁组件 或者直接调用销毁也行
        if ('/cars/map/' === this.$route.meta.from && true === this.$route.meta.refreshable) {
            this.init();
            this.search();
        }
    },
    methods: {
        // 初始参数
        init(){
            this.datagrid.queryParams = {page: 1};
            this.form = {};
        },
        // 新增
        handleAdd(){
            const path = 'repairRepairDetail';
            this.$router.push({name: path})
        },
        // 编辑
        handleEdit(row) {
            const path = '/message/detail';
            const params = {id: row.id}
            this.$router.push({path: path, query: params})
        },
        // 删除
        handleDelete() {
        },
        // 查询
        search(){
            this.$refs.datatable.refresh()
        }
    },
    components: {
        DataTable,
    }
}
</script>