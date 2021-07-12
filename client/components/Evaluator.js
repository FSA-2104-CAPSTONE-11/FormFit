const evaluateExercise = (angleArray, exerciseCriteria) => {
  let result = {};
  // const debuggingArray = []

  exerciseCriteria.forEach((cElement) => {
    // spec format = {name : [node score required, min angle, max angle, type]}
    const spec = JSON.parse(cElement.spec);

    // get name and data from input criteria
    const criterionName = Object.keys(spec)[0];
    const criterionData = spec[criterionName];
    const criterionType = criterionData[3];

    // create key value pair and assign starting value in result obj, true if target value should not be reached, false if target should be reached
    result[criterionName] = criterionType === "avoid" ? true : false;

    // loop through angle array
    angleArray.forEach((aElement) => {
      const angleName = Object.keys(aElement)[0];
      const angleData = aElement[angleName];

      // // for debugging a particular criterion
      // if (angleName === "right_hipright_knee") {
      //   debuggingArray.push(angleData[0])
      // }

      // when we find criterion in angle array, check scores for each node are high enough
      if (
        criterionName === angleName &&
        criterionData[0] <= angleData[1] &&
        criterionData[0] <= angleData[2]
      ) {
        // if we have to hit target
        if (criterionType === "require") {
          // if a max is set, true if we get under
          if (criterionData[2]) {
            if (angleData[0] < criterionData[2]) {
              result[criterionName] = true;
            }
          } else {
            // if min is set, true if we get over
            if (angleData[0] > criterionData[1]) {
              result[criterionName] = true;
            }
          }
        }

        // if we have to avoid target
        if (criterionType === "avoid") {
          // if max is set, false if we get under target
          if (criterionData[2]) {
            if (angleData[0] < criterionData[2]) {
              result[criterionName] = false;
            }
          } else {
            // if min is set, false if we get over target
            if (angleData[0] > criterionData[1]) {
              result[criterionName] = false;
            }
          }
        }
      }
    });
  });
  // console.log(`debuggingArray`, debuggingArray);
  // console.log(`result`, result);
  return result;
};

export default evaluateExercise;
