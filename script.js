let intervalId;
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
    clearInterval(intervalId);
    const input = document.getElementById(`input-${machineNumber}`).value;
    let timeLeft = input * 60;
    intervalId = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById(`timer-${machineNumber}`).innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      const currentTime = new Date();
      const estimatedCompletion = new Date(currentTime.getTime() + timeLeft * 1000);
      let hours = estimatedCompletion.getHours();
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const minutesET = estimatedCompletion.getMinutes();
      estimatedTimeDisplay.innerHTML = `Estimated completion: ${hours}:${minutesET.toString().padStart(2, '0')} ${estimatedCompletion.getHours() >= 12 ? 'PM' : 'AM'}`;

      if (timeLeft === 0) {
        clearInterval(intervalId);
      }
      timeLeft -= 1;
    }, 1000);
  });

  const resetButton = document.createElement('button');
  resetButton.innerHTML = 'Reset';
  resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    document.getElementById(`timer-${machineNumber}`).innerHTML = '00:00';
    estimatedTimeDisplay.innerHTML = 'Estimated completion: N/A';
  });
  
    machine.appendChild(machineLabel);
    machine.appendChild(timer);
    machine.appendChild(estimatedTimeDisplay);
    machine.appendChild(inputMinutes);
    machine.appendChild(startButton);
    machine.appendChild(resetButton);
  
    container.appendChild(machine);
  }