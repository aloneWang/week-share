<template>
  <div>
    <Table :columns="columns1" :data="data1" ref="table"></Table>
    <Button @click="downLoad('t2t')">下载（table to book）</Button>
  </div>
</template>
<script>
import XLSX from "xlsx";
import fileSaver from 'file-saver'
export default {
  data() {
    return {
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  },
  mounted() {

  },
  methods: {
    downLoad(type) {
      let el = this.$refs.table.$el
      switch(type) {
        case 't2t':
          // 表格直转 book
          let wb = XLSX.utils.table_to_book(el)
          console.log(`wb\n${wb}`)
          // 生成指定文件
          let wbout = XLSX.write(wb,{
            bookSST: false,
            type: 'array',
            bookType: 'xlsx'
          })
          console.log(`wb\n${wbout}`)
          let blob = new Blob([wbout], {type: 'application/octet-stream'}) // blob 文件对象
          console.log(`wb\n${blob}`)
          fileSaver.saveAs(blob, '文件.xlsx')

      }
    },

  }
};
</script>