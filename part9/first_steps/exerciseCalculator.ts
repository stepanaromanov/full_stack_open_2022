interface resultObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises  = (target: number, values: number[]) :  resultObject => {
    const arrLength = values.length
    const average = values.reduce((a, b) => a + b, 0) / arrLength
    const trainingDays = values.filter(d => d !== 0).length
    let isSuccess
    let rating
    let ratingDescription

    if ( Math.ceil(average) < target ) {
        isSuccess = false
        rating = 1
        ratingDescription = 'not too bad but could be better'
    } else if ( target === Math.ceil(average) ) {
        isSuccess = true
        rating = 2
        ratingDescription = 'normal, neither good nor bad'
    } else if ( average > target ) {
        isSuccess = true
        rating = 3
        ratingDescription = 'very good, well done'
    }

    const objToReturn = {
        periodLength: arrLength,
        trainingDays: trainingDays,
        success: isSuccess,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }
    console.log(objToReturn)
    return objToReturn
}


/*

COMMAND LINE INTERFACE

interface resultObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: String,
  target: number,
  average: number
}

const calculateExercises  = (target: number, values: number[]) :  resultObject => {
    const arrLength = values.length
    const average = values.reduce((a, b) => a + b, 0) / arrLength
    const trainingDays = values.filter(d => d !== 0).length
    let isSuccess
    let rating
    let ratingDescription

    if ( Math.ceil(average) < target ) {
        isSuccess = false
        rating = 1
        ratingDescription = 'not too bad but could be better'
    } else if ( target === Math.ceil(average) ) {
        isSuccess = true
        rating = 2
        ratingDescription = 'normal, neither good nor bad'
    } else if ( average > target ) {
        isSuccess = true
        rating = 3
        ratingDescription = 'very good, well done'
    }

    const objToReturn = {
        periodLength: arrLength,
        trainingDays: trainingDays,
        success: isSuccess,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }
    
    console.log(objToReturn)
    return objToReturn
}

try {
    const parseArguments = (args: string[]) => {
        if (args.length < 4) throw new Error('Not enough arguments');
        const argsSlice = args.slice(3, args.length).map(elem => Number(elem))
        if (!isNaN(Number(args[2])) && !argsSlice.includes(NaN)) {
            return {
                target: Number(args[2]),
                values: argsSlice
            }
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }
    const { target, values } = parseArguments(process.argv);
    calculateExercises(target, values) 
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}



*/