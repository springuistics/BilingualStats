function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "jp") {
        location.href = "effect_calc_jp.html"
    }
}
function GetR() {
    var z = document.getElementById('zv').value;
    var TotalN = document.getElementById('dfv').value;
    var r = (Math.abs(z)) / (Math.sqrt(TotalN));
    r = r.toFixed(2);
    document.getElementById('r_result').style.display="block";
    document.getElementById('r_result').innerHTML="<i>r</i> = " + r;
}