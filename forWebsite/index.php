<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="css/index.css" rel="stylesheet" type="text/css">
    <link href="../apps/w3.css" rel="stylesheet" type="text/css">
    <title>Multilingual Stats for Language Studies</title>
</head>
<body>
    <div id="langauge_bar">
        <p id="lang_bun">Select Language:</p>
        <select id="lang_s" onchange="L_Change()">
            <option value="en">English</option>
            <option value="jp">Japanese</option>
        </select>
    </div>
    <div id="title_stuff">
    <h1 id="main_title">Multilingual Statistics for Linguistics and Language Teaching Studies</h1>
    <h3 id="instructions">Choose the type of calculation and data set that you have from the options below.</h3>
    <h3 id="instructions">Click the question marks for help and details.</h3>
    <p><span style="color:red">New!</span> Explanations and Sample Data <a href="en/examples.html">Click here!</a></p>
    <br>
    </div>
    <div id="helpModal" class="w3-modal" onclick="this.style.display='none'">
        <div id="helpModalContent" class="w3-modal-content w3-animate-zoom" style="background-color: white; width: 80vw">
            <span class="w3-button w3-hover-red w3-xlarge w3-display-topright" onclick="closeModal()">&times;</span>
            <br><br>
            <div class="w3-cell-row">
                <div class="w3-container w3-cell">
                    <iframe id="theHelpVideo" width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                </div>
                <div class="w3-container w3-cell" style="background-color: aliceblue;">
                    <p id="theHelpText"></p>
                </div>
            </div>
            <br><br>
        </div>
    </div>
    <div id="tests">
        <br>
        <div id="border_help">
            <h2 style="font:bold; font-size: 24px; color: white">Get Help Choosing A Test:</h3>
            <button class="w3-button w3-large w3-circle w3-black" style="display: inline" onclick="getHelp('testHelp')">?</button><p style="font:bold; font-size: 20px; text-shadow: 2px 2px 6px rgb(255, 255, 255); display: inline">  What do you want to check?</p>
            <div id="t_container">
                <div id="differences" class="subcontainer">
                    <p id="diff_text" class="subheading">Is there a difference between groups?</p>
                    <div id="chisq_cont" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('countsHelp')">?</button>
                        <a href="en/chisquare.php" class="linky" id="cmi">Counts or Percentages</a>
                    </div>
                    <div id="twocomps" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('2dataCompHelp')">?</button>
                        <a href="en/2_data_sets.php" class="linky" id="tc1">2 Numerical Data Sets</a>
                    </div>
                    <div id="multi_comps" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('3dataCompHelp')">?</button>
                        <a href="en/3_data_sets.php" class="linky" id="mc1">3+ Numerical Data Sets</a>
                    </div>
                    <div id="pre_post" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('PrePostHelp')">?</button>
                        <a href="en/pp_testing.php" class="linky"  id="pp2">Pre/Post Tests of Experimental and Control Groups</a>
                    </div>
                    <div id="ancova" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('ancovaHelp')">?</button>
                        <a href="en/ancova.php" class="linky"  id="pp2">Experimental vs Control with covariates or 2+ post-tests</a>
                    </div>
                </div>
                <div id="correls" class="subcontainer">
                    <p id="correl_text" class="subheading">Is there a correlation between data sets?</p>
                    <div class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('corrHelp')">?</button>
                        <a href="en/correlation.php" class="linky" id="tc2">For 2 Data Sets</a>
                    </div>
                    <div id="cor_matrix" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('corrMatrixHelp')">?</button>
                        <a href="en/correlation_matrix.php" class="linky" id="corrM">Correlation Matrix</a>
                    </div>
                    <div id="multi_corrs" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('multiRegHelp')">?</button>
                        <a href="en/multi_correlation.php" class="linky" id="mc2">For 3+ Data Sets</a>
                    </div>
                </div>
            </div>
        </div>
    
        <div id="advanced">
            <h3 style="font:bold; font-size: 20px; text-shadow: 2px 2px 6px grey">Other Calculators:</h3>
            <div id="t_container">
                <div id="advLeft" class="subcontainer">
                    <button class="w3-button w3-medium w3-circle w3-black" style="display:inline" onclick="getHelp('reliabilityHelp')">?</button><p id="diff_text" class="subheading" style="display:inline">  Inter-rater Reliabiliity</p>
                    <br>
                    <div id="chronbach" class="testContainer">
                        <a href="en/chronbach.php" class="linky" id="chbch">Chronbach's Alpha</a>
                    </div>
                    <div id="krippy" class="testContainer">
                        <a href="en/krippendorf.html" class="linky" id="krp">Krippendorf's Alpha</a>
                    </div>
                </div>
                <div id="others" class="subcontainer">
                    <button class="w3-button w3-medium w3-circle w3-black" style="display:inline" onclick="getHelp('otherTestsHelp')">?</button><p class="subheading" style="display:inline">  Individual P or Effect Sizes</p>
                    <div class="testContainer">
                        <a href="en/descriptive_vizualization.php" class="linky">Descriptive Data and Visualization</a>
                    </div>
                    <div class="testContainer">
                        <a href="en/effect_calc.php" class="linky">Effect Size Calculator (<i>r</i> from <i>Z</i> and <i>N</i>)</a>
                    </div>
                    <div id="cohens" class="testContainer">
                        <a href="en/cohens_d.php" class="linky" id="cohbase">Calculate Cohen's D</a>
                    </div>
                    <div class="testContainer">
                        <a href="en/p_finder.php" class="linky">Calculate <i>p</i> from <i>Z</i>, <i>t</i>, <i>Χ<sup>2</sup></i>, or <i>q</i> values</a>
                    </div>
                </div>
            </div>           
        </div>
    </div>
    <div id="citation">
        <br>
        <h3 style="margin-top: 10px; width: 90%; margin: auto; text-align: center">For details on the calculations provided by this website, please see the paper below. Please cite the paper if used for research purposes.</h3>
        <br>
        <p id="paper">Spring, R. (2022) Free, Online, Multilingual Statistics for Linguistics and Language Education Researchers. <i>Center for Culture and Language Education, Tohoku University 2021 Nenpo, 8</i>, 32-38. https://doi.org/10.13140/RG.2.2.12037.63202</p>
        <br>
        <a id="paper_link" href="https://doi.org/10.13140/RG.2.2.12037.63202" class="linky">Click here to read the paper.</a>
        <br>
        <div id="personal_hp"><p >Visit the <a style="color: rgb(183, 255, 239); text-decoration: underline;" href="https://sites.google.com/view/ryanspring/home">research page</a> of the creator, Ryan Spring, for examples of these tests used in practical research.</p>
    </div>
</body>
<script>
function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language == "jp") {
        location.href = "index_jp.php"
    }
}
//Global variables holding the text for each explanation.
const messages = ['First, consider what you want to do with your data. <br><br>If you want to know if there are differnces in groups, choose from the options there and click to get more help. For example, if you are comparing a control and experimental group, comparing one class to another, the frequency of one expression to another, etc. <br><br>If you want to know about any associations or potential cause and effect relationships, consider looking at correlation between data sets. Click on the help buttons there for more details. <br><br>If you want to check how reliable your raters are or how closely students answered particular quetsions, check inter-rater reliability. <br><br>For other tests, check the individual <i>p</i> or effect size calculators. Remember that more information and explanations are always available in the videos and in the paper, linked at the bottom of each screen.', 
'If you have data that is based on frequencies or counting non-numerical answers or observations, click here to run a Chi-Square Test. This test provides <i>p</i> value and effect size to check if there is a statistically significant difference and how strong any measurable effect is. <br><br><span style="color:red"><b>Examples</b></span><br><ul><li>Comparing the number of males and females that answered either "yes" or "no" to a survey question</li><li>comparing whether or not speakers of one langauge used / didn\'t use a specific linguistic feature more than speakers of another langauge</li></ul><br><h5 style="color:red">Warning!</h5>If you are comparing the pre/post tests of a control and experimental group, do <span style="color:red"><b>NOT</b></span> choose this option. Instead, use the specialized page for that specific test.',
'If you have two sets of numbers and you want to know if one is surley larger than the other, click here to run either a t-test, Wilcoxon Signed-rank Test, or Mann-Whitney U Test. These tests provide <i>p</i> values and effect sizes to check if there is a statistically significant difference and how strong any measurable effect is. This page helps you to choose the proper test and report it correctly in an academic paper. <br><br><span style="color:red"><b>Examples</b></span><br><ul><li>Pre/post test comparison for ONE group</li><li>Comparing two different groups\' average scores</li><li>Comparing differences in two Likert-scale style survey questions</li></ul>',
'If you have three or more sets of numbers and you want to know if any of them are surley larger than any others, click here to run either an ANOVA, Kruskall-Wallis, or Friedman\'s Test. These tests provide <i>p</i> values and effect sizes to check if there is a statistically significant difference and how strong any measurable effect is. This page helps you to choose the proper test and report it correctly in an academic paper. <br><br><span style="color:red"><b>Examples</b></span><br><ul><li>Comparing scores or responses for three or more different groups</li><li>Comparing the scores or progress of one group of students at multiple points in time</li><li>Comparing the differences in multiple Likert-scale style survey questions</li></ul>',
'If you have pre- and posttest data from both a control and an experimental gorup, use this page. This page will check the normality of the data to ensure you are using the proper test and then provides <i>p</i> values and effect sizes to check if there is a statistically significant relationship between changes in pre- and posttests and the differences in an experiment and control group.<br><br>You should choose this if you have two different groups who received different treatment, but both took the same pre- and posttest. However, you <span style="color:red"><b>CANNOT</b></span> use this test if the groups were measured on different scales.',
'Use one of these tests if you need to check how reliable individual raters are or how reliable questions on a test or in a survey are. <br><br>The <i>Chronbach\'s Alpha</i> test provides a measure of internal consistency (i.e., how similar scores for each dataset are). The ratings should all be on the same scale. This is often used with continuous or ordinal data that should be normalized. This is good, for example, to check how close the scores of three human raters are who are checking the same essay.<br><br>Krippendorf\'s Alpha provides a measure of inter-rater agreement (i.e., how often scores are the same). This test is similar to Chronbach\'s alpha but has the added advantage that it can be used with categorical, ordinal, or continuous data. It is good, for example, to check how often four raters agree on the categorization of a linguistic element or how often they rate essays with the same score.<br><h5 style="color:red">Warning!</h5>These tests check for how often scores are similar and thus is a <span style="color:red"><b>STATISTICAL</b></span> test of reliability. It does <span style="color:red"><b>NOT</b></span> test if the questions are theoretically appropriate to the material or if the raters were trained correctly.',
'These tests will calculate <i>p</i> values of effect sizes from other statistical values. <br><h5 style="color:red">Warning!</h5>The Cohen\'s D calculator is for <i>different</i> groups. However, the calculation for Cohen\'s D is different for two data sets taken from the same group. For this calculation, please just use the "2 Numerical Data Sets" page.',
'If you have two sets of numbers and you want to know if there is a correlation (or association) between them, use this page. It will use either a Pearson\'s or Spearman\'s Rank correlation test based on the normality of your data. This page will check the normality of the data to ensure you are using the proper test and then provides a correlation value to check the magnitude of correlation and a <i>p</i> value to check if the correlation is statistically significant. This test requires two measurements from the same population sample (i.e. from the same participants), but does <span style="color:red"><b>NOT</b></span> require them to be measured in the same way. <br><br><span style="color:red"><b>Examples</b></span><br><ul><li>Checking for a relationship between survey question and learning outcome</li><li>Checking for a relationship between two learning outcomes</li><li>Checking for a relationship between two features of the participants</li></ul>',
'If you have several sets of numbers and want to check corrleation (or association) amongst many of them at once, start by using this page. It checks data normality and uses the proper test as per the "For 2 Data Sets" correlation page, but puts the correlation values into an easy to look at, downloadable chart that compares the amount of corrleation amongst variables. <br><br>For example, it can help you know where there is more or less association between several Likert-scale questions.',
'If you have several sets of numbers and want to check how much corrleation (or association) there is amongst the many variables to a single, key variable, use this page. This page predicts the key variable using multiple regression. It provides an <i>R<sup>2</sup></i> value to check how well the variables predicted the key variable, and a <i>p</i> value to check if there is a statistically significant correlation between the key variable and the multiple other variables or not. It also shows how strongly each of the additional variables predicts the key variable considering the others, using <i>p</i> values and <a href="https://doi.org/10.1111/lang.12518" target="_blank">Mizumoto\'s (2023)</a> method of showing relative weight via dominance analysis. This test requires several measurements from the same population sample (i.e. from the same participants), but does <span style="color:red"><b>NOT</b></span> require them to be measured in the same way. <br><br><span style="color:red"><b>Examples</b></span><br><ul><li>Checking for relationship between multiple survey questions and a single learning outcome</li><li>Checking the relationship between several measurements on a single learning outcomes</li><li>Checking for the impact of several methods or activities on a single learning outcome</li></ul>',
'If you have an experimental and control (or comparison) group, with more than 1 post test and/or covariates, select this option to run an ANCOVA (analysis of covariance). This test will determine if there are overall differences between groups, times, and the combinations of the two. <br><br>You should choose this if you have two different groups who received different treatment, but both took the same pretests and posttests. You should select this as opposed to the simple pre/post experiment/control test above if you have:<br><ul><li>More than one posttest (e.g., posttest and delayed posttest)</li><li><u>Covariates</u>: measures of mitigating factors, such as participation scores, time spent on task, etc.</li></ul><br><br>Measures of covariates do <span style="color:red"><b>NOT</b></span> need to be made on the same scale as the pre- and posttests, but the pre- and posttests <span style="color:red"><b>MUST</b></span> be measured on the same scale.'
];

const videos = ['mWYdiWBOLFs','yAEODGZthvA','IZQZRKaLurY','8LNnZOrEJRI','3Zy5We2ZNwk','qNp6tEc3kAs','oe1VJlN7jxQ','BnDWXxXni0w','YRauq4m569U','ciCupoz5NcM', 'xcV_AnfWYzs'];
const indexes = ['testHelp','countsHelp','2dataCompHelp','3dataCompHelp','PrePostHelp','reliabilityHelp','otherTestsHelp', 'corrHelp', 'corrMatrixHelp', 'multiRegHelp', 'ancovaHelp'];

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
</script>
</html>
