const express = require("express");
const app = express();

const ceilBMI = function(bmi) {
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

app.get("/", function(req, res){
    res.send("Welcome to BMI calculator, please use \
        URL /calculate to get the data for the people.");
});

app.get("/calculate", function(req, res){
    let data = require('./data.json');
    let table = require('./table1.json');
    let overweight_people = 0;
    data.forEach((people, index) => {
        if(people.HeightCm && people.WeightKg){
            let bmi = people.WeightKg / Math.pow((people.HeightCm/100), 2);
            if(bmi > 24.9){
                overweight_people++;
            }
            data[index] = { 
                ...people,
                ...table[ceilBMI(bmi)],
                ...{
                    "BMI":bmi.toFixed(1)
                }
            }
        }
    });
    let observations = `There are ${overweight_people} overweight patients from total of ${data.length}.`
    if(data.length > 100){
        observations+=` Note: Only showing result for upto 100 patients only, there are ${data.length-100} patients more.`
    }
    res.send({
        "observation": observations,
        "result":data.slice(0,100)
    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});