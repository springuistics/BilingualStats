function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "en") {
        location.href = "../en/pp_testing.html"
    }
}

var results_of_test = "";
var details_of_test = "";

function Calculate() {
    document.getElementById("error_text").innerHTML = "";
    document.getElementById('error_text').style.display = "none";
    var g1pre = []; var g1post = []; var g2pre = []; var g2post = []; 
    var allpre = []; var allpost = []; var allg1 = []; var allg2 = []; var all = [];
    function SetDataSet(n) {
        let name = "data_set_"+n;
        let foruser = ""
        if (n==1) {foruser = "実験群の事前データ"}
        else if (n==2) {foruser = "実験群の事後データ"}
        else if (n==3) {foruser = "対照群の事前データ"}
        else if (n==4) {foruser = "対照群の事後データ"}
        let temp = document.getElementById(name).value;
        let prerealdata = temp.split("\n");
        let d1checker = prerealdata.slice(-1);
        if (d1checker == "") {
        prerealdata.pop();
        }
        if (prerealdata.includes("") || prerealdata.includes("NaN")) {
            document.getElementById("error_text").innerHTML = foruser + "には数字ではない行、あるいはデータのない行があります。データのない行は全て削除し、全てのデータが半角数字になっていることを確認してください。";
            document.getElementById('error_text').style.display = "inline";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
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
            document.getElementById("error_text").innerHTML = "適切な結果を得るには、それぞれの組に少なくとも6つのデータが必要です。" + n + "組のデータ量が足りません。データを確認し、必要に応じてより多くのデータを集めてください。";
            document.getElementById('error_text').style.display = "inline";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
            } else {return realdata;}}
    }
    g1pre = SetDataSet(1); g1post = SetDataSet(2); g2pre = SetDataSet(3); g2post = SetDataSet(4); 
    if (g1pre.length != g1post.length) {
        document.getElementById("error_text").innerHTML = "実験群の事前・事後データに異なる数のデータ（行）が入力されています。事前・事後データに同数のデータが入っているかを確認し、もう一度試してみてください。";
        document.getElementById('error_text').style.display = "inline";
        document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
    } else if (g2pre.length != g2post.length) {
        document.getElementById("error_text").innerHTML = "対象群（コントロール・グループ）の事前・事後データに異なる数のデータ（行）が入力されています。事前・事後データに同数のデータが入っているかを確認し、もう一度試してみてください。";
        document.getElementById('error_text').style.display = "inline";
        document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
    } else {
        function CopyArray (array) {
            return array.slice(0);
        }
        var dummyPre1 = CopyArray(g1pre);
        var dummyPost1 = CopyArray(g1post);
        var dummyPre2 = CopyArray(g2pre);
        var dummyPost2 = CopyArray(g2post);
        var checkPre1 = Shapiro_Wilk(dummyPre1);
        var checkPost1 = Shapiro_Wilk(dummyPost1);
        var checkPre2 = Shapiro_Wilk(dummyPre2);
        var checkPost2 = Shapiro_Wilk(dummyPost2);
        var isNormal;
        if (checkPre1 == false || checkPost1 == false || checkPre2 == false || checkPost2 == false){
            isNormal = false;
            details_of_test = "本データは連続データですが、シャピロ－ウィルク検定の結果によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされました。従って、SRHテスト（Scheirer-Ray=hare検定）を利用して、グループ（i.e., 実験群と対照群の区別）とトリートメント（実験前と実験後）の間に交互作用があるかどうかを検証した。";
            var superdata = [];
            g1pre.forEach(function(number){superdata.push({"Group":1, "No": number, "Rank": number});});
            g1post.forEach(function(number){superdata.push({"Group":2, "No": number, "Rank": number});});
            g2pre.forEach(function(number){superdata.push({"Group":3, "No": number, "Rank": number});});
            g2post.forEach(function(number){superdata.push({"Group":4, "No": number, "Rank": number});});
            var se = Dunn_SE(superdata);
            var superdata2 = SuperDataHandling(superdata);
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
                var Mg = CalcMean(all);

                var Mpr = CalcMean(allpre);
                var Mpo = CalcMean(allpost);
                var SS_B = (allpre.length * ((Mpr - Mg) **2)) + (allpost.length * ((Mpo - Mg) **2));
                var MSS_B = SS_B
                
                var Mg1 = CalcMean(allg1);
                var Mg2 = CalcMean(allg2);
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
                var SS_betAxB = (g1pre.length * (((CalcMean(g1pre_ranks))) - Mg) **2) + (g1post.length * (((CalcMean(g1post_ranks))) - Mg) **2) + (g2pre.length * (((CalcMean(g2pre_ranks))) - Mg) **2) + (g2post.length * (((CalcMean(g2post_ranks))) - Mg) **2) ; 
                var SS_AxB = SS_betAxB - SS_A - SS_B;

                var SSE = SS_wsub - SS_B - SS_AxB;
                var MSE = SSE / (allpre.length - 2);
            
        } else {
            isNormal = true;
            details_of_test = "二元配置分散分析（対応のある因子と対応のある因子）を利用して、グループ（i.e., 実験群と対照群の区別）とトリートメント（実験前と実験後）の間に交互作用があるかどうかを検証した。";
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
                var Mg = CalcMean(all);

                var Mpr = CalcMean(allpre);
                var Mpo = CalcMean(allpost);
                var SS_B = (allpre.length * ((Mpr - Mg) **2)) + (allpost.length * ((Mpo - Mg) **2));
                var MSS_B = SS_B
                
                var Mg1 = CalcMean(allg1);
                var Mg2 = CalcMean(allg2);
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
                var SS_betAxB = (g1pre.length * (((CalcMean(g1pre))) - Mg) **2) + (g1post.length * (((CalcMean(g1post))) - Mg) **2) + (g2pre.length * (((CalcMean(g2pre))) - Mg) **2) + (g2post.length * (((CalcMean(g2post))) - Mg) **2) ; 
                var SS_AxB = SS_betAxB - SS_A - SS_B;

                var SSE = SS_wsub - SS_B - SS_AxB;
                var MSE = SSE / (allpre.length - 2);
        }
                

            if (isNormal==true){
                var FofA = MSS_A / (SS_wivarA / (allpre.length - 2));
                var FofB = MSS_B / MSE;
                var FofInt = SS_AxB / MSE;
                var pofA = FtoP(2, FofA, 1, (allpre.length -2));
                var pofB = FtoP(2, FofB, 1, (allpre.length -2));
                var pofInt = FtoP(4, FofInt, 1, (allpre.length -2));
                FofA = FofA.toFixed(2);
                FofB = FofB.toFixed(2);
                FofInt = FofInt.toFixed(2);
                pofA = pofA.toFixed(2);
                pofB = pofB.toFixed(2);
                pofInt = pofInt.toFixed(2);
            } else if (isNormal==false){
                var HofA = (SS_A/MSE).toFixed(2);
                var HofB = (SS_B/MSE).toFixed(2);
                var HofInter = (SS_AxB / MSE).toFixed(2);
                var pofA = GimmietheP(HofA, 1).toFixed(2);
                var pofB = GimmietheP(HofB, 1).toFixed(2);
                var pofInt = GimmietheP(HofInter, 1).toFixed(2);
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

    results_of_test = result1 + results4 + result2 + result3 + result5 + result6;
    document.getElementById('results_bun').innerHTML = results_of_test;
    document.getElementById('explain_bun').innerHTML = details_of_test;
}
}

function SumSq(data) {
    let M = CalcMean(data)
    let temp = [];
    for (let i = 0; i < data.length; i++) {
        let temp1 = (data[i] - M) **2;
        temp.push(temp1);
    }
    let sum = 0;
    for (var number of temp) {sum += number;}
    return sum;
}

function CalcMean(data) {
    let N = data.length;
    var sum = 0;
    for (var number of data) {
    sum += number;
    }
    let M = sum / N;
    return M;
}

function sterror(d1, d2){
    let temp_d = [];
    for (let i=0; i<d1.length; i++) {
        let temp = d2[i] - d1[i];
        temp_d.push(temp);
    }
    let sum = 0;
    for (var number of temp_d) {sum += number;}
    let avg = sum / temp_d.length;
    let sum2 = 0;
    for (var number of temp_d) {sum2 += ((number - avg)**2)}
    let sd = Math.sqrt((sum2/(temp_d.length-1)));
    let se = sd / (Math.sqrt(temp_d.length));
    return se;
}

function FtoP(k, f, n1, n2) {
    var x=n2/(n1*f+n2);
    var Pi=Math.PI; var PiD2=Pi/2;
    function StatCom(q,i,j,b) {
		var zz=1; var z=zz; var k=i; while(k<=j) { zz=zz*q*k/(k-b); z=z+zz; k=k+2 }
		return z
		}
    if((n1%2)==0) { return StatCom(1-x,n2,n1+n2-4,n2-2)*Math.pow(x,n2/2) }
    if((n2%2)==0){ return 1-StatCom(x,n1,n1+n2-4,n1-2)*Math.pow(1-x,n1/2) }
    var th=Math.atan(Math.sqrt(n1*f/n2)); var a=th/PiD2; var sth=Math.sin(th); var cth=Math.cos(th)
    if(n2>1) { a=a+sth*cth*StatCom(cth*cth,2,n2-3,-1)/PiD2 }
    if(n1==1) { return 1-a }
    var c=4*StatCom(sth*sth,n2+1,n1+n2-4,n2-2)*sth*Math.pow(cth,n2)/Pi
    if(n2==1) { return 1-a+c/2 }
    while(k<=(n2-1)/2) {c=c*k/(k-.5); k=k+1 }
    return 1-a+c
}

function TukeyMe(q, k, df) {
    q = Math.abs(q);
    var vw = new Array(31);
    var qw = new Array(31);
    var pcutj = 0.00003;
    var pcutk = 0.0001;
    var step = 0.45;
    var vmax = 1000.0;
    var cv1 = 0.193064705;
    var cv2 = 0.293525326;
    var cvmax = 0.39894228;
    var cv = new Array(5);
    cv[0] = 0.0;
    cv[1] = 0.318309886;
    cv[2] = -0.00268132716;
    cv[3] = 0.00347222222;
    cv[4] = 0.0833333333;
    var jmin = 3; var jmax = 15; var kmin = 7; var kmax = 15;
    var retval; var g; var gmid; var r1; var c; var h; var hj; var v2;
    var gstep; var pk; var pk1; var pk2; var pj; var j; var jj;
    var kk; var gk; var w0; var pz; var x; var jump; var ehj;
    retval = 0.0;
    
    g = step * Math.pow(k, -0.2);
    gmid = 0.5 * Math.log(k);
    r1 = k - 1.0;
    c = Math.log(k * g * cvmax);
    if (c <= vmax) {
        h = step * Math.pow(df, -0.5);
        v2 = df * 0.5;
        if (df == 1) {c = cv1;}
        if (df == 2) {c = cv2;    }
        if (!((df == 1) || (df == 2))) {
            c = Math.sqrt(v2) * cv[1] / (1.0 + ((cv[2] / v2 + cv[3]) / v2 + cv[4]) / v2);
        }
        c = Math.log(c * k * g * h);
    }
    
    gstep = g;
    qw[1] = -1.0;
    qw[jmax + 1] = -1.0;
    pk1 = 1.0;
    pk2 = 1.0;
    for (kk = 1; kk <= kmax; kk++) {
        gstep -= g;
        do {
            gstep = -gstep;
            gk = gmid + gstep;
            pk = 0.0;
            if ((pk2 > pcutk) || (kk <= kmin)) {
                w0 = c - gk * gk * 0.5;
                pz = alnorm(gk, true);
                x = alnorm(gk - q, true) - pz;
                if (x > 0.0)
                    pk = Math.exp(w0 + r1 * Math.log(x));
                if (df <= vmax) {
                    jump = -jmax;
                    do {
                        jump += jmax;
                        for (j = 1; j <= jmax; j++) {
                            jj = j + jump;
                            if (qw[jj] <= 0.0) {
                                hj = h * j;
                                if (j < jmax) {
                                    qw[jj + 1] = -1.0;
                                }
                                ehj = Math.exp(hj);
                                qw[jj] = q * ehj;
                                vw[jj] = df * (hj + 0.5 - ehj * ehj * 0.5);
                            }
                            pj = 0.0;
                            x = alnorm(gk - qw[jj], true) - pz;
                            if (x > 0.0) {
                                pj = Math.exp(w0 + vw[jj] + r1 * Math.log(x));
                            }
                            pk += pj;
                            if (pj <= pcutj) {
                                if ((jj > jmin) || (kk > kmin)) {
                                    break;
                                }
                            }
                            pj = pj;
                        }
                        h = -h;
                    } while (h < 0);
                }
            }
            retval += pk;
            if ((kk > kmin) && (pk <= pcutk) && (pk1 <= pcutk)) {
                return 1 - retval;
            }
            pk2 = pk1;
            pk1 = pk;
        } while (gstep > 0.0);
    }
    
    return 1 - retval;
}

function PtoT(t,n) {
    var Pi=Math.PI; var PiD2=Pi/2;
    function StatCom(q,i,j,b) {
        var zz=1; var z=zz; var k=i; while(k<=j) { zz=zz*q*k/(k-b); z=z+zz; k=k+2 }
        return z
        }
    t=Math.abs(t); var w=t/Math.sqrt(n); var th=Math.atan(w)
    if(n==1) { return 1-th/PiD2 }
    var sth=Math.sin(th); var cth=Math.cos(th)
    if((n%2)==1) { 
        return 1-(th+sth*cth*StatCom(cth*cth,2,n-3,-1))/PiD2 
    } else
        { return 1-sth*StatCom(cth*cth,1,n-3,-1) }
}

function Shapiro_Wilk (data) {
    function poly(cc, nord, x){
        var p;
        var ret_val;
        ret_val = cc[0];
        if (nord > 1) {
    	    p = x * cc[nord-1];
    	    for (j = nord - 2; j > 0; j--)
    	        p = (p + cc[j]) * x;
    	    ret_val += p;
        }
        return ret_val;
    }
    
    var x = data.sort(function (a, b) {return a - b});
    var N = data.length;
    var Nn2 = Math.floor(N/2);
    var a = new Array(Math.floor(Nn2) + 1);
    var c1 = [ 0, 0.221157, -0.147981, -2.07119, 4.434685, -2.706056 ];
    var c2 = [ 0, 0.042981, -0.293762, -1.752461, 5.682633, -3.582633 ];
    var i, j, i1;
    var ssassx, summ2, ssumm2, range;
    var a1, a2, an, sa, xi, sx, xx, w1;
    var fac, asa, an25, ssa, sax, rsn, ssx, xsx;
    an = N;
    an25 = an + 0.25;
    summ2 = 0.0;
    for (i=1; i <= Nn2; i++) {
        a[i] = normalQuantile((i - 0.375) / an25, 0, 1);
        var r__1 = a[i];
        summ2 += r__1 * r__1;
    }
    summ2 *= 2;
    ssumm2 = Math.sqrt(an);
    rsn = 1 / Math.sqrt(an);
    a1 = poly(c1, 6, rsn) - a[1] / ssumm2;
    i1 = 3;
    a2 = -a[2] / ssumm2 + poly(c2, 6, rsn);
    fac = Math.sqrt((summ2 - 2 * (a[1]*a[1]) - 2 * (a[2] * a[2])) / (1 - 2 * (a1 * a1) - 2 * (a2 * a2)));
    a[2] = a2;
    a[1] = a1;
    for (i = i1; i <= Nn2; i++) {
        a[i] /= - fac;
    }
    range = x[N - 1] - x[0];
    if (range < 0.0000000000001) {
        return false;
    }
    xx = x[0] / range;
    sx = xx;
    sa = -a[1];
    for (i = 1, j = (N-1); i < N; j--) {
        xi = x[i] / range;
            if ((xx - xi) > 0.000000000000001) {
                return false;
            }
        sx += xi;
        i++;
        if (i != j) {
            sa += sign(i - j) * a[Math.min(i, j)];
        }
        xx = xi;
    }
    sa /= N;
    sx /= N;
    ssa = ssx = sax = 0.;
    for (i = 0, j = (N-1); i < N; i++, j--) {
        if (i != j)
            asa = sign(i - j) * a[1 + Math.min(i, j)] - sa;
        else
            asa = -sa;
        xsx = x[i] / range - sx;
        ssa += asa * asa;
        ssx += xsx * xsx;
        sax += asa * xsx;
    }
    ssassx = Math.sqrt(ssa * ssx);
    w1 = (ssassx - sax) * (ssassx + sax) / (ssa * ssx);
    var w = 1 - w1;
    var winterpret = [.788, .803, .818, .829, .842, .850, .859, .866, .874, .881, .887, .892, .897, .892, .897, .901, .905, .908, 911, .914, .916, .918, .920, .923, .924, .926, .927, .929, .930, .933, .934];
    if (N < 36) {
        var lookup = N - 6;
        if (w > winterpret[lookup]) {
            return true;
        } else {return false;}
    } else {
        if (w > .80) {
            return true;
        } else {return false;}
    }
}

function SuperDataHandling(superdata) {
    var sorted = superdata.slice().sort((a, b) => a.No - b.No);
        for (let i = 0; i < sorted.length; i++) {sorted[i].Rank = i + 1;}
        var just_numbers = [];
        for (let i = 0; i < superdata.length; i++) {just_numbers.push(superdata[i].No);}
        Array.prototype.contains = function(v) {
        for (var i = 0; i < this.length; i++) {if (this[i] === v) return true;}
        return false;};
        Array.prototype.unique = function() {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
          if (!arr.contains(this[i])) {
            arr.push(this[i]);}}
        return arr;}
        var uniques = just_numbers.unique();
        var ties = [];
        for (let i = 0; i < uniques.length; i++) {
            var temp_a = 0;
            for (let j = 0; j < just_numbers.length; j++){
                if (uniques[i] == just_numbers[j]){
                temp_a += 1;}
            }
            if (temp_a > 1) {ties.push(uniques[i]);}
        }
        var ties2 = [];
        for (let i = 0; i < ties.length; i++) {
            for (let j = 0; j < just_numbers.length; j++){    
                if (ties[i] == just_numbers[j]) {
                ties2.push(just_numbers[j]);}
            }
        }
        var counter = ties.length;
        var ha = [];
        if (counter > 0) {
            for (let i = 0; i < ties.length; i++){
                var temp_d = 0;
                for (let j = 0; j < ties2.length; j++){
                    if (ties[i] == ties2[j]){
                        temp_d += 1;}
                }
                ha.push({"ties": ties[i], "no": temp_d})
            };
            var newnum = [];
            for (let i = 0; i < ha.length; i ++) {
                let temp_val = 0;
                for (j = 0; j < superdata.length; j++) {
                    if (superdata[j].No === ha[i].ties){
                    temp_val += superdata[j].Rank;}
                }
                if (temp_val > 1) {
                    let me = temp_val / ha[i].no;
                    let you = ha[i].ties;
                    newnum.push({"tie":you, "val":me});
                }
            };
            for (let i = 0; i < superdata.length; i ++) {
                for (let j = 0; j < newnum.length; j++) {
                if (superdata[i].No == newnum[j].tie) {
                    superdata[i].Rank = newnum[j].val;} 
            };
            }
        }
    return superdata;
}


function Dunn_SE(superdata) {
    var N = superdata.length;
    var just_numbers = [];
        for (let i = 0; i < superdata.length; i++) {just_numbers.push(superdata[i].No);}
        Array.prototype.contains = function(v) {
        for (var i = 0; i < this.length; i++) {if (this[i] === v) return true;}
        return false;};
        Array.prototype.unique = function() {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
          if (!arr.contains(this[i])) {
            arr.push(this[i]);}}
        return arr;}
        var uniques = just_numbers.unique();
        var ties = [];
        for (let i = 0; i < uniques.length; i++) {
            var temp_a = 0;
            for (let j = 0; j < just_numbers.length; j++){
                if (uniques[i] == just_numbers[j]){
                temp_a += 1;}
            }
            if (temp_a > 1) {ties.push(uniques[i]);}
        }
        var ties2 = [];
        for (let i = 0; i < ties.length; i++) {
            for (let j = 0; j < just_numbers.length; j++){    
                if (ties[i] == just_numbers[j]) {
                ties2.push(just_numbers[j]);}
            }
        }
        var ha = [];
            for (let i = 0; i < ties.length; i++){
                var temp_d = 0;
                for (let j = 0; j < ties2.length; j++){
                    if (ties[i] == ties2[j]){
                        temp_d += 1;}
                }
                ha.push({"ties": ties[i], "no": temp_d})
            };
        var Ahelper = 0;
        for (let i =0; i < ha.length; i++) {
            temp = ha[i].no;
            temp2 = (temp **3) - temp;
            Ahelper += temp2;
        }
    var final = (N * (N+1) / 12) - (Ahelper / (12 * (N-1)))
    return final    
}

function normalQuantile(p, mu, sigma){
    var p, q, r, val;
    if (sigma < 0)
        return -1;
    if (sigma == 0)
        return mu;
    q = p - 0.5;
    if (0.075 <= p && p <= 0.925) {
        r = 0.180625 - q * q;
        val = q * (((((((r * 2509.0809287301226727 + 33430.575583588128105) * r + 67265.770927008700853) * r
            + 45921.953931549871457) * r + 13731.693765509461125) * r + 1971.5909503065514427) * r + 133.14166789178437745) * r
            + 3.387132872796366608) / (((((((r * 5226.495278852854561 + 28729.085735721942674) * r + 39307.89580009271061) * r
            + 21213.794301586595867) * r + 5394.1960214247511077) * r + 687.1870074920579083) * r + 42.313330701600911252) * r + 1);
    } else { 
	    if (q > 0)
            r = 1 - p;
	    else
            r = p;
        r = Math.sqrt(-Math.log(r)); 
        if (r <= 5.) { 
            r += -1.6;
            val = (((((((r * 7.7454501427834140764e-4 + 0.0227238449892691845833) * r + .24178072517745061177) * r
                + 1.27045825245236838258) * r + 3.64784832476320460504) * r + 5.7694972214606914055) * r
                + 4.6303378461565452959) * r + 1.42343711074968357734) / (((((((r * 1.05075007164441684324e-9 + 5.475938084995344946e-4) * r
                + .0151986665636164571966) * r + 0.14810397642748007459) * r + 0.68976733498510000455) * r + 1.6763848301838038494) * r
                + 2.05319162663775882187) * r + 1);
        } else { 
            r += -5.;
            val = (((((((r * 2.01033439929228813265e-7 + 2.71155556874348757815e-5) * r + 0.0012426609473880784386) * r
                + 0.026532189526576123093) * r + .29656057182850489123) * r + 1.7848265399172913358) * r + 5.4637849111641143699) * r
                + 6.6579046435011037772) / (((((((r * 2.04426310338993978564e-15 + 1.4215117583164458887e-7)* r
                + 1.8463183175100546818e-5) * r + 7.868691311456132591e-4) * r + .0148753612908506148525) * r
                + .13692988092273580531) * r + .59983220655588793769) * r + 1.);
        }
        if (q < 0.0)
            val = -val;
    }
    return mu + sigma * val;
}

function sign (x) {
    if (x == 0) 
        return 0;
    return x > 0 ? 1: -1;
}



function GimmietheP(x,n) { 
    var Pi=Math.PI;
    if(n==1 & x>1000) {return 0} 
    if(x>1000 | n>1000) { 
        var q=GimmietheP((x-n)*(x-n)/(2*n),1)/2 
        if(x>n) {return q} {return 1-q} 
        } 
    var p=Math.exp(-0.5*x); if((n%2)==1) { p=p*Math.sqrt(2*x/Pi) } 
    var k=n; while(k>=2) { p=p*x/k; k=k-2 } 
    var t=p; var a=n; while(t>0.0000000001*p) { a=a+2; t=t*x/a; p=p+t } 
    return 1-p 
} 