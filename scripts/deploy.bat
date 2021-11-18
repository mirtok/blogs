title GITһ���ύҳ��
color 3
echo ��ǰĿ¼�ǣ�%cd%
echo;
 
echo ��ʼ�л���֧��git branch -u master
git checkout -b master
echo; 

echo ��ʼ���ӱ����git add docs/* packages/*  deploy/* package.json REAMDE.md yarn.lock
git add docs/* packages/*  deploy/* package.json REAMDE.md yarn.lock
echo;
 
set /p declation=�����ύ��commit��Ϣ:
git commit -m "%declation%"
echo;
 
echo ָ���ֿ⣺git remote add origin https://github.com/mirtok/blogs.git
git remote add origin https://github.com/mirtok/blogs.git
echo;
 
 
echo ���������ύ��Զ���Լ���֧��git push -u origin ph-pages:ph-pages
git push -u origin ph-pages:ph-pages
echo;
 
echo �л�����֧��git checkout master
git checkout master
echo;
 
echo ִ����ϣ�
echo;
 
pause
