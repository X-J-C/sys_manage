<template>
   <div class="search-content">
       <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="搜索--资产信息" name="1">
            <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" label-width="150px">
                <el-form-item label="IP地址">
                    <el-input v-model="formInline.ip" placeholder="例：10.1"></el-input>
                </el-form-item>
                <el-form-item label="所属网段">
                    <el-input v-model="formInline.net" placeholder="例：10.1.0.0/24"></el-input>
                </el-form-item>
                <el-form-item label="Mac地址">
                    <el-input v-model="formInline.address" placeholder="例：0000-0000-0000"></el-input>
                </el-form-item>
                <el-form-item label="MAC厂商">
                    <el-input v-model="formInline.primary" placeholder="例：Cisco Systems"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button >重置</el-button>
                </el-form-item>
                </el-form>
        </el-collapse-item>
        <el-collapse-item title="搜索--开放服务" name="2">
            <el-form :inline="true" :model="open_form"  ref="open_form" class="demo-form-inline" label-width="100px">
                <el-form-item label="IP地址">
                    <el-input v-model="open_form.ip" placeholder="例：10.151"></el-input>
                </el-form-item>
                <el-form-item label="端口号">
                    <el-input v-model="open_form.port" placeholder="例：22"></el-input>
                </el-form-item>
                <el-form-item label="服务名">
                    <el-input v-model="open_form.name" placeholder="例：weblogic"></el-input>
                </el-form-item>
                <el-form-item label="WEB标题">
                    <el-input v-model="open_form.title" placeholder="例：信息系统"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button >重置</el-button>
                </el-form-item>
                </el-form>
        </el-collapse-item>
        <el-collapse-item title="搜索--风险漏洞" name="3">
            <el-form :inline="true" :model="danger_form"  ref="danger_form" class="demo-form-inline" label-width="100px">
                <el-form-item label="IP地址">
                    <el-input v-model="danger_form.ip" placeholder="例：10.151"></el-input>
                </el-form-item>
                <el-form-item label="端口号">
                    <el-input v-model="danger_form.port" placeholder="例：22"></el-input>
                </el-form-item>
                <el-form-item label="漏洞信息">
                    <el-input v-model="danger_form.name" placeholder="例：weblogic"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button >重置</el-button>
                </el-form-item>
                </el-form>
        </el-collapse-item>
        </el-collapse>
   </div>
</template>

<script>
export default {
    data() {
        return {
             activeName: '1',
             formInline: {
                ip:'',
                net:'',
                address:'',
                primary:''
            },
            open_form: {
                ip:'',
                port:'',
                name:'',
                title:''
            },
            danger_form: {
                ip:'',
                port:'',
                name:'',
            }
        };
    },

    components: {},

    computed:{},

    mounted () {},

    methods: {
        resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
}
</script>

<style >
.search-content{
    height: 100%;
    background-color: #fff;
}
.el-collapse-item{
    margin: 10px;
}
</style>