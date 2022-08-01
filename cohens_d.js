function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "jp") {
        location.href = "cohens_d_jp.html"
    }
}
function GetResults() {
    var M1 = document.getElementById('M1').value;
    var S1 = document.getElementById("S1").value;
    var N1 = document.getElementById("N1").value;
    var M2 = document.getElementById("M2").value;
    var S2 = document.getElementById("S2").value;
    var N2 = document.getElementById("N2").value;
    var pooled = Math.sqrt(((S1**2)+(S2**2))/2)
    var CohenD = 0;
    var TotalN = N1 + N2;
    if (TotalN >= 50) {
        if (M1 > M2){
            CohenD = (M1 - M2) / pooled;
        } else if (M2 > M1) {
            CohenD = (M2 - M1) / pooled;
        } else {
            CohenD = 0;
        }
        CohenD = CohenD.toFixed(2);
        document.getElementById("results_bun").style.display="block";
        document.getElementById("results_bun").innerHTML = "Your N values were large enough for a standard calculation of Cohen's D. For your data set, d = " + CohenD;
    } else {
        if (M1 > M2){
            CohenD = ((M1 - M2) / pooled) * ((TotalN - 3) / (TotalN - 2.25)) * (((TotalN-2)/TotalN)^0.5);
        } else if (M2 > M1) {
            CohenD = ((M2 - M1) / pooled) * ((TotalN - 3) / (TotalN - 2.25)) * (((TotalN-2)/TotalN)^0.5);
        } else {
            CohenD = 0;
        }
        CohenD = CohenD.toFixed(2);
        document.getElementById("results_bun").style.display="block";
        document.getElementById("results_bun").innerHTML = "Your N values were small and needed a corrected calculation of Cohen's D. For your data set, d = " + CohenD;
    }
    

}