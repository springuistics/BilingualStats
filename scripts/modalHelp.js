const messages = ['<i>Paired data</i> means data that is taken from the same group(s) or participant(s). You should select "yes" if <span style="color:red"><b>BOTH</b></span> or <span style="color:red"><b>ALL</b></span> of your data sets consist of the same participants. <br><br>For example, select "yes" if you are using a pre-/post- design, or if you are comparing two different survey questions answered by the same group of participants. <h5 style="color:red">Warning!</h5>If your data is paired data, it is <span style="color:red"><b>EXTREMELY</b></span> important that the participants\' data is in the same order for <span style="color:red"><b>ALL</b></span> data sets.', 
    'Selecting continuous data implies that you have numbers that can come in a variety of ranges and that are normally distributed. <br><br>You should select "yes" if <span style="color:red"><b>BOTH</b></span> or <span style="color:red"><b>ALL</b></span> of your data sets are measured on scales in which: a) many different numerical answers are possible, and b) a score higher by "1" is equally opposite to a score lower by "1". For example, data measured in time, percentages, number of times, and number of correct answers are often considered to be continuous scales. <br><br>Individual Likert-scale survey questions are generally NOT considered to be continuous (although combining them into a sum or average score MAY be continuous). If any of your data sets are individual Likert-Scale questions, you should probably select "no." <br><br>If you are unsure, you can select "yes," and the program will automatically check the data for normalcy via a Shapiro-Wilks Test. If either sets of your data fail this test, it will automatically be considered ordinal and not continuous.',
    'You can upload your data via a CSV file for your convenience. A CSV file can be created from Excel or many other spreadsheet applications. For more information, <a href="https://techcommunity.microsoft.com/t5/microsoft-365-insider-blog/export-to-csv-in-excel-for-the-web/ba-p/4224007#:~:text=Create%20or%20open%20an%20existing,csv)." target="_blank">click here</a>. <br><br>When creating your CSV file, please label the groups or variables in the <span style="color:red"><b>FIRST</b></span> row. If you <span style="color:red"><b>DO NOT</b></span>, the first row of data will be lost.<br><br> For the Pre/Post of Experimental/Control Groups special tool, please put the pre-test experimental data in column one, the post-test experimental data in column two, the pre-test control data in column three, and the post-test control data in column four.',
    'This table shows descriptive data. The basic stats include the range (minimum to maximum values), mean (average), and standard deviation (how far the values tend to be from the average). <br><br>By clicking "show more stats" you can expand the descriptive data to include 95% confidence intervals (where most of the data tends to fall 95% of the time), the skewness (how far the data tends to lean towards either the minimum or maximum value), and the kurtosis (how high the peak of the bell curve of your data is). <br><br> This data can also be downloaded as a Table in a CSV file for your convenience.',
    'This asks how many sets of data you have. This generally refers to the number of groups you have (if you are comparing different participants) or the number of times data was taken (if you are comparing data taken at several different times). However, it is also representative of how many different measurements (if looking at correlation). <br><h5 style="color:red">Warning!</h5>If you are using the "3+ data" correlation tool for multiple regression, you should insert the number of <span style="color:red"><b>EXPLANATORY</b></span> variables (i.e., those used to predict the key variable). For this tool ONLY, do not count the key variable.',
    'The number of post-tests in this tool refers to the number of tests <b>in addition</b> to the original pre-test. For example, if you have a pre-test, post-test, and delayed post-test, please select <span style="color:red"><b>2</b></span> (because there are two post-tests). <br><br>The number of covariates refers to the number of additional measures that you have which you suspect might influence the change in scores across post-tests other than the group. For example, you might include classroom participation scores, number of attempts at homework problems, etc.'
    ];
    
const videos = ['pjrY66lSm4k','AYJ11OcDqQM','MfjY0lnDk78','yIuWcxilSZs','Y7OP-SmVrK0', 'RZhvJtY_E6s'];
const indexes = ['paired','continuous','csv','descriptives','howmany', 'covariate'];
    
function getHelp(section){
        document.getElementById('helpModal').style.display="block";
        //constant function that grabs index of the section passed into the getHelp function
        const istheSection = (element) => element == section;
        let index = indexes.findIndex(istheSection);
        //sets Youtube Link as embedded video
        let link = "https://www.youtube.com/embed/"+videos[index];
        document.getElementById('theHelpVideo').src = link;
        //sets the Help Text
        document.getElementById('theHelpText').innerHTML = messages[index];
}
    
function closeModal(){
    let containerElement = document.getElementById('helpModalContent');
    let iframe_tag = containerElement.querySelector( 'iframe');
    let video_tag = containerElement.querySelector( 'video' );
    if ( iframe_tag) {
        let iframeSrc = iframe_tag.src;
        iframe_tag.src = iframeSrc; 
    }
    if ( video_tag) {
        video_tag.pause();
    }
    document.getElementById('helpModal').style.display="none";
}