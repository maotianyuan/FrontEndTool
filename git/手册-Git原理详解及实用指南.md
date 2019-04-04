## 目录

- 一、clone分支
- 二、删除分支
- 三、push本质
- 四、merge
- 五、Feature Branching：最流行的工作流
- 六、log
- 七、rebase
- 八、amend
- 九、stash
- 十、reflog ：引用的 log
- 十一、reset 的本质
- 十二、checkout 本质
- 十三、revert

### 什么是版本控制系统（VCS)
>版本控制系统（VCS）最**基本的功能**是版本控制。所谓版本控制，意思就是在文件的修改历程中保留修改历史，让你可以方便地撤销之前对文件的修改操作。

### 一、 clone分支
```
> 手动指定本地仓库的根目录名称
git clone 地址 git-practice-another

下载指定分支代码
git clone -b webdev https---

git config --add --local user.name ''


遇到 LF would be replaced by CRLF in ...
配置
    safecrlf = false
    autocrlf = false

git reset HEAD

其他
rm -f ./.git/index.lock
rm .git/index.lock
```

### 二、 删除分支
>HEAD 指向的 branch 不能删除。如果要删除 HEAD 指向的 branch，需要先用 checkout 把 HEAD 指向其他地方。

>出于安全考虑，没有被合并到 master 过的 branch 在删除时会失败（因为怕你误删掉「未完成」的 branch 啊）：

>如果你确认是要删除这个 branch （例如某个未完成的功能被团队确认永久毙掉了，不再做了），可以把 -d 改成 -D，小写换成大写，就能删除了
```
git branch -d feature1
git branch -D feature1
删除远端分支
git push origin --delete feature/report
```

### 三、push本质

>push 是把当前的分支上传到远程仓库，并把这个 branch 的路径上的所有 commits 也一并上传。

>push 的时候，如果当前分支是一个本地创建的分支，需要指定远程仓库名和分支名，用 git push origin branch_name 的格式，而不能只用 git push；或者可以通过 git config 修改 push.default 来改变 push 时的行为逻辑。

>push 的时候之后上传当前分支，并不会上传 HEAD；远程仓库的 HEAD 是永远指向默认分支（即 master）的。

#### 四、merge
```
git merge --abort
```

1. merge 的含义：从两个 commit「分叉」的位置起，把目标 commit 的内容应用到当前 commit（HEAD 所指向的 commit），并生成一个新的 commit；
2. merge 的适用场景：
    单独开发的 branch 用完了以后，合并回原先的 branch；
    git pull 的内部自动操作。
3. merge 的三种特殊情况：
    冲突原因：当前分支和目标分支修改了同一部分内容，Git 无法确定应该怎样合并；
   应对方法：解决冲突后手动 commit。
4. HEAD 领先于目标 commit：Git 什么也不做，空操作；
5. HEAD 落后于目标 commit：fast-forward。

#### 五、Feature Branching：最流行的工作流
>[边开发边发布、边开发边更新、边开发边修复」的持续开发策略，所以代码分享的不便会极大地影响团队的开发效率
```
git checkout master
git pull # merge 之前 pull 一下，让 master 更新到和远程仓库同步
git merge books

git push
git branch -d books
git push origin -d books # 用 -d 参数把远程仓库的 branch 也删了

```

1. 每个新功能都新建一个 branch 来写；
2. 写完以后，把代码分享给同事看；写的过程中，也可以分享给同事讨论。另外，借助 GitHub 等服务提供方的 Pull Request 功能，可以让代码分享变得更加方便；
3. 分支确定可以合并后，把分支合并到 master ，并删除分支。


#### 六、log

```
git log
git log -p [-p
是 --patch 的缩写,你可以看到具体每个 commit 的改动细]

git log --stat [查看简要统计]

git show [某个具体的 commit 的改动内容，可以用 show]

git show 5e68b0d8

git show 5e68b0d8 shopping\ list.txt


查看工作目录和暂存区的区别：git diff 不加选项参数
查看工作目录和上一条 commit 的区别：git diff HEAD
查看暂存区和上一条 commit 的区别：git diff --staged（或 --cached）
``` 

#### 七、rebase
禁止向集成分支执行变更历史的操做，禁止变基
```
git checkout branch1
git rebase master

git checkout master
git merge branch1

```


#### 八、amend
>刚刚提交的代码没有push，发现写错了怎么办？
```
git commit -—amend
```

>写错的不是最新的提交，而是倒数第二个【远程未提交push】？
```
git rebase -i 目标commit


修改pick 为edit
git commit --amend 修改信息
git rebase --continue

```

>比错还错，想直接丢弃刚写的提交？
```
git reset --hard HEAD^
```


#### 九、stash
 
>stash：临时存放工作目录的改动
在自己分支上面执行
git stash
git stash list 查看信息
切换到需要打包的分支，结束后，回到自己分支
git stash apply 执行后list还有值
git stash pop   执行后list没有删
git stash drop 删除


####  十、reflog ：引用的 log
>reflog 默认查看 HEAD 的移动历史，除此之外，也可以手动加上名称来查看其他引用的移动历史，例如某个 branch：
```
git reflog master
HEAD 的移动历史
git reflog  
git checkout c08de9a
git checkout -b branch1
```

>注意：不再被引用直接或间接指向的 commits 会在一定时间后被 Git 回收，所以使用 reflog 来找回删除的 branch 的操作一定要及时，不然有可能会由于 commit 被回收而再也找不回来


#### 十一、reset 的本质
>用这行代码可以撤销掉当前 commit
```
git reset --hard HEAD^
```
>reset它是用来重置 HEAD 以及它所指向的 branch 的位置的。
>Git 的历史只能往回看，不能向未来看，所以把 HEAD 和 branch 往回移动，就能起到撤回 commit 的效果。

- reset --hard：重置工作目录
- reset --soft：保留工作目录
- reset 不加参数：保留工作目录，并清空暂存区
--mixed（默认）：重置位置的同时，保留工作目录的内容，并清空暂存区


#### 十二、checkout 本质
>git checkout branch名 的本质，其实是把 HEAD 指向指定的 branch，然后签出这个 branch 所对应的 commit 的工作目录。所以同样的，checkout 的目标也可以不是 branch，而直接指定某个 commit：

```
git checkout -b local-branch origin-branch
//分支重命名
git branch –m oldname newname
git branch -av  【包含远端】

git checkout HEAD^^
git checkout master~5
git checkout 78a4bc
git checkout 78a4bc^
```

>checkout 有一个专门用来只让 HEAD 和 branch 脱离而不移动 HEAD 的用法：
```
git checkout --detach
```


#### 十三、revert
>这次改动只是被「反转」了，并没有在历史中消失掉，你的历史中会存在两条 commit ：一个原始 commit ，一个对它的反转 commit
```
git revert HEAD^
```

#### 创建ssh
- ssh-keygen -t rsa -C '邮箱'
- mac : open ~/.ssh

#### 查看自己的用户名和邮箱地址
- git config user.name
- git config user.email

##### 解除关联
git remote add origin 
git remote rm origin


> [手册-Git 原理详解及实用指南](https://juejin.im/book/5a124b29f265da431d3c472e/section/5a124c1f6fb9a0450b65fd3e)
