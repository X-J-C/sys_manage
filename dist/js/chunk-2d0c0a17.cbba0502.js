(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c0a17"],{4335:function(e,t,a){"use strict";a.r(t);var o=a("7a23");const l={class:"type_content"},i={class:"user_add"},c=Object(o["createTextVNode"])("新增IP类型"),d=Object(o["createTextVNode"])("编辑"),n=Object(o["createTextVNode"])("删除"),r={class:"dialog-footer"},b=Object(o["createTextVNode"])("取 消"),m=Object(o["createTextVNode"])("确 定"),s={class:"dialog-footer"},u=Object(o["createTextVNode"])("取 消"),h=Object(o["createTextVNode"])("确 定");function j(e,t,a,j,O,p){const V=Object(o["resolveComponent"])("el-button"),g=Object(o["resolveComponent"])("el-table-column"),C=Object(o["resolveComponent"])("el-table"),f=Object(o["resolveComponent"])("el-pagination"),x=Object(o["resolveComponent"])("el-input"),w=Object(o["resolveComponent"])("el-form-item"),N=Object(o["resolveComponent"])("el-form"),y=Object(o["resolveComponent"])("el-dialog");return Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,[Object(o["createVNode"])("div",l,[Object(o["createVNode"])("div",i,[Object(o["createVNode"])(V,{type:"primary",onClick:t[1]||(t[1]=e=>O.dialogFormVisible=!0)},{default:Object(o["withCtx"])(()=>[c]),_:1})]),Object(o["createVNode"])(C,{data:O.tableData.slice((O.currentPage-1)*O.pageSize,O.currentPage*O.pageSize),style:{width:"100%"}},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(g,{type:"index",label:"序号",width:"100",index:p.indexMethod},null,8,["index"]),Object(o["createVNode"])(g,{property:"name",label:"类型名称"}),Object(o["createVNode"])(g,{property:"number",label:"数量统计"}),Object(o["createVNode"])(g,{label:"操作"},{default:Object(o["withCtx"])(e=>[Object(o["createVNode"])(V,{size:"mini",onClick:t=>p.handleEdit(e.$index,e.row)},{default:Object(o["withCtx"])(()=>[d]),_:2},1032,["onClick"]),Object(o["createVNode"])(V,{size:"mini",type:"danger",onClick:t=>p.handleDelete(e.$index,e.row)},{default:Object(o["withCtx"])(()=>[n]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),Object(o["createVNode"])(f,{style:{margin:"10px","text-align":"end"},onSizeChange:p.handleSizeChange,onCurrentChange:p.handleCurrentChange,background:"",layout:"total,sizes,prev, pager, next,jumper","page-sizes":[3,5,7,9],total:O.tableData.length,"page-size":O.pageSize,"current-page":O.currentPage},null,8,["onSizeChange","onCurrentChange","total","page-size","current-page"])]),Object(o["createVNode"])(y,{title:"新增IP类型",modelValue:O.dialogFormVisible,"onUpdate:modelValue":t[5]||(t[5]=e=>O.dialogFormVisible=e),width:"30%"},{footer:Object(o["withCtx"])(()=>[Object(o["createVNode"])("span",r,[Object(o["createVNode"])(V,{onClick:t[3]||(t[3]=e=>O.dialogFormVisible=!1)},{default:Object(o["withCtx"])(()=>[b]),_:1}),Object(o["createVNode"])(V,{type:"primary",onClick:t[4]||(t[4]=e=>O.dialogFormVisible=!1)},{default:Object(o["withCtx"])(()=>[m]),_:1})])]),default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(N,{model:O.form},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(w,{label:"类型","label-width":O.formLabelWidth},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(x,{modelValue:O.form.type,"onUpdate:modelValue":t[2]||(t[2]=e=>O.form.type=e)},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"]),Object(o["createVNode"])(y,{title:"编辑用户",modelValue:O.dialogeditVisible,"onUpdate:modelValue":t[9]||(t[9]=e=>O.dialogeditVisible=e),width:"30%"},{footer:Object(o["withCtx"])(()=>[Object(o["createVNode"])("span",s,[Object(o["createVNode"])(V,{onClick:t[7]||(t[7]=e=>O.dialogeditVisible=!1)},{default:Object(o["withCtx"])(()=>[u]),_:1}),Object(o["createVNode"])(V,{type:"primary",onClick:t[8]||(t[8]=e=>O.dialogeditVisible=!1)},{default:Object(o["withCtx"])(()=>[h]),_:1})])]),default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(N,{model:O.editform},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(w,{label:"类型","label-width":O.formLabelWidth},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(x,{modelValue:O.editform.name,"onUpdate:modelValue":t[6]||(t[6]=e=>O.editform.name=e)},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"])],64)}var O={data(){return{tableData:[{name:"服务器",number:"0"},{name:"服务器",number:"0"},{name:"服务器",number:"0"},{name:"服务器",number:"0"},{name:"服务器",number:"0"},{name:"服务器",number:"0"}],totalSize:1,currentPage:1,total:20,pageSize:3,dialogFormVisible:!1,formLabelWidth:"100px",form:{type:""},dialogeditVisible:!1,editform:{name:""}}},components:{},computed:{},mounted(){},methods:{handleEdit(e,t){console.log(e,t),this.dialogeditVisible=!0,this.editform=Object.assign({},t)},handleDelete(e,t){this.$confirm("确定要删除吗？","提示",{type:"warning",confirmButtonText:"确定",cancelButtonText:"取消"}).then(()=>{this.$message.success("删除成功"),this.tableData.splice(e,1)}).catch(()=>{this.$message.error("删除失败")})},handleSizeChange(e){this.currentPage=1,this.pageSize=e},handleCurrentChange(e){this.currentPage=e},indexMethod(e){return e+1+(this.currentPage-1)*this.pageSize}}};O.render=j;t["default"]=O}}]);
//# sourceMappingURL=chunk-2d0c0a17.cbba0502.js.map