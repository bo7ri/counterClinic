for (let i = 1; i <= 9; i++) {
    initializeMachine(i);
  }
  
  function initializeMachine(machineNumber) {
    const container = document.getElementById('machine-container');
  
    const machine = document.createElement('div');
    machine.className = 'machine';
  
    const machineLabel = document.createElement('div');
    machineLabel.className = 'machine-label';
    machineLabel.innerHTML = `Machine ${machineNumber}`;
  
    const timer = document.createElement('div');
    timer.className = 'timer';
    timer.id = `timer-${machineNumber}`;
    timer.innerHTML = '00:00';
  
    const estimatedTimeDisplay = document.createElement('div');
    estimatedTimeDisplay.className = 'estimated-time';
    estimatedTimeDisplay.id = `estimated-time-${machineNumber}`;
    estimatedTimeDisplay.innerHTML = 'Estimated completion: N/A';
  
    const inputMinutes = document.createElement('input');
    inputMinutes.type = 'number';
    inputMinutes.placeholder = 'Minutes';
    inputMinutes.id = `input-${machineNumber}`;
  
    const startButton = document.createElement('button');
    startButton.innerHTML = 'Start';
    startButton.addEventListener('click', () => {
      const input = document.getElementById(`input-${machineNumber}`).value;
      let timeLeft = input * 60;
      const intervalId = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById(`timer-${machineNumber}`).innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
        const currentTime = new Date();
        const estimatedCompletion = new Date(currentTime.getTime() + timeLeft * 1000);
        const hours = estimatedCompletion.getHours();
        const minutesET = estimatedCompletion.getMinutes();
        estimatedTimeDisplay.innerHTML = `Estimated completion: ${hours}:${minutesET.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  
        if (timeLeft === 0) {
          clearInterval(intervalId);
        }
        timeLeft -= 1;
      }, 1000);
    });
  
    const pauseButton = document.createElement('button');
    pauseButton.innerHTML = 'Pause';
  
    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'Reset';
  
    machine.appendChild(machineLabel);
    machine.appendChild(timer);
    machine.appendChild(estimatedTimeDisplay);
    machine.appendChild(inputMinutes);
    machine.appendChild(startButton);
    machine.appendChild(pauseButton);
    machine.appendChild(resetButton);
  
    container.appendChild(machine);
  }
  