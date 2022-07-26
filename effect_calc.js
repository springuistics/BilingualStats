function GetR() {
    var z = document.getElementById('zv').value;
    var TotalN = document.getElementById('dfv').value;
    var r = (Math.abs(z)) / (Math.sqrt(TotalN));
    r = r.toFixed(2);
    document.getElementById('r_result').style.display="block";
    document.getElementById('r_result').innerHTML="r = " + r;
}