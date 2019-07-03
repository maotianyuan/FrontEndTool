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