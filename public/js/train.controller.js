/**
 * Created by Администратор on 31.08.15.
 */
(function() {
    'use strict';
   
    angular
        .module("gameApp")
        .controller("TrainController",TrainController);


    function TrainController($routeParams, $timeout) {
        var vm = this;
        vm.letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        vm.text = "Click the textbox when you are ready";
        vm.theStyle = "background-color:  orangered; text-align: center";
        vm.correct = 0;
        vm.finished = false;
        vm.error = 0;
        vm.settings = $routeParams;
        vm.diff = 0;
        vm.countTime = false;
        vm.cooldown = 5;
        vm.time = 0;
        vm.started = false;







        vm.generateText = function(len) {
            vm.text = "";
            for (var i=0;i<len;i++) {
                vm.text = vm.text+vm.letters[getRandom(0,vm.letters.length-1)];
            }

        };

        function getRandom(min,max) {
            var rand = min - 0.5 + Math.random()*(max-min+1);
            rand = Math.round(rand);

            return rand;
        }

        vm.updateText = function() {
            var user = vm.userInput;
            if (user.toLowerCase() == vm.text[0].toLowerCase()) {
                vm.correct++;
            } else {
                vm.error++;
            }
            vm.userInput = "";
            vm.text = vm.text.substr(1);
            vm.checkWin();

        };

        vm.getStyle = function() {
            if (vm.error == 0) {
                return "background-color: green; text-align: center";
            } else {
                return "background-color: orangered; text-align: center";
            }

        };

        vm.updateTime = function() {
            if (vm.finished) {
                return;
            }

            vm.time++;
            $timeout(vm.updateTime, 1000);
        };


        vm.checkWin = function() {
            if (vm.text.length == 0) {
                vm.finished = true;
            }
        };

        vm.back = function() {
            location.href = "../welcome";
        };


        if (vm.settings.difficulty == null) {
            vm.diff = 10;
        } else {
            vm.diff = vm.settings.difficulty;
        }

        if (vm.settings.time == null) {
            vm.countTime = vm.settings.time;
        } else {
            vm.countTime = true;
        }





        /*vm.countdown = function() {

            if (vm.cooldown == 0) {
                vm.started = true;
                if (vm.countTime) {
                    vm.updateTime();
                }
                vm.generateText(vm.diff);
            }


            if (!vm.started) {
                vm.cooldown--;
            } else {
                return;
            }

            $timeout(vm.countdown, 1000);
        };*/

      vm.startGame = function() {
          if (vm.started) {
              return;
          }

          vm.started = true;
          if (vm.countTime) {
              vm.updateTime();
          }
          vm.generateText(vm.diff);
      }

    }
})();