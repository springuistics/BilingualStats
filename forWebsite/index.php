<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="css/stats.css" rel="stylesheet" type="text/css">
    <link href="../apps/w3.css" rel="stylesheet" type="text/css">
    <title>Multilingual Stats for Language Studies</title>
</head>
<body>
    <div id="langauge_bar" class="w3-row BG1" style="display:flex; justify-content:flex-end; align-items:center; position:relative;">
        <!-- Centered text -->
        <div style="flex:1; text-align:center; min-width:0; overflow:hidden; text-overflow:ellipsis;">
            <h3><b>Multilingual Statistics</b></h3>
        </div>
        <div style="flex:0 1 auto; text-align:right; min-width:0; overflow:hidden; text-overflow:ellipsis; margin-right: 10px;">
            <select id="lang_s" onchange="L_Change()">
                <option value="en">English</option>
                <option value="jp">Japanese</option>
            </select>
        </div>
    </div>
    <div id="title_stuff" class="w3-center w3-container BG3">
        <h2>Statistics for Linguistics and Language Teaching Studies</h2>
        <h3>Companion Site for "From Concept to Calculation"</h3>
        <h4>Choose a langauge above. Select a test from below. Click the question marks for explanations, help and details.</h4>
        <h5>Get the free book here or purchase it here. Get explanations, sample data and explanatory Excel Sheets <a href="en/examples.php">here</a>. </h5>
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
    <div class="w3-container BG2">
        <br>
        <div class="w3-center border_help BG4">
            <h2 style="font:bold">Get Help Choosing A Test:</h3>
            <button class="w3-button w3-large w3-circle w3-black" style="display: inline" onclick="getHelp('testHelp')">?</button><p style="font:bold; font-size: 20px; text-shadow: 2px 2px 6px rgb(255, 255, 255); display: inline">  What do you want to check?</p>
            <br><br>
            <div class="w3-row" style="display:flex; justify-content: center;">
                <div class="w3-half stats-cell">
                    <div id="differences" class="subcontainer">
                        <h3 class="w3-center">Is there a difference between groups?</h3>
                        <div style="display: inline-block; text-align:left; margin: 0 auto"></div>
                        <div id="chisq_cont" class="testContainer">
                            <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('countsHelp')">?</button>
                            <a href="en/chisquare.php" class="linky" id="cmi">Counts or Percentages</a><span> (Chi-Square)</span>
                        </div>
                        <div id="twocomps" class="testContainer">
                            <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('2dataCompHelp')">?</button>
                            <a href="en/2_data_sets.php" class="linky" id="tc1">2 Numerical Data Sets</a><span> (t-test, Mann-Whitney, Wilcoxon)</span>
                        </div>
                        <div id="multi_comps" class="testContainer">
                            <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('3dataCompHelp')">?</button>
                            <a href="en/3_data_sets.php" class="linky" id="mc1">3+ Numerical Data Sets</a><span> (ANOVA, Friedman, Kruskall-Wallis)</span>
                        </div>
                        <div id="multi_comps2" class="testContainer">
                            <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('3measuresHelp')">?</button>
                            <a href="en/hotelling.php" class="linky" id="mc1">3+ different measures of 2 datasets</a><span> (Hotelling's T<sup>2</sup>)</span>
                        </div>
                        <div id="pre_post" class="testContainer">
                            <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('PrePostHelp')">?</button>
                            <a href="en/pp_testing.php" class="linky"  id="pp2">Pre/Post Tests of Experimental and Control Groups</a><span> (Mixed ANOVA)</span>
                        </div>
                        <div id="ancova" class="testContainer">
                            <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('ancovaHelp')">?</button>
                            <a href="en/ancova.php" class="linky"  id="pp2">Experimental vs control with covariates or 2+ post-tests</a><span> (ANCOVA)</span>
                        </div>
                    </div>
                </div>
                <div class="w3-half stats-cell">
                    <div id="correls" class="subcontainer">
                        <h3 class="w3-center">Is there a correlation between data sets?</h3>
                        <div class="testContainer">
                            <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('corrHelp')">?</button>
                            <a href="en/correlation.php" class="linky" id="tc2">For 2 Data Sets</a><span> (Pearson, Spearman)</span>
                        </div>
                        <div id="cor_matrix" class="testContainer">
                            <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('corrMatrixHelp')">?</button>
                            <a href="en/correlation_matrix.php" class="linky" id="corrM">Correlation Matrix</a><span> (Pearson, Spearman)</span>
                        </div>
                        <div id="multi_corrs" class="testContainer">
                            <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('multiRegHelp')">?</button>
                            <a href="en/multi_correlation.php" class="linky" id="mc2">For 3+ Data Sets</a><span> (Multiple regression)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div id="advanced" class="w3-center border_help BG4" style="margin-bottom: 30px">
            <h2 style="font:bold">Other Calculators:</h3>
            <br>
            <div class="w3-row">
                <div class="w3-half stats-cell">
                    <div class="subcontainer">
                        <div id="advLeft" class="w3-center">
                            <button class="w3-button w3-medium w3-circle w3-black" style="display:inline" onclick="getHelp('reliabilityHelp')">?</button><h3 style="display:inline-block; margin-left: 15px">Inter-rater Reliabiliity</h3>
                            <br>
                        </div>
                        <div id="chronbach" class="testContainer">
                            <a href="en/chronbach.php" class="linky" id="chbch">Chronbach's Alpha</a>
                        </div>
                        <div id="krippy" class="testContainer">
                            <a href="en/krippendorf.php" class="linky" id="krp">Krippendorf's Alpha</a>
                        </div>
                    </div>
                </div>
                <div class="w3-half stats-cell">
                    <div class="subcontainer">
                        <div class="w3-center">
                            <button class="w3-button w3-medium w3-circle w3-black" style="display:inline" onclick="getHelp('otherTestsHelp')">?</button><h3 style="display:inline-block; margin-left: 15px">Individual P or Effect Sizes</h3>
                        </div>
                        <div class="testContainer">
                            <a href="en/descriptive_vizualization.php" class="linky">Descriptive data and visualization</a><span> (table, box and whiskers)</span>
                        </div>
                        <div class="testContainer">
                            <a href="en/effect_calc.php" class="linky">Effect size calculator (<i>r</i> from <i>Z</i> and <i>N</i>)</a>
                        </div>
                        <div id="cohens" class="testContainer">
                            <a href="en/cohens_d.php" class="linky" id="cohbase">Cohen's <i>d</i> for independent t-test</a>
                        </div>
                        <div class="testContainer">
                            <a href="en/p_finder.php" class="linky">Calculate <i>p</i> from <i>Z</i>, <i>t</i>, <i>Χ<sup>2</sup></i>, or <i>q</i> values</a>
                        </div>
                    </div>
                </div>
            </div>           
        </div>
    </div>
    <div id="citation" class="BG1">
        <h3 style="margin-top: 10px; width: 90%; margin: auto; text-align: center">Please cite the book below if used for research purposes.</h3>
        <div style="margin-left: 10%">
            <p class="paper">Spring, R. (2026). <i>From concept to calculation: Classical statistics in language education research</i>. TESL-EJ Publications.</p>
            <h5>Get the free book here or purchase it here. Get explanations, sample data and explanatory Excel Sheets <a href="en/examples.php">here</a>.</h5>
            <div id="personal_hp"><p >Visit the <a style="color: rgb(183, 255, 239); text-decoration: underline;" href="https://sites.google.com/view/ryanspring/home">research page</a> of the creator, Ryan Spring, for examples of these tests used in practical research.</p>
            <br>
        </div>
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
'If you have an experimental and control (or comparison) group, with more than 1 post test and/or covariates, select this option to run an ANCOVA (analysis of covariance). This test will determine if there are overall differences between groups, times, and the combinations of the two. <br><br>You should choose this if you have two different groups who received different treatment, but both took the same pretests and posttests. You should select this as opposed to the simple pre/post experiment/control test above if you have:<br><ul><li>More than one posttest (e.g., posttest and delayed posttest)</li><li><u>Covariates</u>: measures of mitigating factors, such as participation scores, time spent on task, etc.</li></ul><br><br>Measures of covariates do <span style="color:red"><b>NOT</b></span> need to be made on the same scale as the pre- and posttests, but the pre- and posttests <span style="color:red"><b>MUST</b></span> be measured on the same scale.',
'If you have two groups or one group with two conditions (e.g., pretest and posttest) but you have multiple metrics for those two datasets, you can click here to use the Hotelling\'s T-square test. For example, if you have multiple survey questions and you want to check for differences in how males and females answered them, you can use this test rather than doing multiple 2-way tests. This is an example of when to use a <b>non-paired</b> Hotelling\'s test (because the males and females are different respondents). An example of a <b>paired</b> Hotelling\'s T-test would be various objective metrics of pre- and post-treatment writing scores. For example, you could use this test if you want to see if meausures of syntactic complexity, lexical diversity, and lexical sophistication showed improvement after the treatment. The respondents in this case are the same for both groups, but each of the objective metrics are measured on different scales.<br><br><h5 style="color:red">Warning!</h5>This test should <span style="color:red"><b>NOT</b></span> be used for the following: <br><ul><li>Pre/post test scores of a control/experiment group (there is a specific tool for this)</li></li>Comparing four groups\' scores on the same test (use the 3+ Numerical Datasets tool)</li></ul> '
];

const videos = ['mWYdiWBOLFs','yAEODGZthvA','IZQZRKaLurY','8LNnZOrEJRI','3Zy5We2ZNwk','qNp6tEc3kAs','oe1VJlN7jxQ','BnDWXxXni0w','YRauq4m569U','ciCupoz5NcM', 'xcV_AnfWYzs', 'zjHjdzqHWrc'];
const indexes = ['testHelp','countsHelp','2dataCompHelp','3dataCompHelp','PrePostHelp','reliabilityHelp','otherTestsHelp', 'corrHelp', 'corrMatrixHelp', 'multiRegHelp', 'ancovaHelp', '3measuresHelp'];

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
