<template>
    <div class="car-list">
        <data-table ref="datatable" :datagrid="datagrid" :row-dblclick="handleEdit">
            <template slot="toolbar">
                <el-button v-if="addAuth" type="primary" size="small" icon="el-icon-edit" @click.native="handleAdd()">新增</el-button>
                <el-button v-if="delAuth" type="primary" size="small" icon="el-icon-delete" @click.native="handleDelete()">删除</el-button>
            </template>
        </data-table>
    </div>
</template>
<script>
import DataTable from '@/components/tables/DataTable';

export default {
    name: "List",
    data() {
        return {
            datagrid: {
                // url: 'car/purchase', // 后端提供数据
                data: {},
                columns: [
                    { field: 'order_status', name: '状态', width: 150,sortable: 'custom', align: "center", render_way: "checkbox", filter: [{ text: '草稿', value: '1' }, { text: '待审批', value: '2' }, { text: '已驳回', value: '3' }]
                    },
                    { field: 'system_number', name: '单号', width: 150, sortable: 'custom', align: "center" },
                    { field: 'number', name: '数量', width: 150, sortable: true, align: "center", render_way: "between" },
                    { field: 'cost', name: '底盘成本', width: 150, sortable: true, align: "center", render_way: "number" },
                    { field: 'created_at', name: '创建时间', width: 120, sortable: true, align: "center", render_way: "time" },
                    { field: 'created_person', name: '创建人', width: 150, sortable: true, align: "center" },
                ],
                queryParams: {},
                selection: true, //是否多选
                showSummary: true, //合计显示
            },
            rules: []
        }
    },
    computed: {
        addAuth() {
            return this.$checkAuth(['table/create']);
        },
        delAuth() {
            return this.$checkAuth(['table/delete']);
        }
    },
    mounted() {
        this.init();
    },
    // 页面激活的时候
    activated() {
        // 不是你期望的数据 则销毁组件 或者直接调用销毁也行
        if (this.$route.meta.refreshable) {
            this.init();
            this.refresh();
        }
    },
    methods: {
        // 初始参数
        init() {
            this.datagrid.queryParams = { page: 1 };
            this.form = {};

            // 前端提供数据：：todo未开发完
            let data = {
                rows: [
                    { id: 1, order_status: "草稿", system_number: "DD2000919231", number: 12, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 2, order_status: "草稿", system_number: "DD2000919232", number: 3, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 3, order_status: "草稿", system_number: "DD2000919233", number: 23, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 4, order_status: "草稿", system_number: "DD2000919234", number: 3, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 5, order_status: "待审批", system_number: "DD2000919235", number: 34, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 6, order_status: "草稿", system_number: "DD2000919236", number: 13, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 7, order_status: "草稿", system_number: "DD2000919237", number: 32, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 8, order_status: "草稿", system_number: "DD2000919238", number: 35, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 9, order_status: "草稿", system_number: "DD2000919239", number: 32, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 10, order_status: "草稿", system_number: "DD2000919239", number: 32, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 11, order_status: "草稿", system_number: "DD2000919239", number: 32, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 12, order_status: "草稿", system_number: "DD2000919239", number: 32, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 13, order_status: "草稿", system_number: "DD2000919239", number: 32, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 14, order_status: "草稿", system_number: "DD2000919239", number: 32, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                    { id: 15, order_status: "草稿", system_number: "DD2000919239", number: 32, cost: "104.00", created_person: "测试账户", created_at: "2018-12-10 11:52:03" },
                ],
                total: 15
            };
            this.datagrid.data = data;
        },
        // 新增
        handleAdd() {
            this.$router.push({ path: 'detail' })
        },
        // 编辑
        handleEdit(row) {
            this.$router.push({ path: 'detail', query: { id: row.id } })
        },
        // 删除
        handleDelete() {
        },
        // 查询
        refresh() {
            this.$refs.datatable.refresh()
        }
    },
    components: {
        DataTable,
    }
}
</script>
<style scoped>
.car-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
</style>