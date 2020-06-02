<template>
  <div>
    <Table :columns="columns1" :data="data1" ref="table"></Table>
    <Button @click="downLoad('t2t')">下载（table to book）</Button>
    <Button @click="downLoad('d2b')">下载（数据自定义下载）</Button>
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
        },
        {
          title: 'date',
          key: 'date'
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
          let wb = XLSX.utils.table_to_book(el,{ raw: true})
          console.log(`wb\n${wb}`)
          // 生成指定文件
          let wbout = XLSX.write(wb,{
            bookSST: false,
            type: 'array',
            bookType: 'xlsx'
          })
          console.log(`wb\n${wbout}`)
          // XLSX.writeFile(wb, '文件.xlsx', {
          //   bookSST: false,
          //   type: 'array',
          //   bookType: 'xlsx'
          // })
          let blob = new Blob([wbout], {type: 'application/octet-stream'}) // blob 文件对象
          console.log(`wb\n${blob}`)
          fileSaver.saveAs(blob, '文件.xlsx')
          break
        case 'd2b':
          // 数据 -> sheet -> book -> excel
          // aoa_to_sheet
          const keys = this.columns1.map( it => it.key)
          const thead = this.columns1.map( it => it.title)
          const data = this.data1.map( it => {
              // let _data = []
              // for(let i in it) {
              //   if(keys.includes(i)) {
              //     _data.push(it[i])
              //   }
              // }
              // return _data
              return keys.map( key => {
                return it[key]
              })
          })
          console.log([thead, ...data])
          const sheet = XLSX.utils.aoa_to_sheet([thead, ...data])
          console.log(sheet)
          this.sheetToExcel(sheet)
          break
        default:;
      }
    },
    // sheet -> book
    sheetToExcel(sheet, sheetName = "sheet1") {
      let workbook = {
        SheetNames: [sheetName],
        Sheets: {
          [sheetName]: sheet
        }
      }
      let wpts = {
        type: 'binary',
        bookType: 'xlsx',
        bookSST: false,
      }
      XLSX.writeFile(workbook,'文件.xlsx', wpts)
    }
  }
};
</script>