---
title: SpringBoot学习之easyExcel
date: 2021-10-15
tags:
  - Java
  - Spring Boot
categories:
  - Java
---

### 1.导入pom 依赖
```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>2.2.6</version>
</dependency>

<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```
### 2.编写工具库 解析文件
```java
/**
 * 读取文件
 * @param <T>
 */
public class ExcelListener<T extends Object> extends AnalysisEventListener<T> {

    /**
     * 存放数据list
     */
    private List<T> rows = new ArrayList<>();

    /**s
     * object是每一行数据映射的对象
     * @param object
     * @param context
     */
    @Override
    public void invoke(T object, AnalysisContext context) {
        rows.add(object);
        doSomething(object);
    }


    /**
     * 结束后调用
     * @param context
     */
    @Override
    public void doAfterAllAnalysed(AnalysisContext context) {
        System.out.println("读取的行数为=======>" + rows.size());
    }

    /**
     * 开始调用
     * @param object
     */
    public void doSomething(T object) {
        System.out.println(object.toString());
    }

    /**
     * 返回结果
     * @return
     */
    public List<T> getRows() {
        return rows;
    }

    /**
     * 设置数据
     * @param rows
     */
    public void setRows(List<T> rows) {
        this.rows = rows;
    }
```
### 3. 工具库
```java
public class ExcelUtils {

    /**
     * 读取excel
     *
     * @param is
     * @param clazz
     * @param <T>
     * @return
     */
    public static <T extends Object> List<T> readExcel(InputStream is, final Class<T> clazz) {

        List<T> rowsList = null;
        BufferedInputStream bis = null;

        try {

            bis = new BufferedInputStream(is);
            ExcelListener listener = new ExcelListener<T>();
            EasyExcel.read(bis, Student.class, listener).sheet().doRead();
            rowsList = listener.getRows();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (bis != null) {
                try {
                    bis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return rowsList;
    }

    /**
     * 返回流下载
     * @param response
     * @param fileName
     * @param sheetName
     * @param clazz
     * @param data
     * @param <T>
     */
    public static <T extends Object> void downloadExcel(HttpServletResponse response, String fileName,String sheetName, final Class<T> clazz, List<T> data) throws IOException {
        // 设置响应类型
        response.setContentType("application/vnd.ms-excel");
        // 设置字符编码
        response.setCharacterEncoding("utf-8");
        // 设置响应头信息
        response.setHeader("Content-disposition", "attachment;filename*=" + URLEncoder.encode(fileName, "UTF-8") + ".xlsx");
        // 下载文件
        EasyExcel.write(response.getOutputStream(), clazz).sheet(sheetName).doWrite(data);
    }
```
### 4. 测试实体类
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@HeadRowHeight(20)
@ColumnWidth(20)
@ContentRowHeight(15)
public class Student{

    @ExcelProperty(value = "学号")
    private String sno;

    @ExcelProperty(index = 1, value = "姓名")
    private String name;

    @ExcelProperty(index = 2, value = "年龄")
    private Integer age;

    @ExcelProperty(index = 3, value = "性别")
    private String gender;

    @ExcelProperty(index = 4, value = "籍贯")
    private String nativePlace;

    @ExcelProperty(index = 5, value = "入学时间")
    private Date enrollmentTime;

}
```
### 5.控制器
```java
@RestController
@RequestMapping("excelActionController")
public class ExcelActionController {

    /**
     * 读文件
     * @param file
     * @return
     * @throws IOException
     */
    @PostMapping("readExcel")
    public List<Student> readExcelFile(MultipartFile file) throws IOException {
        List<Student> students = ExcelUtils.readExcel(file.getInputStream(), Student.class);
        return students;

    }

    /**
     * 导出文件
     * @param response
     * @param request
     * @throws IOException
     * @throws ParseException
     */
    @GetMapping("exportExcel")
    public void exportStudentInfos(HttpServletResponse response, HttpServletRequest request) throws ParseException, IOException {
        List<Student> studentList = new ArrayList<Student>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 0; i < 50; i++) {
            studentList.add(new Student("1001" + i, "张三" + i, 23 + i, "男", "陕西西安", dateFormat.parse("2020-09-01")));
        }
        ExcelUtils.downloadExcel(response,"测试","测试",Student.class,studentList);
    }
}
```