title GIT一键提交页面
color 3
echo 当前目录是：%cd%
echo;
 
echo 开始切换分支：git checkout -b ph-pages
git checkout -b ph-pages
echo; 

echo 开始添加变更：git add deploy/*
git add deploy/*
echo;
 
set /p declation=输入提交的commit信息:
git commit -m "%declation%"
echo;
 
echo 指定仓库：git remote add origin https://github.com/mirtok/blogs.git
git remote add origin https://github.com/mirtok/blogs.git
echo;
 
 
echo 将变更情况提交到远程自己分支：git push -u origin ph-pages:ph-pages
git push -u origin ph-pages:ph-pages
echo;
 
echo 切换主分支：git checkout master
git checkout master
echo;
 
echo 执行完毕！
echo;
 
pause
