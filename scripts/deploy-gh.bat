title GITһ���ύҳ��
color 3
echo ��ǰĿ¼�ǣ�%cd%
echo;
 
echo ��ʼ�л���֧��git checkout -b ph-pages
git checkout -b ph-pages
echo; 

echo ��ʼ��ӱ����git add deploy/*
git add deploy/*
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
