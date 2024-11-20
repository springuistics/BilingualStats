function L_Change() {
    language = document.getElementById('lang_s').value;
    if (language == "jp") {
        location.href = "../jp/correlation_jp.html";
    } else if (language == "en"){
        location.href = "../en/correlation.html";
    }
}
var details_of_test = "";
var results_of_test = "";
var ord_c1;
var language;
var GroupNames = [];


function Calculate() {
    language = document.getElementById('lang_s').value;
    document.getElementById('error_text').style.display = "none";
    document.getElementById('descriptives').innerHTML = "";
    var ord_c1 = document.querySelector("[name=q1]:checked");
    GroupNames = getGroupNames(2);
    if (!ord_c1) {
        if (language == "en"){
            document.getElementById('error_text').innerHTML = "Please select whether or not the data is continous. For an explanation, mouse over the question.";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else if (language == "jp"){
            document.getElementById('error_text').innerHTML = "データは全て連続データかどうかを選んでください。説明が必要な場合はマウスポインターを質問の上に乗せてください。";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        }
        document.getElementById('error_text').style.display = "inline";
    } else {
        theSetup(2);
    }
}

function theSetup(k){
    language = document.getElementById('lang_s').value;
    document.getElementById('descriptives').innerHTML = "";
    document.getElementById("error_text").innerHTML = "";
    document.getElementById('error_text').style.display = "none";
    if (language == "en"){
        document.getElementById('explain_bun').innerHTML = "The description of your test will be printed here:";
        document.getElementById('results_bun').innerHTML = "Your results will be printed here:";
    } else if (language == "jp"){
        document.getElementById('explain_bun').innerHTML = "利用された検定の詳細はここに書かれます";
        document.getElementById('results_bun').innerHTML = "結果はここに書かれます";
    }
    var ordinal_check = document.querySelector('input[name="q1"]:checked').value;
    var theBigData = gatherDatafromForm(k);
    var allDescriptives = runDescriptives(theBigData);
    var checks = checkData(allDescriptives);
    printDescriptives(allDescriptives);
        if (ordinal_check == "no") {
            if (checks.pairs == false){
                if (language == "en"){
                    document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
                    document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
                } else if (language == "jp"){
                    document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
                    document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
                }
                document.getElementById('error_text').style.display = "inline";
            } else {
                if (language == "en"){
                    details_of_test = "Due to the ordinal nature of the data, a Spearman's Rank Correlation Test was used.";
                } else if (language == "jp"){
                    details_of_test = "本データは順序データであるため、スピアマンの順位相関係数検定で計算しました。";
                }
                two_Corr_Spearman(theBigData);
            }
        } else {
            if (checks.normal == false){
                if (language == "en"){
                    details_of_test = "Despite the continuous nature of the data, at least one of the data sets failed one of the tests of normalcy*. Therefore the data was treated as ordinal and a Spearman's Rank Correlation Test was used.";
                } else if (language == "jp"){
                    details_of_test = "本データは連続データですが、正規性の検定の結果*によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされましたため、スピアマンの順位相関係数検定で計算しました。";
                }
                two_Corr_Spearman(theBigData);
            } else {
                if (language == "en"){
                    details_of_test = "Due to the continuous and normal nature of the data as checked by as checked by an appropriate test of normality*,, a Pearson's Correlation Test was used.";
                } else if (language == "jp"){
                    details_of_test = "本データは連続データで、正規性の検定*で全てのデータはパラメトリックであることが確認できましたため、ピアソンの積率相関係数検定で計算しました。";
                }
                twoCorr_Pearson(theBigData);
            }
        }
}

function twoCorr_Pearson(bigData){
    language = document.getElementById('lang_s').value;
    let thisR = pearson(bigData[0],bigData[1]);
    let thisN = bigData[0].length;
    let thisPearsondf = thisN-2;
    let thishelper = (1 - (Math.pow(thisR, 2))) / thisPearsondf;
    let thisT = thisR / (Math.sqrt(thishelper));
    let thisP = getPfromT(thisT, thisPearsondf);
    thisP = thisP.toFixed(2);
    thisR = thisR.toFixed(2);

    let result1 = "";
    let result2 = "";
    if (thisP <= .05) {
        if(language == "en"){
            result1 = "There is a significant correlation between "+ GroupNames[0]+" and "+GroupNames[1]+": ";
        } else if (language == "jp"){
            result1 = GroupNames[0]+" と "+GroupNames[1]+"の間に有意義な関係が確認できました（";
        }
    } else {
        if(language == "en"){
            result1 = "There is no significant correlation between "+ GroupNames[0]+" and "+GroupNames[1]+": ";
        } else if (language == "jp"){
            result1 = GroupNames[0]+" と "+GroupNames[1]+"の間に有意義な関係が確認できませんでした（";
        }
    }
    let result3 = "";
    let tempr = Math.abs(thisR);
    if (tempr < 0.35) {
        if(language == "en"){
            result3 = "The Pearson's <i>r</i> coefficient suggests a weak correlation."; 
        } else if (language == "jp"){
            result3 = "<i>r</i>値は2つの変数の間に、弱い関連性があることを示します。"; 
        }
    } else if (tempr < 0.55) {
        if(language == "en"){
            result3 = "The Pearson's <i>r</i> coefficient suggests a moderate correlation.";
        } else if (language == "jp"){
            result3 = "<i>r</i>値は2つの変数の間に、中ぐらいの関連性があることを示します。";
        }
    } else {
        if(language == "en"){
            result3 = "The Pearson's <i>r</i> coefficient suggests a strong correlation.";
        } else if (language == "jp"){
            result3 = "<i>r</i>値は2つの変数の間に、強い関連性があることを示します。";
        }
    }

    if (thisP < 0.01) {
        result2 = "<i>r</i> = " + thisR + ", <i>p</i> < 0.01";
    } else {
        result2 = "<i>r</i> = " + thisR + ", <i>p</i> =" + thisP;
    }
    if(language == "en"){
        result2 += ". ";
    } else if (language == "jp"){
        result2 += "）。";
    }

    results_of_test = result1 + result2 + result3;
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

function two_Corr_Spearman(bigData) {
    language = document.getElementById('lang_s').value;
    let thisRs = Spearman(bigData[0],bigData[1]);
    let thisdf = (bigData[0].length)-2;
    let thisHelper = (1 - (Math.pow(thisRs, 2))) / thisdf;
    let thisT = thisRs / (Math.sqrt(thisHelper));
    let thisP = getPfromT(thisT, thisdf);
    thisP = thisP.toFixed(2);
    thisRs = thisRs.toFixed(2);
    let result1 = "";
    let result2 = "";
    let result3 = "";
    if (thisP <= .05) {
        if(language == "en"){
            result1 = "There is a significant correlation between "+ GroupNames[0]+" and "+GroupNames[1]+": ";
        } else if (language == "jp"){
            result1 = GroupNames[0]+" と "+GroupNames[1]+"の間に有意義な関係が確認できました（";
        }
    } else {
        if(language == "en"){
            result1 = "There is no significant correlation between "+ GroupNames[0]+" and "+GroupNames[1]+": ";
        } else if (language == "jp"){
            result1 = GroupNames[0]+" と "+GroupNames[1]+"の間に有意義な関係が確認できませんでした（";
        }
    }

    let tempr = Math.abs(thisRs);
    if (tempr < 0.2) {
        if(language == "en"){
            result3 = "The <i>rs</i> coefficient suggests a very weak correlation.";
        } else if (language == "jp"){
            result3 = "<i>rs</i>値は2つの変数の間に、ほとんど関連性がないことを示します。";
        }
    } else if (tempr < 0.35) {
        if(language == "en"){
            result3 = "The <i>rs</i> coefficient suggests a weak correlation.";
        } else if (language == "jp"){
            result3 = "<i>rs</i>値は2つの変数の間に、弱い関連性があることを示します。";
        }
    } else if (tempr < 0.55) {
        if(language == "en"){
            result3 = "The <i>rs</i> coefficient suggests a moderate correlation.";
        } else if (language == "jp"){
            result3 = "<i>rs</i>値は2つの変数の間に、中ぐらいの関連性があることを示します。";
        }
    } else if (tempr < 0.8) {
        if(language == "en"){
            result3 = "The <i>rs</i> coefficient suggests a strong correlation.";
        } else if (language == "jp"){
            result3 = "<i>rs</i>値は2つの変数の間に、強い関連性があることを示します。";
        }
        
    } else {
        if(language == "en"){
            result3 = "The <i>rs</i> coefficient suggests a very strong correlation.";
        } else if (language == "jp"){
            result3 = "<i>rs</i>値は2つの変数の間に、非常に弱い関連性があることを示します。";
        }
    }

    if (thisP < 0.01) {
        result2 = "<i>rs</i> = " + thisRs + ", <i>p</i> < 0.01";
    } else {
        result2 = "<i>rs</i> = " + thisRs + ", <i>p</i> =" + thisP;
    }
    if(language == "en"){
        result2 += ". ";
    } else if (language == "jp"){
        result2 += "）。";
    }

    results_of_test = result1 + result2 + result3;
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
}