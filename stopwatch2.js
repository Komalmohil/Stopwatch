const stopwatchElement = document.getElementById('stopwatch');
        const toggleButton = document.getElementById('toggle-btn');
        const lapResetButton = document.getElementById('lap-reset-btn');
        const lapsElement = document.getElementById('laps');

        let seconds = 0;
        let intervalId = null;
        let isRunning = false;
        let lapCount = 0;

        function updateStopwatch() {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600)/60);
            const secondsDisplay = seconds % 60;
            stopwatchElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(secondsDisplay)}`;
        }

        function pad(number) {
            return (number < 10? '0' : '') + number;
        }

        toggleButton.addEventListener('click', () => {
            if (!isRunning) {
                intervalId = setInterval(() => {
                    seconds++;
                    updateStopwatch();
                }, 1000);
                toggleButton.textContent = 'Stop';
                isRunning = true;
                lapResetButton.textContent = 'Lap';
            } else {
                clearInterval(intervalId);
                toggleButton.textContent = 'Start';
                isRunning = false;
                lapResetButton.textContent = 'Reset';
            }
        });

        lapResetButton.addEventListener('click', () => {
            if (lapResetButton.textContent === 'Lap') {
                lapCount++;
                const lapTime = `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`;
                const lapElement = document.createElement('div');
                lapElement.className = 'lap';
                lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
                lapsElement.appendChild(lapElement);
            } else {
                seconds = 0;
                updateStopwatch();
                clearInterval(intervalId);
                toggleButton.textContent = 'Start';
                isRunning = false;
                lapCount = 0;
                lapsElement.innerHTML = '';
                lapResetButton.textContent = 'Lap';
            }
        });