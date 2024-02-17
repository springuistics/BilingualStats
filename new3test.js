function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "jp") {
        location.href = "../jp/3_data_sets_jp.html"
    }
}
var details_of_test = "";
var results_of_test = "";
var pair_c1; var ord_c1;

function SetUp() {
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_value').value;
    pair_c1 = document.querySelector("[name=q1]:checked");
    ord_c1 = document.querySelector("[name=q2]:checked");
    if (!pair_c1) {
        document.getElementById('error_text').innerHTML = "Please select whether or not the data is paired. For an explanation, mouse over the question."
        document.getElementById('error_text').style.display = "inline";
        document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
    } else if (!ord_c1) {
        document.getElementById("error_text").innerHTML = "Please select whether or not the data is continuous. For an explanation, mouse over the question."
        document.getElementById('error_text').style.display = "inline";
        document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
    } else if (k < 3) {
        document.getElementById("error_text").innerHTML = "You must select a number between 3 and 6."
        document.getElementById('error_text').style.display = "inline";
        document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
    } else {
        document.getElementById('button').style.display = "inline";
        document.getElementById('datasets').style.display = "inline";
        document.getElementById('reset').style.display = "inline";
        SetUpP2(k);
    }
}

function SetUpP2(k) {
    if (!document.getElementById('data_set_0')){
    for (let i=0; i < k; i++ ) {
        let dumb_div = document.createElement("div");
        dumb_div.id = "dumb_div_" + i;
        dumb_div.className = "dumb_div"
        let helper = dumb_div.id;
        let data = document.createElement("textarea");
        data.id = "data_set_" + i;
        data.className = "dataset";
        let label = document.createElement("h3");
        let n = i+1;
        let text = "Copy and paste data set " + n + " below:";
        label.innerHTML = text;
        label.className = "data_label";
        label.id = "label_" + i;
        document.getElementById('d_container').appendChild(dumb_div);
        document.getElementById(helper).appendChild(label);
        document.getElementById(helper).appendChild(data);
        document.getElementById(data.id).rows = "30";
        document.getElementById(data.id).columns = "40";
        document.getElementById(data.id).placeholder="1\n 2\n 3\n 4\n etc.";
    }
    }
}

function Reset() {
    var k = document.getElementById('k_value').value;
    for (let i=0; i < k; i++ ) {
        var get_area = "data_set_"+i;
        var get_label = "label_"+i;
        var act_area = document.getElementById(get_area);
        var act_label = document.getElementById(get_label);
        act_area.parentNode.removeChild(act_area);
        act_label.parentNode.removeChild(act_label);
    }
    document.getElementById('button').style.display = "none";
    document.getElementById('datasets').style.display = "none";
    document.getElementById('reset').style.display = "none";
    document.getElementById('explain_bun').innerHTML = "The description of your test will be printed here:";
    document.getElementById('results_bun').innerHTML = "Your results will be printed here:";
}

function Calculate() {
    document.getElementById("error_text").innerHTML = "";
    document.getElementById('error_text').style.display = "none";
    document.getElementById('explain_bun').innerHTML = "The description of your test will be printed here:";
    document.getElementById('results_bun').innerHTML = "Your results will be printed here:";
    var k = document.getElementById('k_value').value;
    var pair_check = document.querySelector('input[name="q1"]:checked').value;
    var ordinal_check = document.querySelector('input[name="q2"]:checked').value;
    let helperK = 'data_set_'+(k-1);
    if (document.getElementById(helperK)){
        var theBigData = gatherDatafromForm(k);
        function checkPairs(losData){
            let lengthChecker = [];
            for (let i=0; i<losData.length; i++){
                lengthChecker.push(losData[i].length);
            }
            var allEqual = lengthChecker => lengthChecker.every( v => v === lengthChecker[0] );
            return allEqual;
        }
        if (ordinal_check == "no") {
            if (pair_check == "yes") {
                if (checkPairs(theBigData) == false){
                    document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
                    document.getElementById('error_text').style.display = "inline";
                    document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
                } else {
                    details_of_test = "Due to the ordinal nature of the data and the fact that the data was paired, a Friedman's Test was used.";
                    Friedman(k, theBigData);
                }
            } else if (pair_check == "no") {
                details_of_test = "Due to the ordinal nature of the data and the fact that the data was not paired, a Kruskal-Wallis Test was used.";
                KW(k, theBigData);
            }
        } else {
            var wecool = [];
            for (let i=0; i<k; i++){
                let tempArray = [];
                for (let j=0; j<theBigData[i].length; j++){
                    tempArray.push(theBigData[i][j]);
                }
                let check = shapiroWilk(tempArray);
                wecool.push(check);
            }
            if (wecool.includes(false)){
                if (pair_check == "yes") {
                    if (checkPairs(theBigData) == false){
                        document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
                        document.getElementById('error_text').style.display = "inline";
                        document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
                    } else {
                        details_of_test = "Due to the ordinal nature of the data and the fact that the data was paired, a Friedman's Test was used.";
                        Friedman(k, theBigData);
                    }
                } else if (pair_check == "no") {
                    details_of_test = "Despite the continuous nature of the data, at least one of the data sets failed the Shapiro-Wilk Test of normalcy, and therefore the data was treated as ordinal. Since the data was not paired, a a Kruskal-Wallis Test was used.";
                    KW(k, theBigData);
                }
            } else {
                if (pair_check == "yes") {
                    if (checkPairs(theBigData) == false){
                        document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
                        document.getElementById('error_text').style.display = "inline";
                        document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
                    } else {
                        details_of_test = "Due to the continuous and normal nature of the data as checked by a Shapiro-Wilk Test, and the fact that the data was paired, a one-way repeated measures ANOVA was used.";
                        RepANOVA(k, theBigData);
                    }
                } else if (pair_check == "no") {
                    details_of_test = "Due to the continuous and normal nature of the data as checked by a Shapiro-Wilk Test, and the fact that the data was not paired, an ANOVA (non-repeated measures) was used.";
                    StANOVA(k, theBigData);
                }
            }
        }
    } else {
        document.getElementById("error_text").innerHTML = "The number of groups you indicated in the box does not match the number of data sets. Please reset the data and try again or change the group number to match the number of data boxes present on the screen.";
        document.getElementById('error_text').style.display = "inline";
        document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
    }
}

function StANOVA(k, theData) {
    let means = [];
    let ns = [];
    let SBsumsqMeans = [];
    let Mg = average(theData);
    for (let i=0; i<k; i++){
        means.push(average(theData[i]));
        ns.push(theData[i].length);
        SBsumsqMeans.push(sumSquareOuterMean(Mg, theData[i]));
    }
    let GN = sum(ns);
    let SMsumqMeans = [];
    let MBs = [];
    for (let i=0; i<k; i++){
        SMsumqMeans.push(sumSquareOuterMean(means[i], theData[i]));
        MBs.push(ns[i] * ((means[i] - Mg) **2));
    }
    let dfs = k-1;
    let SSW = sum(SMsumqMeans);
    let MSSW = SSW / (GN - k);
    let SSB = sum(SBsumsqMeans);
    let MSB = sum(MBs);
    let MSSB = MSB / (dfs);
    let F = MSSB / MSSW;
    let dfw = GN - k;
    let p = getPfromF(k, F, dfs, dfw);
    F = F.toFixed(2);
    let W2 = (MSB) / (MSB + SSW)
    W2 =W2.toFixed(2);
    let combos = 1;
    let HSDs = [];
    let Groups = [];
    for (let i=(k-1); i>0; i--){
        combos *= i;
    }
    for (let i=0; i<combos; i++){
        for (let j=(i+1); j<combos; j++){
            let tempComp = (Math.abs(means[i] - means[j])) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/ns[i])+(1/ns[j]))));
            let tempP = tukeyMe(tempComp, k, dfw); tempP = tempP.toFixed(2);
            HSDs.push(tempP);
            Groups.push({"group1":i, "group2":j});
        }
    }
    var result1 = "";
    var result2 = "";
    var result3 = "";
    var results4 = "";
    if (W2<.15) {
        results4 = "Furthermore, there was a small effect size;  <i>η<sup>2</i></sup> = " + W2;
    } else if (W2<0.35) {
        results4 =  "Furthermore, there was a medium effect size;  <i>η<sup>2</i></sup> = " + W2;
    } else {
        results4 =  "Furthermore, there was a large effect size;  <i>η<sup>2</i></sup> = " + W2;
    }
    if (p > 0.05) {
        result1 = "There was no significant difference amongst any of the groups; "
        p = p.toFixed(2);
        result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p ;
        result3 = ". Therefore, no pair-wise analysis will be conducted. "
    } else {
        var result1 = "There was a significant difference between at least two of the groups; "
        if (p < 0.01) {
            result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> < 0.01. ";
        } else {
            p = p.toFixed(2);
            result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p + ". ";
        }
        result3 += "The significant differences between specific groups, as tested by a Tukey's HSD post-hoc analysis, is shown below: <br>";
        for (let i=0; i<k; i++){
            result3 += "Group "+(Groups[i].group1+1)+" x Group "+(Groups[i].group2+1)+": <i>p</i> = " + HSDs[i] + "<br>";
        }

    }
    results_of_test = result1 + result2 + result3 + results4;
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
}
