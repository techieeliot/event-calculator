import React, { useState, useEffect } from "react";
import axios from "axios";


// https://api.github.com/users/danielspofford/events

// PullRequestEvent = 5
// ForkEvent = 4
// IssueCommentEvent = 3
// PushEvent = 2
// all others = 1

// loop through the objects and assign a score based on the type
// use a reducer to add the sums of all the scores

export default () => {
  const [totalScore, setTotalScore] = useState(0);
  useEffect(() => {
    console.log("initial total:", totalScore)
    
    axios.get('https://api.github.com/users/danielspofford/events')
      .then(response => {
        let scores = []
        console.log(response.data)
        // create an array of the response data
        response.data.map(item => {
          let score;
          // find the type and assign a score then add that score to an array
          switch (item.type) {
            case 'PullRequestEvent':
              score = 5
              break;
            case 'ForkEvent':
              score = 4
              break;
            case 'IssueCommentEvent':
              score = 3
              break;
            case 'PushEvent':
              score = 2
              break;
            default:
              score = 1
              break;
          }
          scores.push(score)
          // when the last score has been reached, then the sum of all the ranked scores is calculated
          if (scores.length <= response.data.length) {
            const calculateTotalScore = () => scores.reduce((total, score)=> total + score)
            setTotalScore(calculateTotalScore())
          }
        })
      })
    }
    , [])
    
  console.log('running total:', totalScore)

  return (
    <div>
      <h1>The sum of all the scores is {(totalScore !== 0) && totalScore }</h1>
    </div>
  )
}

