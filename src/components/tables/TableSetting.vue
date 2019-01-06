<template>
    <div class="table-setting">
        <side-dialog :visible.sync="dialogStatus" width="520px">
            <el-row slot="title">
                <el-col :span="24">
                    <div class="dialog-title"><i class="el-icon-setting"></i> 列表设置</div>
                </el-col>
            </el-row>
            <el-table :data="tableHeadData" style="width: 100%;" class="head-controller" show-header :row-style="{'cursor': 'move'}" size="mini">
                <el-table-column prop="name" label="名称" width="120"></el-table-column>
                <el-table-column label="固定列" width="200" align="center">
                    <template slot-scope="scope">
                        <el-radio-group v-model="scope.row.fixed" size="mini">
                            <el-radio-button label="left">左</el-radio-button>
                            <el-radio-button label="false">否</el-radio-button>
                            <el-radio-button label="right">右</el-radio-button>
                        </el-radio-group>
                    </template>
                </el-table-column>
                <el-table-column label="显示/隐藏" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.hide" inactive-color="#409EFF" active-color="#cdcdcd">
                        </el-switch>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="reset" size="mini">重置</el-button>
                <el-button @click="comfirm" size="mini">确 定</el-button>
            </span>
        </side-dialog>
    </div>
</template>
<script>
import SideDialog from '@/components/dialogs/SideDialog';
import Sortable from 'sortablejs';

export default {
    name: "ListHeadSetting",
    props: {
        SettingDialog: { type: Boolean },
        tableHead: { type: Array },
        resetColumns: { type: Function }
    },
    components: {
        SideDialog,
    },
    data() {
        return {
            sortable: null,
            tableHeadData: [],
            dialogStatus: false,
            oldIndex: 0,
            newIndex: 0,
            indexes:[],
        }
    },
    watch: {
        SettingDialog(val) {
            this.dialogStatus = val;
        },
        dialogStatus(val) {
            this.indexes = [];
            if (val) {
                let tableData = this.$deepCopy(this.tableHead);
                tableData.forEach(function(item){
                    if (typeof item.fixed === 'undefined') {
                        item.fixed = false;
                    }else if(item.fixed === 'left'){
                        item.fixed = 'left';
                    }else{
                        item.fixed = 'right';
                    }
                });
                this.tableHeadData = tableData;
                this.$nextTick(() => {
                    this.setSort()
                });
            }
            this.$emit('update:SettingDialog', val)
        }
    },
    methods: {
        setSort() {
            const el = document.querySelectorAll('.head-controller > .el-table__body-wrapper > table > tbody')[0];
            this.sortable = Sortable.create(el, {
                ghostClass: 'sortable-ghost',
                onEnd: evt => {
                    this.indexes.push({'old':evt.oldIndex,'new':evt.newIndex})
                }
            });
        },
        comfirm() {
            for(let i in this.indexes){
                if (this.indexes[i].old !== this.indexes[i].new) {
                    let targetRow = this.tableHeadData.splice(this.indexes[i].old, 1)[0];
                    this.tableHeadData.splice(this.indexes[i].new, 0, targetRow);
                }
            }
            let showData = []
            let hideData = []
            for(let k in this.tableHeadData){
                if (this.tableHeadData[k].hide) {
                    hideData.push(this.tableHeadData[k])
                }else{
                    showData.push(this.tableHeadData[k])
                }
            }
            showData = showData.concat(hideData)
            this.tableHeadData = null
            this.resetColumns(showData)
            this.dialogStatus = false;
        },
        reset() {
            if (typeof this.resetColumns === 'function') {
                this.tableHeadData = null
                this.resetColumns()
                this.dialogStatus = false;
            }
        }
    },
}
</script>
<style scoped>
.sortable-ghost {
    opacity: .8;
    color: #fff !important;
    background: #42b983 !important;
}

.dialog-title {
    line-height: 24px;
    font-size: 18px;
    color: #303133;
}

.el-icon-setting {
    color: #409eff;
}

.table-setting {
    position: relative;
}

.el-dialog {}

.head-controller {
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
}

.row-clsss {
    /*cursor:dr;*/
}
</style>