for (let i = 1; i <= 9; i++) {
    initializeMachine(i);
  }
  
  function initializeMachine(machineNumber) {
    const machine = document.createElement("div");
    machine.className = "machine";
    machine.id = `machine-${machineNumber}`;
  
    const machineLabel = document.createElement("div");
    machineLabel.className = "machine-label";
    machineLabel.innerHTML = `Machine ${machineNumber}`;
    machine.appendChild(machineLabel);
  
    const timerDisplay = document.createElement("div");
    timerDisplay.className = "timer";
    timerDisplay.id = `timer-${machineNumber}`;
    timerDisplay.innerHTML = "00:00";
    machine.appendChild(timerDisplay);
  
    const timeInput = document.createElement("input");
    timeInput.type = "number";
    timeInput.placeholder = "Minutes";
    machine.appendChild(timeInput);
  
    let timerInterval;
    let timeLeft = 0;
  
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
  
    const startButton = document.createElement("button");
    startButton.innerHTML = "Start";
    startButton.addEventListener("click", () => {
      clearInterval(timerInterval);
      timeLeft = parseInt(timeInput.value) * 60;
      timerDisplay.innerHTML = formatTime(timeLeft);
      timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerHTML = formatTime(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          alert(`Machine ${machineNumber} is done!`);
        }
      }, 1000);
    });
  
    const pauseButton = document.createElement("button");
    pauseButton.innerHTML = "Pause";
    pauseButton.addEventListener("click", () => {
      clearInterval(timerInterval);
    });
  
    const resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset";
    resetButton.addEventListener("click", () => {
      clearInterval(timerInterval);
      timeLeft = 0;
      timerDisplay.innerHTML = "00:00";
    });
  
    buttonContainer.appendChild(startButton);
    buttonContainer.appendChild(pauseButton);
    buttonContainer.appendChild(resetButton);
    machine.appendChild(buttonContainer);
  
    document.getElementById("machine-container").appendChild(machine);
  }
  
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  