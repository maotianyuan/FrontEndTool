```js
export function utilDownload (res) {
  if (!res.data) {
    return
  }
  if (res.headers['content-type'] === 'application/json') {
    var reader = new FileReader()
    reader.readAsText(new Blob([res.data]), 'utf-8')
    reader.onload = function (e) {
      const res = JSON.parse(reader.result)
      Message({
        type: 'warning',
        message: res.rows,
        duration: 1000,
        customClass: 'messageCss'
      })
    }
    return
  }
  let fileName = res.headers['content-disposition'] && res.headers['content-disposition'].split(';')[1].split('filename=')[1]
  const fileNameUnicode = res.headers['content-disposition'] && res.headers['content-disposition'].split('filename*=')[1]
  if (fileNameUnicode) {
    fileName = decodeURIComponent(fileNameUnicode.split("''")[1])
  }
  if (fileName) {
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
  }
}
```
```js
   downExampleBtn(e) {
      let _e = window.event || e
      _e.preventDefault()
      this.$axios.get('/nlp/downloadExample', {
        responseType: 'blob'
      }).then((res) => {
        utilDownload(res)
      })
    },
    downOriginBtn(id) {
      let _e = window.event || e
      _e.preventDefault()
      this.$axios.get(`/nlp/downloadOriginFile?id=${id}`, {
        responseType: 'blob'
      }).then((res) => {
        utilDownload(res)
      })
    },
    downBtnClick(e) {
      let _e = window.event || e
      _e.preventDefault()
      let id = e.target.dataset.id
      this.$axios.get(`/nlp/dealJiqiDown?id=${id}`, {
        responseType: 'blob'
      }).then((res) => {
        utilDownload(res)
      })
    },

    ```