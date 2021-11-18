/**
 * 发送至远程
 */
 const shell = require('shelljs');
 // 检查控制台是否以运行`git `开头的命令
 if (!shell.which('git')) {
     //在控制台输出内容
     shell.echo('Sorry, this script requires git');
     shell.exit(1);
 }else{
     // 检查控制台是否以运行`npm run build 命令`开头的命令
     if (shell.exec('npm run build').code !== 0) {
         shell.echo('Error: npm run build commit failed');
         shell.exit(1);
     }
     shell.exec('git checkout gh-pages');
     shell.exec('git add deploy/*');
     shell.exec("git commit -m 'deploy'");
     shell.exec('git push -u origin ph-pages:ph-pages');
 }
 
 