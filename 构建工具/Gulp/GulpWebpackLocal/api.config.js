/**
 *  该文件可存于本地,避免冲突无需每次提交,如果有经常使用的后端api会定期更新
 *  目前只支持 mockApi 代表的本地数据
 *  .监听的gulp 接口请求默认待上mockApi
 *  +监听的gulp 是用于js压缩上传sftp upload
 */
const apiConfig = [
    { regexp: /\/mockApi\//ig, api: "http://127.0.0.1:3000" },
];
module.exports = apiConfig;