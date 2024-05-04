function L_Change() {
    language = document.getElementById('lang_s').value;
    if (language == "jp") {
        location.href = "../jp/pp_testing.html";
    } else if (language == "en"){
        location.href = "../en/pp_testing.html";
    }
}

var results_of_test = "";
var details_of_test = "";


function Calculate() {
    language = document.getElementById('lang_s').value;
    document.getElementById('error_text').style.display = "none";
    document.getElementById('descriptives').innerHTML = "";
    var g1pre = []; var g1post = []; var g2pre = []; var g2post = []; 
    var allpre = []; var allpost = []; var allg1 = []; var allg2 = []; var all = [];
    var theBigData = gatherDatafromForm(4);
    specialDescriptivesForPP(theBigData);
    function SetDataSet(n) {
        let name = "data_set_"+n;
        let foruser = ""
        if (n==0) {foruser = "group 1 'pre' data set"}
        else if (n==1) {foruser = "group 1 'post' data set"}
        else if (n==2) {foruser = "group 2 'pre' data set"}
        else if (n==3) {foruser = "group 2 'post' data set"}
        let temp = document.getElementById(name).value;
        let prerealdata = temp.split("\n");
        let d1checker = prerealdata.slice(-1);
        if (d1checker == "") {
        prerealdata.pop();
        }
        if (prerealdata.includes("") || prerealdata.includes("NaN")) {
            if (language == "en"){
                document.getElementById("error_text").innerHTML = "You have null values (lines with no values) or non-numbers in the " + foruser + ". Please delete all null values, check to make sure there are no non-numbers in your data set, and then try again.";
                document.getElementById('explain_bun').innerHTML = "An error has occurred. Please see the error message above.";
            } else if (langauge == "jp"){
                document.getElementById("error_text").innerHTML = foruser + "には数字ではない行、あるいはデータのない行があります。データのない行は全て削除し、全てのデータが半角数字になっていることを確認してください。";
                document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
            }
            document.getElementById('error_text').style.display = "inline";
        } else {
            function numberify(set_o_data) {
                temp_arry = [];
                for (let i=0; i<set_o_data.length; i++){
                    var holder = Number(set_o_data[i]);
                    temp_arry.push(holder);
                }
                return temp_arry;
            }
            let realdata = numberify(prerealdata);
            if (realdata.length < 6) {
                if (language == "en"){
                    document.getElementById("error_text").innerHTML = "You need at least 6 data points in each data set in order for any proper conclusion to be drawn about your data. The " + foruser + " does not have enough data points. Please check your data sets or collect more data if necessary.";
                    document.getElementById('explain_bun').innerHTML = "An error has occurred. Please see the error message above.";
                } else if (language == "jp"){
                    document.getElementById("error_text").innerHTML = "適切な結果を得るには、それぞれの組に少なくとも6つのデータが必要です。" + foruser + "のデータ量が足りません。データを確認し、必要に応じてより多くのデータを集めてください。";
                    document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
                }
                document.getElementById('error_text').style.display = "inline";
            } else {return realdata;}}
    }
    g1pre = SetDataSet(0); g1post = SetDataSet(1); g2pre = SetDataSet(2); g2post = SetDataSet(3); 
    if (g1pre.length != g1post.length) {
        if (language == "en"){
            document.getElementById("error_text").innerHTML = "Groups need to have the same number of data points in the pre- and post-test data sets. Currently, the experimental group has a different number of data points in the pre- and post-test data fields.";
            document.getElementById('explain_bun').innerHTML = "An error has occurred. Please see the error message above.";
        } else if (language == "jp"){
            document.getElementById("error_text").innerHTML = "実験群の事前・事後データに異なる数のデータ（行）が入力されています。事前・事後データに同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        }
         document.getElementById('error_text').style.display = "inline";
    } else if (g2pre.length != g2post.length) {
        if (langauge == "en"){
            document.getElementById("error_text").innerHTML = "Groups need to have the same number of data points in the pre- and post-test data sets. Currently, the control/comparison group has a different number of data points in the pre- and post-test data fields.";
            document.getElementById('explain_bun').innerHTML = "An error has occurred. Please see the error message above.";
        } else if (langauge == "jp"){
            document.getElementById("error_text").innerHTML = "対象群（コントロール・グループ）の事前・事後データに異なる数のデータ（行）が入力されています。事前・事後データに同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        }
        document.getElementById('error_text').style.display = "inline";

    } else {
        function CopyArray (array) {
            return array.slice(0);
        }
        var dummyPre1 = CopyArray(g1pre);
        var dummyPost1 = CopyArray(g1post);
        var dummyPre2 = CopyArray(g2pre);
        var dummyPost2 = CopyArray(g2post);
        var checkPre1 = shapiroWilk(dummyPre1);
        var checkPost1 = shapiroWilk(dummyPost1);
        var checkPre2 = shapiroWilk(dummyPre2);
        var checkPost2 = shapiroWilk(dummyPost2);
        var isNormal;
        if (checkPre1 == false || checkPost1 == false || checkPre2 == false || checkPost2 == false){
            isNormal = false;
            language = document.getElementById('lang_s').value;
            if (language == "en") {
                details_of_test = "Despite the continuous nature of the data, at least one of the data sets failed the Shapiro-Wilk Test of normalcy, and therefore the data was treated as ordinal. Since the data was paired, a Scheirer-Ray-Hare Test was used was used to check for a significant interaction between treatment type (i.e., the difference between the experiment and control/comparison group) and treatment (i.e., the difference before and after the treatment).";
            } else if (language == "jp"){
                details_of_test = "本データは連続データですが、シャピロ－ウィルク検定の結果によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされました。従って、SRHテスト（Scheirer-Ray=hare検定）を利用して、グループ（i.e., 実験群と対照群の区別）とトリートメント（実験前と実験後）の間に交互作用があるかどうかを検証した。";
            }
            var superdata = [];
            g1pre.forEach(function(number){superdata.push({"Group":1, "No": number, "Rank": number});});
            g1post.forEach(function(number){superdata.push({"Group":2, "No": number, "Rank": number});});
            g2pre.forEach(function(number){superdata.push({"Group":3, "No": number, "Rank": number});});
            g2post.forEach(function(number){superdata.push({"Group":4, "No": number, "Rank": number});});
            var se = DunnSE(superdata);
            var superdata2 = createCombinedRanks(superdata);
            var g1pre_ranks = [];
            var g1post_ranks = [];
            var g2pre_ranks = [];
            var g2post_ranks = [];
            superdata2.forEach(function(number, index) {
            if (superdata2[index].Group === 1) {g1pre_ranks.push(superdata2[index].Rank);}
            if (superdata2[index].Group === 2) {g1post_ranks.push(superdata2[index].Rank);}
            if (superdata2[index].Group === 3) {g2pre_ranks.push(superdata2[index].Rank);}
            if (superdata2[index].Group === 4) {g2post_ranks.push(superdata2[index].Rank);}
            });
                g1pre_ranks.forEach(element => {
                    all.push(element);
                    allg1.push(element);
                    allpre.push(element);
                });
                g1post_ranks.forEach(element => {
                    all.push(element);
                    allg1.push(element);
                    allpost.push(element);
                });
                g2pre_ranks.forEach(element => {
                    all.push(element);
                    allpre.push(element);
                    allg2.push(element);
                });
                g2post_ranks.forEach(element => {
                    all.push(element);
                    allg2.push(element);
                    allpost.push(element);
                });
                var dfa = all.length - 1;
                var SST = SumSq(all);
                var MST = SST / dfa;
                var Mg = average(all);

                var Mpr = average(allpre);
                var Mpo = average(allpost);
                var SS_B = (allpre.length * ((Mpr - Mg) **2)) + (allpost.length * ((Mpo - Mg) **2));
                var MSS_B = SS_B
                
                var Mg1 = average(allg1);
                var Mg2 = average(allg2);
                var SS_A = (allg1.length * ((Mg1 - Mg) **2)) + (allg2.length * ((Mg2 - Mg) **2));
                var MSS_A = SS_A;
                
                var submeans = [];
                for (let i=0; i<allpre.length; i++){
                    let temp = (allpre[i] + allpost[i]) / 2;
                    submeans.push(temp);
                }
                var SS_bsub = (SumSq(submeans)) * 2;
                var SS_wsub = SST - SS_bsub;
                var SS_wivarA = SS_bsub - SS_A;
                var SS_betAxB = (g1pre.length * (((average(g1pre_ranks))) - Mg) **2) + (g1post.length * (((average(g1post_ranks))) - Mg) **2) + (g2pre.length * (((average(g2pre_ranks))) - Mg) **2) + (g2post.length * (((average(g2post_ranks))) - Mg) **2) ; 
                var SS_AxB = SS_betAxB - SS_A - SS_B;

                var SSE = SS_wsub - SS_B - SS_AxB;
                var MSE = SSE / (allpre.length - 2);
            
        } else {
            isNormal = true;
            language = document.getElementById('lang_s').value;
            if (language == "en") {
                details_of_test = "A two-way mixed ANOVA test was used to check for a significant interaction between treatment type (i.e., the difference between the experiment and control/comparison group) and treatment (i.e., the difference before and after the treatment).";
            } else if (language == "jp"){
                details_of_test = "二元配置分散分析（対応のある因子と対応のある因子）を利用して、グループ（i.e., 実験群と対照群の区別）とトリートメント（実験前と実験後）の間に交互作用があるかどうかを検証した。";
            }
            
                g1pre.forEach(element => {
                    all.push(element);
                    allg1.push(element);
                    allpre.push(element);
                });
                g1post.forEach(element => {
                    all.push(element);
                    allg1.push(element);
                    allpost.push(element);
                });
                g2pre.forEach(element => {
                    all.push(element);
                    allpre.push(element);
                    allg2.push(element);
                });
                g2post.forEach(element => {
                    all.push(element);
                    allg2.push(element);
                    allpost.push(element);
                });
                var dfa = all.length - 1;
                var SST = SumSq(all);
                var MST = SST / dfa;
                var Mg = average(all);

                var Mpr = average(allpre);
                var Mpo = average(allpost);
                var SS_B = (allpre.length * ((Mpr - Mg) **2)) + (allpost.length * ((Mpo - Mg) **2));
                var MSS_B = SS_B
                
                var Mg1 = average(allg1);
                var Mg2 = average(allg2);
                var SS_A = (allg1.length * ((Mg1 - Mg) **2)) + (allg2.length * ((Mg2 - Mg) **2));
                var MSS_A = SS_A;
                
                var submeans = [];
                for (let i=0; i<allpre.length; i++){
                    let temp = (allpre[i] + allpost[i]) / 2;
                    submeans.push(temp);
                }
                var SS_bsub = (SumSq(submeans)) * 2;
                var SS_wsub = SST - SS_bsub;
                var SS_wivarA = SS_bsub - SS_A;
                var SS_betAxB = (g1pre.length * (((average(g1pre))) - Mg) **2) + (g1post.length * (((average(g1post))) - Mg) **2) + (g2pre.length * (((average(g2pre))) - Mg) **2) + (g2post.length * (((average(g2post))) - Mg) **2) ; 
                var SS_AxB = SS_betAxB - SS_A - SS_B;

                var SSE = SS_wsub - SS_B - SS_AxB;
                var MSE = SSE / (allpre.length - 2);
        }
                

            if (isNormal==true){
                var FofA = MSS_A / (SS_wivarA / (allpre.length - 2));
                var FofB = MSS_B / MSE;
                var FofInt = SS_AxB / MSE;
                var pofA = getPfromF(2, FofA, 1, (allpre.length -2));
                var pofB = getPfromF(2, FofB, 1, (allpre.length -2));
                var pofInt = getPfromF(4, FofInt, 1, (allpre.length -2));
                FofA = FofA.toFixed(2);
                FofB = FofB.toFixed(2);
                FofInt = FofInt.toFixed(2);
                pofA = pofA.toFixed(2);
                pofB = pofB.toFixed(2);
                pofInt = pofInt.toFixed(2);
            } else if (isNormal==false){
                var HofA = (SS_A/MSE)
                var HofB = (SS_B/MSE)
                var HofInter = (SS_AxB / MSE)
                var pofA = getPfromChi(HofA, 1).toFixed(2);
                var pofB = getPfromChi(HofB, 1).toFixed(2);
                var pofInt = getPfromChi(HofInter, 1).toFixed(2);
                HofA = HofA.toFixed(2);
                HofB = HofB.toFixed(2);
                HofInter = HofInter.toFixed(2);
            }

            var eta_A = SS_A / (SST - SS_B - SS_AxB);
            var eta_B = SS_B / (SST - SS_A - SS_AxB);
            var eta_int = SS_AxB / (SST-SS_A-SS_B);
            eta_A = eta_A.toFixed(2);
            eta_B = eta_B.toFixed(2);
            eta_int = eta_int.toFixed(2);

    var result1 = "";
    var result2 = "";
    var result3 = "";
    var results4 = "";
    var result5 = "";
    var result6 = "";
    language = document.getElementById('lang_s').value;
    if (language == "en"){
        if (pofInt < .01) {
            if (isNormal==true){
                result1 = "There was a significant interaction between treatment and group type; <i>F</i> [3, " + (all.length -1) + "] = " + FofInt + ", <i>p</i> < .01";
            } else if (isNormal==false){
                result1 = "There was a significant interaction between treatment and group type; <i>H</i> [3, " + (all.length -1) + "] = " + HofInter + ", <i>p</i> < .01";
            }
        } else if (pofInt < .05) {
            if (isNormal==true){
                result1 = "There was a significant interaction between treatment and group type; <i>F</i> [3, " + (all.length -1) + "] = " + FofInt + ", <i>p</i> = " + pofInt;
            } else if (isNormal==false){
                result1 = "There was a significant interaction between treatment and group type; <i>H</i> [3, " + (all.length -1) + "] = " + HofInter + ", <i>p</i> = " + pofInt;
            }
        } else {
            if (isNormal==true){
                result1 = "There was no significant interaction between treatment and group type; <i>F</i> [3, " + (all.length -1) + "] = " + FofInt + ", <i>p</i> = " + pofInt;
            } else if (isNormal==false){
                result1 = "There was no significant interaction between treatment and group type; <i>H</i> [3, " + (all.length -1) + "] = " + HofInter + ", <i>p</i> = " + pofInt;
            }
        }
    
        if (eta_int<.06) {
            results4 = ", with a small effect size; <i>η<sup>2</i></sup> = " + eta_int;
        } else if (eta_int<0.138) {
            results4 =  ", with a medium effect size; <i>η<sup>2</i></sup> = " + eta_int;
        } else if (eta_int>=0.138) {
            results4 =  ", with a large effect size; <i>η<sup>2</i></sup> = " + eta_int;
        }
    
        if (pofA < .01) {
            if (isNormal==true){
                    result2 = "<br><br>Furthermore, there was a significant difference between pre- and post-test scores overall; <i>F</i> [1, " + (allpre.length -1) + "] = " + FofA + ", <i>p</i> < .01";
            } else if (isNormal==false){
                result2 = "<br><br>Furthermore, there was a significant difference between pre- and post-test scores overall; <i>H</i> [1, " + (allpre.length -1) + "] = " + HofA + ", <i>p</i> < .01";
            }
        } else if (pofA < .05) {
            if (isNormal==true){
                result2 = "<br><br>Furthermore, there was a significant difference between pre- and post-test scores overall; <i>F</i> [1, " + (allpre.length -1) + "] = " + FofA + ", <i>p</i> = " + pofA;
            } else if (isNormal==false){
                result2 = "<br><br>Furthermore, there was a significant difference between pre- and post-test scores overall; <i>H</i> [1, " + (allpre.length -1) + "] = " + HofA + ", <i>p</i> = " + pofA;
            }
        } else {
            if (isNormal==true){
                result2 = "<br><br>Furthermore was no significant difference between pre- and post-test scores overall; <i>F</i> [1, " + (allpre.length -1) + "] = " + FofA + ", <i>p</i> = " + pofA;
            } else if (isNormal==false){
                result2 = "<br><br>Furthermore was no significant difference between pre- and post-test scores overall; <i>H</i> [1, " + (allpre.length -1) + "] = " + HofA + ", <i>p</i> = " + pofA;
            }
        }
    
        if (eta_A<.06) {
            result3 = ", with a small effect size; <i>η<sup>2</i></sup> = " + eta_A + ", and ";
        } else if (eta_A<0.138) {
            result3 =  ", with a medium effect size; <i>η<sup>2</i></sup> = " + eta_A + ", and ";
        } else if (eta_A>=0.138) {
            result3 =  ", with a large effect size; <i>η<sup>2</i></sup> = " + eta_A + ", and ";
        }
    
        if (pofB < .01) {
            if (isNormal==true){
                result5 = "there was a significant difference between the experimental and control/comparison groups overall; <i>F</i> [1, " + (allpre.length -1) + "] = " + FofB + ", <i>p</i> < .01";
            } else if (isNormal==false){
                result5 = "there was a significant difference between the experimental and control/comparison groups overall; <i>H</i> [1, " + (allpre.length -1) + "] = " + HofB + ", <i>p</i> < .01";
            }
        } else if (pofB < .05) {
            if (isNormal==true){
                result5 = "there was a significant difference between the experimental and control/comparison groups overall; <i>F</i> [1, " + (allpre.length -1) + "] = " + FofB + ", <i>p</i> = " + pofB;
            } else if (isNormal==false){
                result5 = "there was a significant difference between the experimental and control/comparison groups overall; <i>H</i> [1, " + (allpre.length -1) + "] = " + HofB + ", <i>p</i> = " + pofB;
            }
        } else {
            if (isNormal==true){
                result5 = "there was no significant difference between the experimental and control/comparison groups overall; <i>F</i> [1, " + (allpre.length -1) + "] = " + FofB + ", <i>p</i> = " + pofB;
            } else if (isNormal==false){
                result5 = "there was no significant difference between the experimental and control/comparison groups overall; <i>H</i> [1, " + (allpre.length -1) + "] = " + HofB + ", <i>p</i> = " + pofB;
            }
        }
    
        if (eta_B<.06) {
            result6 = ", with a small effect size; <i>η<sup>2</i></sup> = " + eta_B + ".";
        } else if (eta_B<0.138) {
            result6 =  ", with a medium effect size; <i>η<sup>2</i></sup> = " + eta_B + ".";
        } else if (eta_B>=0.138) {
            result6 =  ", with a large effect size; <i>η<sup>2</i></sup> = " + eta_B + ".";
        }
    } else if (language == "jp"){
        if (pofInt < .01) {
            if (isNormal==true){
                result1 = "グループタイプ（実験群・対照群）とトリートメント（事前・事後）の間に有意義な交互作用が確認できた： <i>F</i> [3, " + (all.length -1) + "] = " + FofInt + ", <i>p</i> < .01";
            } else if (isNormal==false){
                result1 = "グループタイプ（実験群・対照群）とトリートメント（事前・事後）の間に有意義な交互作用が確認できた： <i>H</i> [3, " + (all.length -1) + "] = " + HofInter + ", <i>p</i> < .01";
            }
        } else if (pofInt < .05) {
            if (isNormal==true){
                result1 = "グループタイプ（実験群・対照群）とトリートメント（事前・事後）の間に有意義な交互作用が確認できた： <i>F</i> [3, " + (all.length -1) + "] = " + FofInt + ", <i>p</i> = " + pofInt;
            } else if (isNormal==false){
                result1 = "グループタイプ（実験群・対照群）とトリートメント（事前・事後）の間に有意義な交互作用が確認できた： <i>H</i> [3, " + (all.length -1) + "] = " + HofInter + ", <i>p</i> = " + pofInt;
            }
        } else {
            if (isNormal==true){
                result1 = "グループタイプ（実験群・対照群）とトリートメント（事前・事後）の間に有意義な交互作用が確認できなかった： <i>F</i> [3, " + (all.length -1) + "] = " + FofInt + ", <i>p</i> = " + pofInt;
            } else if (isNormal==false){
                result1 = "グループタイプ（実験群・対照群）とトリートメント（事前・事後）の間に有意義な交互作用が確認できなかった： <i>H</i> [3, " + (all.length -1) + "] = " + HofInter + ", <i>p</i> = " + pofInt;
            }
        }
    
        if (eta_int<.06) {
            results4 = "。また、 交互作用の効果は小さかった： <i>η<sup>2</i></sup> = " + eta_int;
        } else if (eta_int<0.138) {
            results4 =  "。また、 交互作用の効果は中ぐらいだった： <i>η<sup>2</i></sup> = " + eta_int;
        } else if (eta_int>=0.138) {
            results4 =  "。また、 交互作用の効果は大きかった： <i>η<sup>2</i></sup> = " + eta_int;
        }
    
        if (pofA < .01) {
            if (isNormal==true){
                    result2 = "<br><br>総合事前・事後のデータの間に有意差はあり（<i>F</i> [1, " + (allpre.length -1) + "] = " + FofA + ", <i>p</i> < .01";
            } else if (isNormal==false){
                result2 = "<br><br>総合事前・事後のデータの間に有意差はあり（ <i>H</i> [1, " + (allpre.length -1) + "] = " + HofA + ", <i>p</i> < .01";
            }
        } else if (pofA < .05) {
            if (isNormal==true){
                result2 = "<br><br>総合事前・事後のデータの間に有意差はあり（ <i>F</i> [1, " + (allpre.length -1) + "] = " + FofA + ", <i>p</i> = " + pofA;
            } else if (isNormal==false){
                result2 = "<br><br>総合事前・事後のデータの間に有意差はあり（ <i>H</i> [1, " + (allpre.length -1) + "] = " + HofA + ", <i>p</i> = " + pofA;
            }
        } else {
            if (isNormal==true){
                result2 = "<br><br>総合事前・事後のデータの間に有意差はなく（ <i>F</i> [1, " + (allpre.length -1) + "] = " + FofA + ", <i>p</i> = " + pofA;
            } else if (isNormal==false){
                result2 = "<br><br>総合事前・事後のデータの間に有意差はなく（　<i>H</i> [1, " + (allpre.length -1) + "] = " + HofA + ", <i>p</i> = " + pofA;
            }
        }
    
        if (eta_A<.06) {
            result3 = "）、効果量は小さい： <i>η<sup>2</i></sup> = " + eta_A;
        } else if (eta_A<0.138) {
            result3 =  "）、効果量は中ぐらい： <i>η<sup>2</i></sup> = " + eta_A;
        } else if (eta_A>=0.138) {
            result3 =  "）、効果量は大きい： <i>η<sup>2</i></sup> = " + eta_A;
        }
    
        if (pofB < .01) {
            if (isNormal==true){
                result5 = "。総合的に、実験群と対照群の間に有意差はあり（ <i>F</i> [1, " + (allpre.length -1) + "] = " + FofB + ", <i>p</i> < .01";
            } else if (isNormal==false){
                result5 = "。総合的に、実験群と対照群の間に有意差はあり（ <i>H</i> [1, " + (allpre.length -1) + "] = " + HofB + ", <i>p</i> < .01";
            }
        } else if (pofB < .05) {
            if (isNormal==true){
                result5 = "。総合的に、実験群と対照群の間に有意差はあり（ <i>F</i> [1, " + (allpre.length -1) + "] = " + FofB + ", <i>p</i> = " + pofB;
            } else if (isNormal==false){
                result5 = "。総合的に、実験群と対照群の間に有意差はあり（ <i>H</i> [1, " + (allpre.length -1) + "] = " + HofB + ", <i>p</i> = " + pofB;
            }
        } else {
            if (isNormal==true){
                result5 = "。総合的に、実験群と対照群の間に有意差はなく（ <i>F</i> [1, " + (allpre.length -1) + "] = " + FofB + ", <i>p</i> = " + pofB;
            } else if (isNormal==false){
                result5 = "。総合的に、実験群と対照群の間に有意差はなく（ <i>H</i> [1, " + (allpre.length -1) + "] = " + HofB + ", <i>p</i> = " + pofB;
            }
        }
    
        if (eta_B<.06) {
            result6 = "）、効果量は小さい：<i>η<sup>2</i></sup> = " + eta_B + "。";
        } else if (eta_B<0.138) {
            result6 =  "）、効果量は中ぐらい：<i>η<sup>2</i></sup> = " + eta_B + "。";
        } else if (eta_B>=0.138) {
            result6 =   "）、効果量は大きい：<i>η<sup>2</i></sup> = " + eta_B + "。";
        }
    }

    results_of_test = result1 + results4 + result2 + result3 + result5 + result6;
    document.getElementById('results_bun').innerHTML = results_of_test;
    document.getElementById('explain_bun').innerHTML = details_of_test;
}
}


function SumSq(data) {
    let M = average(data);
    let temp = [];
    for (let i = 0; i < data.length; i++) {
        let temp1 = (data[i] - M) **2;
        temp.push(temp1);
    }
    return sum(temp);
}

