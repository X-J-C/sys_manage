<template>
  <div class="means_content">
    <el-row style="padding:10px;">
       <el-button  type="primary" @click="dialogFormVisible = true" >新增扫描网段</el-button>
    </el-row>
    <el-row>
      <el-col :span="4" style="margin-top:10px">
        <el-button
          type="primary"
          style="margin: 10px"
          v-show="treeData.length == 0"
          @click.enter="addParentLevelNode"
          >新增节点</el-button
        >
        <el-tree
          :data="treeData"
          node-key="id"
          show-checkbox
          default-expand-all
          @node-click="handleLeftclick"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          ref="tree"
        >
          <template #default="{ node }">
            <span class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        v-show="firstLevel"
                        @click.enter="addSameLevelNode"
                        >新增同级</el-dropdown-item
                      >
                      <el-dropdown-item
                        v-show="lastLevel"
                        @click.enter="addChildNode"
                        >新增下级</el-dropdown-item
                      >
                      <el-dropdown-item @click.enter="editNode"
                        >编辑</el-dropdown-item
                      >
                      <el-dropdown-item @click.enter="deleteNode"
                        >删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </span>
            </span>
          </template>
        </el-tree>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="19">
       
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          style="width: 100%"
        >
          <el-table-column type="selection" width="50"> </el-table-column>
          <el-table-column type="index" label="序号" width="50" :index="indexMethod">
          </el-table-column>
          <el-table-column property="name" label="IP Subnet"> </el-table-column>
          <el-table-column property="rang" label="IP Range"> </el-table-column>
          <el-table-column property="detail" label="描述"> </el-table-column>
          <el-table-column property="address" label="节点位置">
          </el-table-column>
          <el-table-column property="type" label="网段类型"> </el-table-column>
          <el-table-column property="rate" label="使用率"> </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin: 10px; text-align: end"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          layout="total,sizes,prev, pager, next,jumper"
          :page-sizes="[3, 5, 7, 9]"
          :total="tableData.length"
          :page-size="pageSize"
          :current-page="currentPage"
        >
        </el-pagination>
      </el-col>
    </el-row>



    <el-dialog title="新增IP" v-model="dialogFormVisible" width="30%">
  <el-form :model="form">
    <el-form-item label="IP Subnet" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="描述" :label-width="formLabelWidth">
      <el-input v-model="form.detail" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="类型" :label-width="formLabelWidth">
      <el-select v-model="form.type" placeholder="请选择" style="width: 100%">
        <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所属节点" :label-width="formLabelWidth">
      <el-select v-model="form.point" placeholder="请选择" style="width: 100%">
        <el-option
      v-for="item in option"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </span>
  </template>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: "广州网服信息技术有限公司",
          isEdit: true,
        },
      ],
      isShow: false,
      currentData: "",
      currentNode: "",
      menuVisible: false,
      firstLevel: false,
      lastLevel: false,
      filterText: "",
      maxexpandId: 4,
      tableData: [
        {
          name: "10.8.8.0/24",
          rang: "10.8.8.0-10.8.8.25",
          detail: "",
          address: "广州网服信息技术有限公司",
          type: "终端网段",
          rate: "13%",
        },
        {
          name: "10.8.8.0/24",
          rang: "10.8.8.0-10.8.8.25",
          detail: "",
          address: "广州网服信息技术有限公司",
          type: "终端网段",
          rate: "13%",
        },
        {
          name: "10.8.8.0/24",
          rang: "10.8.8.0-10.8.8.25",
          detail: "",
          address: "广州网服信息技术有限公司",
          type: "终端网段",
          rate: "13%",
        },
        {
          name: "10.8.8.0/24",
          rang: "10.8.8.0-10.8.8.25",
          detail: "",
          address: "广州网服信息技术有限公司",
          type: "终端网段",
          rate: "13%",
        },
        {
          name: "10.8.8.0/24",
          rang: "10.8.8.0-10.8.8.25",
          detail: "",
          address: "广州网服信息技术有限公司",
          type: "终端网段",
          rate: "13%",
        },
        {
          name: "10.8.8.0/24",
          rang: "10.8.8.0-10.8.8.25",
          detail: "",
          address: "广州网服信息技术有限公司",
          type: "终端网段",
          rate: "13%",
        },
      ],
      totalSize: 1,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 3, // 每页的数据条数
       dialogFormVisible: false,
        form: {
          name: '',
          detail: '',
          type:'',
          point:''
        },
        formLabelWidth: '120px',
         options: [{
          value: '选项1',
          label: '终端网段'
        }, {
          value: '选项2',
          label: '服务器网段'
        }, {
          value: '选项3',
          label: '网管网段'
        }],
        option: [{
          value: '选项1',
          label: '终端网段'
        }, {
          value: '选项2',
          label: '服务器网段'
        }, {
          value: '选项3',
          label: '网管网段'
        }],
        value: ''
    };
  },
  methods: {
    // append(data) {
    //   const newChild = {id: id++, label: 'testtest', children: []};
    //   if (!data.children) {
    //     this.$set(data, 'children', [])
    //   }
    //   data.children.push(newChild);
    // },

    // 鼠标左击事件

    handleLeftclick(data, node) {
      this.currentData = data;
      this.currentNode = node;
      if (node.level != 1) {
        //如果是根节点则不显示新增同级
        this.firstLevel = true;
      } else {
        this.firstLevel = false;
      }
      if (node.level != 3) {
        //如果是最后一级则不显示新增下级
        this.lastLevel = true;
      } else {
        this.lastLevel = false;
      }
    },
    // 增加父节点事件
    addParentLevelNode() {
      let id = Math.ceil(Math.random() * 100);
      this.$prompt("请输入父节点名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          let treeD = { id: id, label: value };
          this.$refs.tree.append(treeD, this.currentNode.parent);
        })
        .catch(() => {});
    },
    // 增加同级节点事件
    addSameLevelNode() {
      let id = Math.ceil(Math.random() * 100);
      this.$prompt("请输入子节点名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          let treeD = { id: id, label: value };
          this.$refs.tree.append(treeD, this.currentNode.parent);
        })
        .catch(() => {});
    },

    // 增加子级节点事件

    addChildNode() {
      console.log(this.currentData);
      console.log(this.currentNode);
      if (this.currentNode.level >= 3) {
        this.$message.error("最多只支持三级！");

        return false;
      }
      let id = Math.ceil(Math.random() * 100);
      this.$prompt("请输入子节点名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          console.log(">>>>>>>", value);
          let treeD = { id: id, label: value };
          this.$refs.tree.append(treeD, this.currentNode);
        })
        .catch(() => {});
    },
    // 删除节点

    deleteNode() {
      this.$confirm(
        "确定删除'${this.currentNode.label}'节点, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          console.log(">>>>删除", this.currentNode.data.code);
          this.$refs.tree.remove(this.currentNode);
        })
        .catch(() => {});
    },
    //编辑节点
    editNode() {
      console.log(">>>>>修改", this.currentData.code);
      if (this.currentData.isEdit) {
        this.$prompt("请输入节点名称", "提示", {
          confirmButtonText: "确定",
          inputValue: this.currentNode.data.label,
          cancelButtonText: "取消",
        }).then(({ value }) => {
          console.log("编辑", this.$refs.tree);
          this.$set(this.currentData, "label", value);
        });
      }
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
     indexMethod(index){
        return (index+1) +(this.currentPage -1 ) *this.pageSize
    },
     handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning',
                confirmButtonText: "确定",
          cancelButtonText: "取消",
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {
                  this.$message.error('删除失败');
                });
        },

  },
};
</script>


<style >



</style>