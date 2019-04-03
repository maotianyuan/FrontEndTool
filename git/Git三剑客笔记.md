### 目录

- 1、cat-file
- 2、分离头指针
- 3、git log
- 4、git diff
- 5、git commit blob tree 关系
- 6、删除暂存区某一个文件
- 7、连续多个commit整理成1个
- 8、不连续多个commit整理成1个
- 9、删除 移动
- 10、备份 - 智能协议 哑协议

>1、cat-file
```
git cat-file -p 2e8df10a
git cat-file -t 2e8df10a
```
>2、分离头指针
```
git checkout 2e8df10a
危险：可新提交内容，若切换分钟易被垃圾回收；
```
>3、git log
```
git log --online
git log -n4
git log --online --all -n4 --graph
git help --web log
```
>4、git diff
```
git diff HEAD HEAD^
git diff HEAD HEAD^^
git diff HEAD HEAD~1
git diff HEAD HEAD~2
```
>5、git commit blob tree 关系
```
commit 包括多个tree 和 blob
tree 文件夹
blob 具体文件
```
>6、删除暂存区某一个文件
```
git reset HEAD -- style/style.css readme.md
```

>7、连续多个commit整理成1个
```
未提交
git rebase -i 需要修改commit的父commit
squash
pick  1
s     2
s     3
pick  4

2\3合并到1中
跳出提示 
```

>8、不连续多个commit整理成1个
```
在vim中，讲需要合并一起的 进行换行
```

>9、删除 移动

```
git rm readme.md  直接赞成区
git mv readme readme.md 
```

>10、备份 - 智能协议 哑协议
```
git clone --bare XXXX ya.git
git remote -v
git remote add zhineng file:///地址
```

>远端fetch
```
git fetch 
```