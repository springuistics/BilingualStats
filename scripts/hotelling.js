

function runHotelling(data){
    const df1 = data.length;
    const grandN = data[0].length;
    const df2 = grandN-df1;
    
    let firstMatrix = [];
    const secondMatrix = covarianceMatrix(data);
    for (let i=0; i<data.length; i++){
        firstMatrix.push(average(data[i]))
    }
    const thisT2 = findT2(grandN, firstMatrix, secondMatrix);
    let thisF = thisT2 * (grandN - df1) / (df1 * (grandN-1));
    let thisp = getPfromF(df1, thisF, df1, df2);
    let thisEta2 = (df1*thisF) / (df1*thisF+df2);
    // Standard errors from diagonal of covariance
    const standardErrors = [];
    for (let i = 0; i < df1; i++) {
        const var_i = secondMatrix[i][i];
        standardErrors.push(Math.sqrt(var_i / grandN));
    }

    // Critical values
    const alpha = 0.05;
    const bonf_t = inverseT((1 - (alpha / (2 * df1))), (grandN-1));  // Bonferroni
    const sim_Fcrit = inverseF(1-alpha, df1, df2, );       // Simultaneous

    // Build intervals
    const bonfIntervals = [];
    const simIntervals = [];

    for (let i = 0; i < df1; i++) {
        const mean = firstMatrix[i];
        const se = standardErrors[i];
        const var_i = se ** 2 * grandN; 
        const radius = Math.sqrt((df1 * (grandN - 1) * sim_Fcrit * var_i) / (grandN * (grandN - df1)));

        bonfIntervals.push([mean - bonf_t * se, mean + bonf_t * se]);
        simIntervals.push([mean - radius, mean + radius]);
    }


    return {'F':thisF, 'p':thisp, 'Eta':thisEta2}

}