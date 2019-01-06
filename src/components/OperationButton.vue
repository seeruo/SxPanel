<template>
    <div class="functional-operation">
        <el-button-group>
            <template v-for="(item,index) in operations">
                <el-button v-if="item.operate==='add'" :key="index" @click="add(item)" type="primary" icon="el-icon-plus">新增</el-button>
                <el-button v-if="item.operate==='import'" :key="index" @click="add(item)"  type="primary" icon="el-icon-download">导入</el-button>
                <el-button v-if="item.operate==='export'" :key="index" @click="add(item)"  type="primary" icon="el-icon-upload2">导出</el-button>
                <el-button v-if="item.operate==='print'" :key="index" @click="add(item)"  type="primary" icon="el-icon-printer">打印</el-button>
            </template>
        </el-button-group>
    </div>
</template>

<script>
    export default {
        name: 'FunctionalOperation',
        data() {
            return {}
        },
        props:{
            operations: {type: Array},
        },
        methods: {
            add(item){
                //新增
                this.$router.push({name:item.name})
            },
            import(item){
                //导入
                //@-1：弹出弹框选择模板
                //@-2：确定导入，等待导入完结
                //@-3：导入完结，刷新列表
                this.$router.push({name:item.name})
            },
            export(item){
                //导出
                //@-1：如果有选框，弹出弹框选择导出全部，还是导出选中项
                //@-2：确定导出，等待导出完结
                this.$router.push({name:item.name})
            },
            print(item){
                //打印
                //@-1：如果有选框，弹出弹框选择打印全部，还是打印选中项
                //@-2：确定打印
                this.$router.push({name:item.name})
            }
        }
    }
</script>

<style scoped lang="less">
    .functional-operation {
        margin: 10px 0px;
    }
</style>