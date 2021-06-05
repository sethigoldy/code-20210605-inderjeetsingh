exports.ceilBMI = function(bmi) {
    if(bmi <= 18.4){
        return "18.4"
    }else if (bmi <= 24.9){
        return "24.9"
    }else if (bmi <= 29.9){
        return "29.9"
    }else if (bmi <= 34.9){
        return "34.9"
    }else if (bmi <= 39.9){
        return "39.9"
    }
    return "100"
}
