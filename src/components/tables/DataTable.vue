<template>
    <div class="default-table" ref="tableMain">
        <TableSetting :tableHead.sync="table.columns" :resetColumns="resetColumns" :SettingDialog.sync="SettingDialog"></TableSetting>
        <FilterDialog :visible.sync="FilterDialogVisible" :filter-box="FilterDialogBox">
            <div v-if="FilterDialogData.render_way === 'time'">
                <el-date-picker v-model.lazy="FilterTimeSelect" size="mini" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :style="{width:'230px'}" @focus="handleSelectTime" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd">
                </el-date-picker>
                <div class="null-module">
                    <el-radio-group v-model="FilterSearchRule" class="el-checkbox-column">
                        <el-radio size="mini" :label="'intime'">包含</el-radio>
                        <el-radio size="mini" :label="'not-intime'">不包含</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div v-else-if="FilterDialogData.render_way === 'between'">
                <div class="between-module">
                    <input type="number" class="input-small input-small-rewrite" v-model.lazy="FilterBetween[0]" placeholder="0">
                    <span>-</span>
                    <input type="number" class="input-small input-small-rewrite" v-model.lazy="FilterBetween[1]" placeholder="0">
                </div>
                <div class="null-module">
                    <el-radio-group v-model="FilterSearchRule" class="el-checkbox-column">
                        <el-radio size="mini" :label="'between'">包含</el-radio>
                        <el-radio size="mini" :label="'not-between'">不包含</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div v-else-if="FilterDialogData.render_way === 'checkbox'">
                <el-checkbox-group v-model="FilterChecked" class="el-checkbox-column">
                    <el-checkbox v-for="item in FilterDialogData.filter" :label="item.value" :key="item.value">{{item.text}}</el-checkbox>
                </el-checkbox-group>
                <div class="null-module">
                    <el-radio-group v-model="FilterSearchRule" class="el-checkbox-column">
                        <el-radio size="mini" :label="'in'">包含</el-radio>
                        <el-radio size="mini" :label="'not-in'">不包含</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div v-else-if="FilterDialogData.render_way === 'number'">
                <input type="number" class="input-small" v-model.lazy="FilterNumber" placeholder="请输入数值">
                <div class="null-module">
                    <el-radio-group v-model="FilterSearchRule" class="el-checkbox-column">
                        <el-radio size="mini" :label="'equal'">等于</el-radio>
                        <el-radio size="mini" :label="'not-equal'">不等于</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div v-else>
                <input type="text" class="input-small" v-model.lazy="FilterText" placeholder="请输入内容">
                <div class="null-module">
                    <el-radio-group v-model="FilterSearchRule" class="el-checkbox-column">
                        <el-radio size="mini" :label="'like'">包含</el-radio>
                        <el-radio size="mini" :label="'not-like'">不包含</el-radio>
                    </el-radio-group>
                </div>
            </div>
        </FilterDialog>
        <div class="table-toolbar" ref="tableToolbar">
            <div class="slot-area">
                <slot name="toolbar"></slot>
            </div>
            <div style="display: inline-block; width: 200px; margin: 0 10px;">
                <input type="text" class="input-small" v-model.lazy="queryKeyWord" placeholder="搜索...">
            </div>
            <el-tag v-for="tag in queries" v-if="tag.value" class="tag-style" :key="tag.name" @close="handleTagClose(tag)" closable>
                <template v-if="tag.rule_name">
                    {{tag.name}}:{{tag.rule_name}}【{{tag.text}}】
                </template>
                <template v-else>
                    {{tag.name}}:{{tag.text}}
                </template>
            </el-tag>
        </div>
        <div class="table-area">
            <el-table :data="table.data.rows" ref="dataTable" border highlight-current-row style="width: 100%;" show-header :show-summary="table.showSummary" :summary-method="handleSummaries" :height="tableHeight" size="mini" :row-style="rowStyle" @cell-click="cellClick" @row-click="resetRowClick" @row-dblclick="rowDblclick" @select="select" @select-all="selectAll" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                <el-table-column v-if="table.selection" type="selection" fixed="left" width="35" align="center">
                </el-table-column>
                <el-table-column type="index" :index="resetIndex" :fixed="true" width="35" align="center">
                </el-table-column>
                <el-table-column v-for="(item,k) in table.columns" :key="k" :prop="item.field" :label="item.name" :min-width="item.width" :align="item.align" v-if="!item.hide" :fixed="(item.fixed === 'false' ? false : item.fixed)" :show-overflow-tooltip="item.overflow!=='hidden'? true:false" :render-header="renderHeader">
                </el-table-column>
                <slot name="columnbar"></slot>
            </el-table>
        </div>
        <div class="table-footer" ref="tableFooter">
            <!-- layout="total, sizes, prev, pager, next, jumper" -->
            <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="page" :page-sizes="[15,30]" :page-size="5" layout="total, sizes, prev, pager, next, slot" :total="table.data.total">
                <template>
                    <span class="pager-slot-btn">
                        <span class="setting-btn el-icon-refresh" @click="refresh">刷新</span>
                    <span class="setting-btn el-icon-setting" @click="SettingDialog=true">设置</span>
                    </span>
                </template>
            </el-pagination>
        </div>
    </div>
</template>
<script>
import TableSetting from './TableSetting';
import FilterDialog from '@/components/dialogs/FilterDialog';
import request from '@/utils/request'
export default {
    name: "DataTable",
    components: {
        TableSetting, //表格设置组件
        FilterDialog
    },
    props: {
        datagrid: { type: Object }, //各种表格初始设置
        height: { type: Number }, //指定的表格高度，不指定的情况下，表格高度自适应
        cellClick: {
            type: Function,
            default: function() {}
        },
        rowClick: {
            type: Function,
            default: function() {}
        },
        rowDblclick: {
            type: Function,
            default: function() {}
        },
        select: {
            type: Function,
            default: function() {}
        },
        selectAll: {
            type: Function,
            default: function() {}
        },
        selectAll: {
            type: Function,
            default: function() {}
        },
        rowStyle: {
            type: Function,
            default: function() { return {} }
        }
    },
    data() {
        return {
            loading: false,
            SettingDialog: false, // 设置表格的弹框
            columns: [], // 字段配置
            remoteData: {}, // 数据
            tableHeight: 0, // 表格高度
            page: 1, // 当前页码
            limit: 15, // 每页条数,
            querySorts: [], // 排序规则
            queries: [], // 查询规则
            // 选择状态颜色
            selectedColor: '#409EFF',
            unSelectedColor: '#DDDDDD',
            // 模糊查询
            queryKeyWord: '',
            queryKeyFields: [],
            // 筛选弹框
            FilterDialogVisible: false, // 筛选框状态
            FilterDialogBox: {}, // 筛选框初始需要的数据
            FilterDialogData: {}, // 筛选框填充需要的数据
            // 多选查询
            FilterChecked: [],
            // 时间查询
            FilterTimeSelect: null,
            // 文本查询
            FilterText: null,
            // 数值查询
            FilterNumber: null,
            // 数值区间查询
            FilterBetween: [],
            // 查询方式:1新
            FilterSearchRule: '',
        }
    },
    computed: {
        table() {
            let tabData = this.$deepCopy(this.datagrid);
            // 读取配置列
            if (typeof this.columns === 'object' && this.columns.length > 0) {
                tabData.columns = this.columns;
            }
            // 如果有url,则通过url获取数据
            if (typeof this.remoteData === 'object' && Object.keys(this.remoteData).length > 0) {
                tabData.data = this.remoteData;
            } else {
                if (typeof tabData.data !== 'object') {
                    tabData.data = { rows: [], total: 0 }
                }
            }
            return tabData;
        }
    },
    watch: {
        queryKeyWord(val) {
            this.refresh()
        },
        FilterText(val) {
            this.FilterDialogData.value = val;
            this.FilterDialogData.text = val;
            this.FilterDialogData.rule = (this.FilterSearchRule === null) ? 'like' : this.FilterSearchRule;
            this.handleQueryChange();
        },
        FilterNumber(val) {
            this.FilterDialogData.value = val;
            this.FilterDialogData.text = val;
            this.FilterDialogData.rule = (this.FilterSearchRule === null) ? 'equal' : this.FilterSearchRule;
            this.handleQueryChange();
        },
        FilterTimeSelect(val) {
            this.FilterDialogData.value = val;
            this.FilterDialogData.text = val ? `${val[0]} 至 ${val[1]}` : null;;
            this.FilterDialogData.rule = (this.FilterSearchRule === null) ? 'intime' : this.FilterSearchRule;
            this.handleQueryChange();
        },
        FilterBetween(val) {
            if (typeof val[0] === 'undefined' || typeof val[1] === 'undefined') {
                return;
            }
            this.FilterDialogData.value = val;
            this.FilterDialogData.text = val ? `${val[0]} - ${val[1]}` : null;;
            this.FilterDialogData.rule = (this.FilterSearchRule === null) ? 'between' : this.FilterSearchRule;
            this.handleQueryChange();
        },
        FilterChecked(val) {
            let text = '';
            this.FilterDialogData.filter.forEach((item) => {
                if (val.some(v => v === item.value)) {
                    text += item.text + '、';
                }
            })
            if (text) {
                text = text.substr(0, ((text.length) - 1))
            }
            this.FilterDialogData.value = val;
            this.FilterDialogData.text = text;
            this.FilterDialogData.rule = 'in';
            this.handleQueryChange();
        },
        FilterSearchRule(val) {
            this.queries.some((item) => {
                if (item.field === this.FilterDialogData.field) {
                    this.FilterDialogData.value = item.value;
                    this.FilterDialogData.text = item.text;
                    this.FilterDialogData.rule = this.FilterSearchRule;
                    this.handleQueryChange();
                    return true;
                }
            })
        },
        queries: {
            handler(val) {
                // 请求数据
                this.refresh();
            },
            deep: true
        }
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            this.init();
        });
    },
    methods: {
        init() {
            // 重置页码
            this.resetPage();
            // 初始化表格配置
            this.initColumns();
            // 远程请求数据
            this.getList();
            // 初始化表格的高度
            this.initHeight()
        },
        // 初始化表格配置 TODO:: 如果后期有需要，可以修改为从服务器端读取配置
        initColumns() {
            let localSetting = localStorage.getItem(this.getStorageName());
            localSetting = JSON.parse(localSetting);
            // 根据情况检查是否读取之前的配置
            if (localSetting !== null && localSetting.length > 0) {
                this.columns = localSetting;
            }
        },
        // 初始化表格的高度
        initHeight() {
            let height = 0;
            if (this.height) {
                height = this.height;
            } else {
                let tableMainHeight = this.$refs.tableMain.offsetHeight;
                let tableToolbarH = this.$refs.tableToolbar.offsetHeight;
                let tableFooterH = this.$refs.tableFooter.offsetHeight;
                height = tableMainHeight - tableToolbarH - tableFooterH;
            }
            this.tableHeight = height;
        },
        // 请求数据方法
        getList() {
            if (typeof this.datagrid.url === 'string' && this.datagrid.url) {
                this.getRemoteData();
            } else {
                this.getLocalData();
            }
        },
        getLocalData() {
            let gridData = this.datagrid.data;
            if (typeof this.datagrid.formatData === 'function') {
                gridData = this.datagrid.formatData(gridData)
            }
            this.remoteData = gridData;
        },
        getRemoteData() {
            let params = {};
            // 获取设置的默认参数
            if (typeof this.datagrid.queryParams === 'object') {
                params = this.$deepCopy(this.datagrid.queryParams)
            }
            // 获取排序规则
            if (typeof this.querySorts === 'object' && Object.keys(this.querySorts).length > 0) {
                params.querySorts = this.querySorts;
            }
            // 公共查询条件
            params.queryKeyWord = this.queryKeyWord;
            params.queryKeyFields = [];
            if (this.queryKeyWord !== null || this.queryKeyWord !== '') {
                let fields = [];
                this.table.columns.forEach((item) => {
                    if (typeof item.render_way === 'undefined' || item.render_way === '') {
                        fields.push(item.field);
                    }
                });
                params.queryKeyFields = fields;
            }
            // 所以字段查询条件
            params.queries = this.queries;
            // 设置翻页相关参数
            params.page = this.page;
            params.limit = this.limit;
            // 根据参数获取数据
            let requestData = {
                url: this.datagrid.url,
                method: 'get',
                params: params,
            };
            request(requestData).then(response => {
                const data = response.data;
                let gridData = data.data;
                if (typeof this.datagrid.formatData === 'function') {
                    gridData = this.datagrid.formatData(gridData)
                }
                this.remoteData = gridData;
            })
        },
        // 清空查询条件
        clearQuery() {
            this.queries = [];
            this.querySorts = [];
            this.queryKeyWord = '';
        },
        // 重新请求方法
        refresh() {
            // 检查页码
            this.loading = true;
            this.resetPage()
            this.getList();
            this.$nextTick(function() {
                this.loading = false;
            })
        },
        // 重写序号
        resetIndex(index) {
            const count = (this.page - 1) * this.limit;
            return index + 1 + count;
        },
        // 重置页码
        resetPage() {
            if (this.datagrid.queryParams && this.datagrid.queryParams.page) {
                this.page = this.datagrid.queryParams.page;
            }
        },
        // 重置列字段 TODO:: 如果后期有需要，可以把本地存储的配置数据放到服务器端存储
        resetColumns(columns = '') {
            if (typeof columns === 'object') {
                let localSetting = JSON.stringify(columns);
                localStorage.setItem(this.getStorageName(), localSetting);
                this.columns = this.$deepCopy(columns);
            } else {
                localStorage.removeItem(this.getStorageName());
                this.columns = this.datagrid.columns;
            }
            this.refresh()
        },
        // 重置单击行事件
        resetRowClick(row, event, column) {
            // 开启点击选择取消
            if (typeof this.table.selection === 'boolean' && this.table.selection === true) {
                this.$refs.dataTable.toggleRowSelection(row)
            }
            this.rowClick(row, event, column);
        },
        // 重置查询条件的值
        resetFilterValue(column) {
            let filterWay = ''; // 查询方式
            let resetValue = null; // 查询初始值
            if (column.render_way === 'checkbox') {
                filterWay = 'FilterChecked';
                resetValue = [
                    [], 'in'
                ];
            } else if (column.render_way === 'time') {
                filterWay = 'FilterTimeSelect';
                resetValue = [
                    [], 'intime'
                ];
            } else if (column.render_way === 'between') {
                filterWay = 'FilterBetween';
                resetValue = [
                    [], 'between'
                ];
            } else if (column.render_way === 'number') {
                filterWay = 'FilterNumber';
                resetValue = [null, 'equal'];
            } else {
                filterWay = 'FilterText';
                resetValue = [null, 'like'];
            }
            let status = this.queries.some((item, index) => {
                if (item.field === column.field) {
                    this[filterWay] = item.value;
                    this.FilterSearchRule = item.rule;
                    return true;
                }
            })
            if (!status) {
                this[filterWay] = resetValue[0];
                this.FilterSearchRule = resetValue[1];
            }
            this.resetPage();
        },
        // resetRowClassName({ row, rowIndex }) {
        //     if (rowIndex === 1) {
        //         return 'warning-row';
        //     } else if (rowIndex === 3) {
        //         return 'success-row';
        //     }
        //     return '';
        // },
        handleSelectTime() {
            this.FilterDialogVisible = false;
        },
        // 合计事件 TODO:: 合计 字样显示地方修改
        handleSummaries(param) {
            const { columns, data } = param;
            let sums = [];

            if (typeof this.table.data.footer === 'object') {
                const footer = this.table.data.footer;
                columns.forEach((column, index) => {
                    sums[index] = footer[column.property];
                });
            }
            return sums;
        },
        // 每页行数改变事件
        handleSizeChange(val) {
            this.limit = val;
            this.refresh();
        },
        // 页码切换事件
        handlePageChange(val) {
            this.page = val;
            this.getList();
        },
        // 查询条件改变事件
        handleQueryChange() {
            const query = this.FilterDialogData;
            const element = this.getCellItem(query.cell).querySelector('.search');
            if (query.rule.indexOf('not-') > -1) {
                query.rule_name = '不包含';
                if (query.rule === 'not-equal') {
                    query.rule_name = '不等于';
                }
            } else {
                query.rule_name = '';
            }

            let status = this.queries.some((item) => {
                if (item.field === query.field) {
                    item.value = query.value;
                    item.text = query.text;
                    item.rule = query.rule;
                    item.cell = query.cell;
                    item.rule_name = query.rule_name;
                    return true;
                }
            })
            if (!status && query.value !== null && query.value.length > 0) {
                element.style.color = this.selectedColor;
                let addQuery = {
                    name: query.name,
                    field: query.field,
                    value: query.value,
                    rule: query.rule,
                    text: query.text,
                    cell: query.cell,
                    rule_name: query.rule_name
                }
                this.queries.push(addQuery)
            }
        },
        // 删除查询标签事件
        handleTagClose(tag) {
            const element = this.getCellItem(tag.cell).querySelector('.search');
            element.style.color = this.unSelectedColor;
            this.queries.splice(this.queries.indexOf(tag), 1);
        },
        // 排序改变事件
        handleSort(column, index) {
            const element = this.getCellItem(column.id);
            const ascending = element.querySelector('.ascending');
            const descending = element.querySelector('.descending');

            let cancel_color = this.unSelectedColor;
            let select_color = this.selectedColor;
            let status = this.querySorts.some((item, index) => {
                if (item.column === column.property) {
                    if (item.order === 'desc') {
                        this.querySorts.splice(index, 1);
                        ascending.style.color = cancel_color;
                        descending.style.color = cancel_color;
                    } else if (item.order === 'asc') {
                        ascending.style.color = cancel_color;
                        descending.style.color = select_color;
                        item.order = 'desc';
                    }
                    return true;
                }
            })
            if (!status) {
                let sort = { column: column.property, order: 'asc' };
                this.querySorts.push(sort)
                ascending.style.color = select_color;
                descending.style.color = cancel_color;
            }
            this.getList();
        },
        handleSearch(column, el) {
            let FilterDialogBox = {};
            const element = this.getCellItem(column.id);
            const point = element.getBoundingClientRect();
            FilterDialogBox.x = point.left;
            FilterDialogBox.y = point.top + point.height;

            let mycolumn = {};
            const columnObj = this.getColumn(column);
            mycolumn.name = columnObj.name;
            mycolumn.field = columnObj.field;
            mycolumn.render_way = columnObj.render_way ? columnObj.render_way : 'input';
            mycolumn.filter = columnObj.filter ? columnObj.filter : [];
            mycolumn.value = null;
            mycolumn.text = null;
            mycolumn.rule = null;
            mycolumn.cell = column.id;

            // 设置过滤器里面的值
            this.resetFilterValue(columnObj);

            this.FilterDialogBox = FilterDialogBox;
            this.FilterDialogData = mycolumn;
            this.FilterDialogVisible = true;
        },
        // 当前表格设置需要的识别码
        getStorageName() {
            // 加载之前的配置
            const localStorageName = this.$route.path.replace(/\/[a-z]/g, (v) => {
                return v.replace(/\//, "").toUpperCase();
            });
            return localStorageName;
        },
        // 获取列配置
        getColumn(column) {
            let currentColumn = null;
            this.datagrid.columns.forEach(item => {
                if (item.field === column.property) {
                    currentColumn = item;
                    return true;
                }
            })
            return currentColumn;
        },
        getCellItem(columnId) {
            return document.querySelector('.el-table__header-wrapper th' + '.' + columnId);
        },
        // 渲染cell头
        renderHeader(h, { column, $index }) {
            // 获取当前列的配置
            // let colObj = this.getColumn(column);
            // 解析模版
            return (
                <span>
                    <span class = "sort-style" onClick={ this.handleSort.bind(this, column, $index) }>
                        <span > { column.label } </span>
                        <span class="caret-wrapper">
                            <i class="fa fa-caret-up ascending"></i>
                            <i class="fa fa-caret-down descending"></i>
                        </span>
                    </span>
                    <i class = "fa fa-search search" onClick = { this.handleSearch.bind(this, column, $index) } > </i>
                </span>
            );
        }
    }
}
</script>
<style scoped>
@import '~./DataTable.less';
</style>