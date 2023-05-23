export const calculateBMI = (height: number, weight: number) => {
    const bmi = weight / (( height / 100 ) ** 2)
    if (bmi <= 18.5) {
        console.log('Underweight')
        return 'Underweight'
    } 
    if (bmi <= 24 && bmi > 18.5) {
        console.log('Normal (healthy weight)')
        return 'Normal (healthy weight)'
    } 
    if (bmi > 24 && bmi < 30) {
        console.log('Overweight')
        return 'Overweight'
    }
    if ( bmi >= 30) {
        console.log('Obese')
        return 'Obese'
    }
    return 'wrong input'
}

/*

COMMAND LINE INTERFACE

const calculateBMI = (height: number, weight: number) => {
    const bmi = weight / (( height / 100 ) ** 2)
    if (bmi <= 18.5) {
        console.log('Underweight')
        return 'Underweight'
    } 
    if (bmi <= 24 && bmi > 18.5) {
        console.log('Normal (healthy weight)')
        return 'Normal (healthy weight)'
    } 
    if (bmi > 24 && bmi < 30) {
        console.log('Overweight')
        return 'Overweight'
    }
    if ( bmi >= 30) {
        console.log('Obese')
        return 'Obese'
    }
    return 'wrong input'
}

interface calculateBMIValues {
    value1: number;
    value2: number;
}

try {
    const parseArguments = (args: string[]): calculateBMIValues => {
        if (args.length < 4) throw new Error('Not enough arguments');
        if (args.length > 4) throw new Error('Too many arguments');
      
        if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
          return {
            value1: Number(args[2]),
            value2: Number(args[3])
          }
        } else {
          throw new Error('Provided values were not numbers!');
        }
    }

    const { value1, value2 } = parseArguments(process.argv);
    calculateBMI(value1, value2);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
}
    console.log(errorMessage);
}

*/

