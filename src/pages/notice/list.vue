<script setup>
import { ref } from 'vue';

const tableData = ref([]);

const getData = () => {
  tableData.value = [
    {
      id: 1,
      title: '通知1',
      content: '通知1',
      order: 0,
      created_time: '2022-01-01 00:00:00',
      updated_at: '2022-01-01 00:00:00',
    },
  ];
};

getData();

const handleDelete = (id) => {
  console.log(id);
};
</script>

<template>
  <!-- rpcard -->
  <el-card shadow="never" class="border-0">
    <div class="flex items-center justify-between mb-4">
      <el-button type="primary" size="small">新增</el-button>
      <el-toolttip effect="dark" content="重新整理" placement="top">
        <el-button text>
          <el-icon :size="20"> <Refresh /> </el-icon
        ></el-button>
      </el-toolttip>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="title" label="公告標題" />
      <el-table-column prop="created_time" label="發布時間" width="300" />
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button type="primary" text size="small">修改</el-button>

          <el-popconfirm
            title="是否要刪除該公告?"
            confirmButtonText="確定"
            cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button text="true" type="primary" size="small" class="px-1">
                刪除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
