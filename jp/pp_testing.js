function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "en") {
        location.href = "../en/pp_testing.html"
    }
}

var results_of_test = "";

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
        if (prerealdata.includes("") || prerealdata.includes("NaN")) {
            document.getElementById("error_text").innerHTML = foruser + "には数字ではない行、あるいはデータのない行があります。データのない行は全て削除し、全てのデータが半角数字になっていることを確認してください。";
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
            document.getElementById("error_text").innerHTML = "適切な結果を得るには、それぞれの組に少なくとも6つのデータが必要です。" + n + "組のデータ量が足りません。データを確認し、必要に応じてより多くのデータを集めてください。";
            document.getElementById('error_text').style.display = "inline";
        } else {return realdata;}
    }}
    g1pre = SetDataSet(1); g1post = SetDataSet(2); g2pre = SetDataSet(3); g2post = SetDataSet(4); 
    if (g1pre.length != g1post.length) {
        document.getElementById("error_text").innerHTML = "実験群の事前・事後データに異なる数のデータ（行）が入力されています。事前・事後データに同数のデータが入っているかを確認し、もう一度試してみてください。";
        document.getElementById('error_text').style.display = "inline";
    } else if (g2pre.length != g2post.length) {
        document.getElementById("error_text").innerHTML = "対象群（コントロール・グループ）の事前・事後データに異なる数のデータ（行）が入力されています。事前・事後データに同数のデータが入っているかを確認し、もう一度試してみてください。";
        document.getElementById('error_text').style.display = "inline";
    } else {
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
        result1 = "グループタイプ（実験群・対照群）とトリートメント（事前・事後）の間に有意義な交互作用が確認できた：<i>F</i> [3, " + (all.length -1) + "] = " + FofInt + ", <i>p</i> < .01";
    } else if (pofInt < .05) {
        result1 = "グループタイプ（実験群・対照群）とトリートメント（事前・事後）の間に有意義な交互作用が確認できた：<i>F</i> [3, " + (all.length -1) + "] = " + FofInt + ", <i>p</i> = " + pofInt;
    } else {
        result1 = "グループタイプ（実験群・対照群）とトリートメント（事前・事後）の間に有意義な交互作用が確認できなかった：<i>F</i> [3, " + (all.length -1) + "] = " + FofInt + ", <i>p</i> = " + pofInt;
    }

    if (eta_int<.06) {
        results4 = "。また、 交互作用の効果は小さかった：<i>η<sup>2</i></sup> = " + eta_int;
    } else if (eta_int<0.138) {
        results4 =  "。また、 交互作用の効果は中ぐらいだった： <i>η<sup>2</i></sup> = " + eta_int;
    } else if (eta_int>=0.138) {
        results4 =  "。また、 交互作用の効果は大きかった： <i>η<sup>2</i></sup> = " + eta_int;
    }

    if (pofA < .01) {
        result2 = "<br><br>総合事前・事後のデータの間に有意差はあり（<i>F</i> [1, " + (allpre.length -1) + "] = " + FofA + ", <i>p</i> < .01";
    } else if (pofA < .05) {
        result2 = "<br><br>総合事前・事後のデータの間に有意差はあり（<i>F</i> [1, " + (allpre.length -1) + "] = " + FofA + ", <i>p</i> = " + pofA;
    } else {
        result2 = "<br><br>総合事前・事後のデータの間に有意差はなく（<i>F</i> [1, " + (allpre.length -1) + "] = " + FofA + ", <i>p</i> = " + pofA;
    }

    if (eta_A<.06) {
        result3 = "）、効果量は小さい：<i>η<sup>2</i></sup> = " + eta_A;
    } else if (eta_A<0.138) {
        result3 =  "）、効果量は中ぐらい：<i>η<sup>2</i></sup> = " + eta_A;
    } else if (eta_A>=0.138) {
        result3 =  "）、効果量は大きい：<i>η<sup>2</i></sup> = " + eta_A;
    }

    if (pofB < .01) {
        result5 = "。総合的に、実験群と対照群の間に有意差はあり（<i>F</i> [1, " + (allpre.length -1) + "] = " + FofB + ", <i>p</i> < .01";
    } else if (pofB < .05) {
        result5 = "。総合的に、実験群と対照群の間に有意差はあり（<i>F</i> [1, " + (allpre.length -1) + "] = " + FofB + ", <i>p</i> = " + pofB;
    } else {
        result5 = "。総合的に、実験群と対照群の間に有意差はなく（<i>F</i> [1, " + (allpre.length -1) + "] = " + FofB + ", <i>p</i> = " + pofB;
    }

    if (eta_B<.06) {
        result6 = "）、効果量は小さい：<i>η<sup>2</i></sup> = " + eta_B + "。";
    } else if (eta_B<0.138) {
        result6 =  "）、効果量は中ぐらい：<i>η<sup>2</i></sup> = " + eta_B + "。";
    } else if (eta_B>=0.138) {
        result6 =  "）、効果量は大きい：<i>η<sup>2</i></sup> = " + eta_B + "。";
    }

    results_of_test = result1 + results4 + result2 + result3 + result5 + result6;
    document.getElementById('results_bun').innerHTML = results_of_test;
    document.getElementById('explain_bun').innerHTML = "二元配置分散分析（対応のある因子と対応のある因子）を利用して、グループ（i.e., 実験群と対照群の区別）とトリートメント（実験前と実験後）の間に交互作用があるかどうかを検証した。";
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

function TukeyMe(q, k, v) {
    q = Math.abs(q);
    let text = "";
    function getit(hs5, hs1) {
        if (q<hs5) {return "<i>n.s.</i>"} else if (q>hs1) {return "p < .01"} else {
        let s=(hs1-hs5)/4; 
        let p1=hs5+s; let p2=p1+s; let p3=p2+s; let p2d=p1+(s/2); let p3d=p2+(s/2);
        if (q<p1) {return "p = .05"} else if (q>p1 && q<p2d) {return "p = .04"} else if (q>p2d && q<p2) {return "p = .03"} else if (q>p2 && q<p3d) {return "p = .02"} else if (q>p3d && q<p3) {text = "p = .01"} else {return "p < .01"}
    }}
    if (k==3) {
        if (v==5) {let hs5=4.60; let hs1=6.98; text=getit(hs5, hs1);}
        else if (v==6) {let hs5=4.34; let hs1=6.33; text=getit(hs5, hs1);}
        else if (v==7) {let hs5=4.16; let hs1=5.92; text=getit(hs5, hs1);}
        else if (v==8) {let hs5=4.04; let hs1=5.64; text=getit(hs5, hs1);}
        else if (v==9) {let hs5=3.95; let hs1=5.43; text=getit(hs5, hs1);}
        else if (v==10) {let hs5=3.88; let hs1=5.27; text=getit(hs5, hs1);}
        else if (v==11) {let hs5=3.82; let hs1=5.15; text=getit(hs5, hs1);}
        else if (v==12) {let hs5=3.77; let hs1=5.05; text=getit(hs5, hs1);}
        else if (v==13) {let hs5=3.73; let hs1=4.96; text=getit(hs5, hs1);}
        else if (v==14) {let hs5=3.70; let hs1=4.89; text=getit(hs5, hs1);}
        else if (v==15) {let hs5=3.67; let hs1=4.84; text=getit(hs5, hs1);}
        else if (v==16) {let hs5=3.65; let hs1=4.79; text=getit(hs5, hs1);}
        else if (v==17) {let hs5=3.63; let hs1=4.74; text=getit(hs5, hs1);}
        else if (v==18) {let hs5=3.61; let hs1=4.70; text=getit(hs5, hs1);}
        else if (v==19) {let hs5=3.59; let hs1=4.67; text=getit(hs5, hs1);}
        else if (v==20) {let hs5=3.58; let hs1=4.64; text=getit(hs5, hs1);}
        else if (v>20&&v<30) {let hs5=3.53; let hs1=4.55; text=getit(hs5, hs1);}
        else if (v>=30&&v<40) {let hs5=3.45; let hs1=4.41; text=getit(hs5, hs1);}
        else if (v>=40&&v<60) {let hs5=3.42; let hs1=4.32; text=getit(hs5, hs1);}
        else if (v>=60&&v<120) {let hs5=3.38; let hs1=4.24; text=getit(hs5, hs1);}
        else if (v>=120) {let hs5=3.34; let hs1=4.16; text=getit(hs5, hs1);}
    }
    else if (k==4) {
        if (v==5) {let hs5=5.22; let hs1=7.80; text=getit(hs5, hs1);}
        else if (v==6) {let hs5=4.90; let hs1=7.03; text=getit(hs5, hs1);}
        else if (v==7) {let hs5=4.68; let hs1=6.54; text=getit(hs5, hs1);}
        else if (v==8) {let hs5=4.53; let hs1=6.20; text=getit(hs5, hs1);}
        else if (v==9) {let hs5=4.41; let hs1=5.96; text=getit(hs5, hs1);}
        else if (v==10) {let hs5=4.33; let hs1=5.77; text=getit(hs5, hs1);}
        else if (v==11) {let hs5=4.26; let hs1=5.62; text=getit(hs5, hs1);}
        else if (v==12) {let hs5=4.20; let hs1=5.50; text=getit(hs5, hs1);}
        else if (v==13) {let hs5=4.15; let hs1=5.40; text=getit(hs5, hs1);}
        else if (v==14) {let hs5=4.11; let hs1=5.32; text=getit(hs5, hs1);}
        else if (v==15) {let hs5=4.08; let hs1=5.25; text=getit(hs5, hs1);}
        else if (v==16) {let hs5=4.05; let hs1=5.19; text=getit(hs5, hs1);}
        else if (v==17) {let hs5=4.02; let hs1=5.14; text=getit(hs5, hs1);}
        else if (v==18) {let hs5=4.00; let hs1=5.09; text=getit(hs5, hs1);}
        else if (v==19) {let hs5=3.98; let hs1=5.05; text=getit(hs5, hs1);}
        else if (v==20) {let hs5=3.96; let hs1=5.02; text=getit(hs5, hs1);}
        else if (v>20&&v<30) {let hs5=3.90; let hs1=4.91; text=getit(hs5, hs1);}
        else if (v>=30&&v<40) {let hs5=3.85; let hs1=4.80; text=getit(hs5, hs1);}
        else if (v>=40&&v<60) {let hs5=3.79; let hs1=4.70; text=getit(hs5, hs1);}
        else if (v>=60&&v<120) {let hs5=3.70; let hs1=4.54; text=getit(hs5, hs1);}
        else if (v>=120) {let hs5=3.66; let hs1=4.45; text=getit(hs5, hs1);}
    }
    else if (k==5) {
        if (v==5) {let hs5=5.67; let hs1=8.42; text=getit(hs5, hs1);}
        else if (v==6) {let hs5=5.30; let hs1=7.56; text=getit(hs5, hs1);}
        else if (v==7) {let hs5=5.06; let hs1=7.01; text=getit(hs5, hs1);}
        else if (v==8) {let hs5=4.89; let hs1=6.62; text=getit(hs5, hs1);}
        else if (v==9) {let hs5=4.76; let hs1=6.35; text=getit(hs5, hs1);}
        else if (v==10) {let hs5=4.65; let hs1=6.14; text=getit(hs5, hs1);}
        else if (v==11) {let hs5=4.57; let hs1=5.97; text=getit(hs5, hs1);}
        else if (v==12) {let hs5=4.51; let hs1=5.84; text=getit(hs5, hs1);}
        else if (v==13) {let hs5=4.45; let hs1=5.73; text=getit(hs5, hs1);}
        else if (v==14) {let hs5=4.41; let hs1=5.63; text=getit(hs5, hs1);}
        else if (v==15) {let hs5=4.37; let hs1=5.56; text=getit(hs5, hs1);}
        else if (v==16) {let hs5=4.33; let hs1=5.49; text=getit(hs5, hs1);}
        else if (v==17) {let hs5=4.30; let hs1=5.43; text=getit(hs5, hs1);}
        else if (v==18) {let hs5=4.28; let hs1=5.38; text=getit(hs5, hs1);}
        else if (v==19) {let hs5=4.25; let hs1=5.33; text=getit(hs5, hs1);}
        else if (v==20) {let hs5=4.23; let hs1=5.29; text=getit(hs5, hs1);}
        else if (v>20&&v<30) {let hs5=4.17; let hs1=5.17; text=getit(hs5, hs1);}
        else if (v>=30&&v<40) {let hs5=4.07; let hs1=5.00; text=getit(hs5, hs1);}
        else if (v>=40&&v<60) {let hs5=4.01; let hs1=4.86; text=getit(hs5, hs1);}
        else if (v>=60&&v<120) {let hs5=3.95; let hs1=4.76; text=getit(hs5, hs1);}
        else if (v>=120) {let hs5=3.89; let hs1=4.65; text=getit(hs5, hs1);}
    }
    else if (k==6) {
        if (v==5) {let hs5=6.03; let hs1=8.91; text=getit(hs5, hs1);}
        else if (v==6) {let hs5=5.63; let hs1=7.97; text=getit(hs5, hs1);}
        else if (v==7) {let hs5=5.36; let hs1=7.37; text=getit(hs5, hs1);}
        else if (v==8) {let hs5=5.17; let hs1=6.96; text=getit(hs5, hs1);}
        else if (v==9) {let hs5=5.02; let hs1=6.66; text=getit(hs5, hs1);}
        else if (v==10) {let hs5=4.91; let hs1=6.43; text=getit(hs5, hs1);}
        else if (v==11) {let hs5=4.82; let hs1=6.25; text=getit(hs5, hs1);}
        else if (v==12) {let hs5=4.75; let hs1=6.10; text=getit(hs5, hs1);}
        else if (v==13) {let hs5=4.69; let hs1=5.98; text=getit(hs5, hs1);}
        else if (v==14) {let hs5=4.64; let hs1=5.88; text=getit(hs5, hs1);}
        else if (v==15) {let hs5=4.59; let hs1=5.80; text=getit(hs5, hs1);}
        else if (v==16) {let hs5=4.56; let hs1=5.72; text=getit(hs5, hs1);}
        else if (v==17) {let hs5=4.52; let hs1=5.66; text=getit(hs5, hs1);}
        else if (v==18) {let hs5=4.49; let hs1=5.60; text=getit(hs5, hs1);}
        else if (v==19) {let hs5=4.47; let hs1=5.55; text=getit(hs5, hs1);}
        else if (v==20) {let hs5=4.45; let hs1=5.51; text=getit(hs5, hs1);}
        else if (v>20&&v<30) {let hs5=4.37; let hs1=5.37; text=getit(hs5, hs1);}
        else if (v>=30&&v<40) {let hs5=4.26; let hs1=5.18; text=getit(hs5, hs1);}
        else if (v>=40&&v<60) {let hs5=4.19; let hs1=5.05; text=getit(hs5, hs1);}
        else if (v>=60&&v<120) {let hs5=4.13; let hs1=4.93; text=getit(hs5, hs1);}
        else if (v>=120) {let hs5=4.06; let hs1=4.82; text=getit(hs5, hs1);}
    }
    return text;
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