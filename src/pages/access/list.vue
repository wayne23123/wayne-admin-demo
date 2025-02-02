<script setup>
import { ref } from 'vue';

import ListHeader from '@/components/ListHeader.vue';

import {
  getRuleList,
  createRule,
  updateRule,
  updateRuleStatus,
  deleteRule,
} from '@/api/rule';

import { useInitTable, useInitForm } from '@/composables/useCommon';

import FormDrawer from '@/components/FormDrawer.vue';

import IconSelect from '@/components/IconSelect.vue';

const options = ref([]);

const defaultExpandedKeys = ref([]);

const { isLoading, tableData, getData, handleDelete, handleStatusChange } =
  useInitTable({
    getList: getRuleList,
    onGetListSuccess: (response) => {
      // console.log('response', response);

      options.value = response?.data?.data?.rules;

      tableData.value = response?.data?.data?.list;

      defaultExpandedKeys.value = tableData.value.map((item) => {
        return item.id;
      });
    },

    delete: deleteRule,
    updateStatus: updateRuleStatus,
  });

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit,
} = useInitForm({
  form: {
    rule_id: 0,
    menu: 0,
    name: '',
    condition: '',
    method: 'GET',
    status: 1,
    order: 50,
    icon: '',
    frontpath: '',
  },
  rules: {},
  getData,
  update: updateRule,
  create: createRule,
});

// 添加子分類
const addChild = (id) => {
  handleCreate();

  form.rule_id = id;

  form.status = 1;
};
</script>

<template>
  <!-- epcard -->
  <el-card shadow="never" class="border-0">
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>

    <!-- https://element-plus.org/zh-CN/component/tree.html#tree-%E6%A0%91%E5%BD%A2%E6%8E%A7%E4%BB%B6 -->

    <el-tree
      v-loading="isLoading"
      :data="tableData"
      :props="{ label: 'name', children: 'child' }"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <!-- epta -->
          <el-tag size="small" :type="data.menu ? '' : 'info'">{{
            data.menu ? '菜單' : '權限'
          }}</el-tag>

          <el-icon v-if="data.icon" :size="16" class="ml-2"
            ><component :is="data.icon"
          /></el-icon>

          <span>{{ data.name }}</span>

          <div class="ml-auto">
            <!-- epsw -->
            <el-switch
              @change="handleStatusChange($event, data)"
              :modelValue="data.status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>

            <!-- epb -->
            <el-button
              @click.stop="handleEdit(data)"
              text
              type="primary"
              size="small"
              >修改</el-button
            >

            <el-button
              @click.stop="addChild(data.id)"
              text
              type="primary"
              size="small"
              >增加</el-button
            >

            <el-popconfirm
              title="是否要刪除該紀錄?"
              confirmButtonText="確定"
              cancelButtonText="取消"
              @confirm="handleDelete(data.id)"
            >
              <template #reference>
                <el-button text="true" type="primary" size="small" class="px-1">
                  刪除
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
        <!-- <span class="flex justify-between w-full">
          <span class="flex items-center">
            <el-icon>
              <component :is="data.icon" />
            </el-icon>
            <span class="ml-2">{{ node.label }}</span>
          </span>
          <span class="flex items-center">
            <el-button size="small" text type="primary" @click="() => {}">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button size="small" text type="primary" @click="() => {}">
              <el-icon><Delete /></el-icon>
            </el-button>
          </span>
        </span> -->
      </template>
    </el-tree>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <!-- epf -->
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <!-- {{ form.rule_id }} -->
        <!-- https://element-plus.org/zh-CN/component/cascader.html#cascader-%E7%BA%A7%E8%81%94%E9%80%89%E6%8B%A9%E5%99%A8 -->
        <el-form-item label="上級菜單" prop="rule_id">
          <el-cascader
            v-model="form.rule_id"
            :options="options"
            :props="{
              value: 'id',
              label: 'name',
              children: 'child',
              checkStrictly: true,
              emitPath: false,
            }"
            placeholder="請選擇上級菜單"
          />
        </el-form-item>

        <!-- https://element-plus.org/zh-CN/component/radio.html#radio-%E5%8D%95%E9%80%89%E6%A1%86 -->
        <el-form-item label="菜單/規則" prop="menu">
          <el-radio-group v-model="form.menu">
            <el-radio :value="1" border>菜單</el-radio>
            <el-radio :value="0" border>規則</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="名稱" prop="name">
          <el-input
            v-model="form.name"
            style="width: 30%"
            placeholder="請輸入名稱"
          ></el-input>
        </el-form-item>

        <!-- {{ form.icon }} -->
        <el-form-item v-if="form.menu == 1" label="菜單圖標" prop="icon">
          <IconSelect v-model="form.icon" />
        </el-form-item>

        <el-form-item
          v-if="form.menu == 1 && form.rule_id > 0"
          label="前端路由"
          prop="frontpath"
        >
          <el-input
            v-model="form.frontpath"
            placeholder="請輸入前端路由"
          ></el-input>
        </el-form-item>

        <el-form-item v-if="form.menu == 0" label="後端規則" prop="condition">
          <el-input
            v-model="form.condition"
            placeholder="請輸入後端規則"
          ></el-input>
        </el-form-item>

        <!-- https://element-plus.org/zh-CN/component/select.html#select-%E9%80%89%E6%8B%A9%E5%99%A8 -->
        <el-form-item v-if="form.menu == 0" label="請求方式" prop="method">
          <el-select
            v-model="form.method"
            class="mt-2"
            placeholder="請選擇請求方式"
          >
            <el-option
              v-for="item in ['GET', 'POST', 'PUT', 'DELETE']"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <!-- https://element-plus.org/zh-CN/component/input-number.html -->
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="0" :max="1000" />
        </el-form-item>
      </el-form>
    </FormDrawer>

    <!-- <el-tree
      v-loading="isLoading"
      :data="tableData"
      :props="{ label: 'name', children: 'child' }"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
    ></el-tree> -->
  </el-card>
</template>

<style scoped>
.custom-tree-node {
  flex: 1;
  font-size: 14px;
  padding-right: 8px;
  @apply flex items-center;
}

:deep(.el-tree-node__content) {
  padding: 20px 0;
}
</style>
