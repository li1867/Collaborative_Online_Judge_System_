// let problems = [ //create a problem array
//     {
//       "id": 1,
//       "name": "Two sum",
//       "desc": "Given an array of integers, return indices of the two numbers such that they add up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
//       "difficulty": "easy"
//     },
//     {
//       "id": 2,
//       "name": "Median of Two Sorted Arrays",
//       "desc": "There are two sorted arrays nums1 and nums2 of size m and n respectively. Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
//       "difficulty": "medium"
//     },
//     {
//       "id": 3,
//       "name": "Add two numbers",
//       "desc": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
//       "difficulty": "hard"
//     },
//     {
//       "id": 4,
//       "name": "Reverse Integer",
//       "desc": "Given a 32-bit signed integer, reverse digits of an integer.",
//       "difficulty": "easy"
//     },
//     {
//       "id": 5,
//       "name": "Array Partition I",
//       "desc": "Given an array of 2n integers, your task is to group these integers into n pairs of integer, say (a1, b1), (a2, b2), ..., (an, bn) which makes sum of min(ai, bi) for all i from 1 to n as large as possible.",
//       "difficulty": "easy"
//     }
//   ];

const ProblemModel = require('../models/problemModel');

  const getProblems = function(){
    //return new Promise((resolve, reject) => {
    //  resolve(problems);
    //});
    return new Promise((resolve, reject) => {
      ProblemModel.find({}, (err, problems) => {
        if(err) {
          reject(err);
        }else{
          resolve(problems);
        }
      });
    });
  }

  const getProblem = function(id){
    return new Promise((resolve, reject) => {
      ProblemModel.findOne({id:id}, (err, problem) => {
        if(err) {
          reject(err);
        }else{
          resolve(problem);
        }
      });
    }); 
  }

  const addProblem = function(newProblem) {
    return new Promise((resolve, reject) => {
      ProblemModel.findOne({name: newProblem.name}, (err, data) => {  //find可以find多个，findOne可以find一个
        if(data){
          reject('Problem already exist');
        }else{
          ProblemModel.count({}, (err, count) => {
            newProblem.id = count + 1;
            const mongoProblem = new ProblemModel(newProblem);
            mongoProblem.save();
            resolve(mongoProblem);
          });
        }
      });
    });
  }

  module.exports = {
    getProblems,
    getProblem,
    addProblem
  }