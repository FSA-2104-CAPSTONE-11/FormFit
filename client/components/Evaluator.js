import React from "react";

function Evaluator(props) {
  let { angleArray } = props;
  //let angleArray = useSelector((state) => state.poses
  let [shoulderArray] = useState([]);
  let [kneeScore] = useState(0);
  let [shoulderScore] = useState(0);
  let [hipScore] = useState(0);

  const squatCriteria = [
    // name : [score req, min angle, max angle]
    { right_hipright_knee: [0.5, null, 5] },
    { right_shoulderright_hip: [0.5, null, 45] },
    { left_shoulderright_shoulder: [0.65, 5, null] },
  ];

  const evaluateExercise = (angleArray, criteria) => {
    let result = {};

    criteria.forEach(([cKey, cValue]) => {
      result[cKey] = cValue[1] ? true : false;
      angleArray.forEach(([aKey, aValue]) => {
        if (cKey === aKey && cValue[0] <= aValue[1] && cValue[0] <= aValue[2]) {
          if (cValue[1] && cValue[1] < aValue[0]) {
            result[cKey] = false;
          }
          if (cValue[2] && cValue[2] > aValue[0]) {
            result[cKey] = true;
          }
        }
      });
    });
    return result;
  };
}

export default Evaluator;
