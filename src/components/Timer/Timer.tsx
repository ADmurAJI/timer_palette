import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
// Компонент таймера
const Timer: React.FC = () => {
    // Состояния для минут, секунд, статуса таймера и его завершения
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
    const [isTimerFinished, setIsTimerFinished] = useState<boolean>(false);

    // Обработчик изменения ввода минут
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Преобразование строки в число и установка нового значения минут
        setMinutes(parseInt(event.target.value, 10));
    };

    // Обработчик нажатия клавиши Enter в поле ввода
    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        // Если нажата клавиша Enter, запустить таймер
        if (event.key === 'Enter') {
            startTimer();
        }
    };

    // Функция запуска таймера
    const startTimer = () => {
        setIsTimerRunning(true);
    };

    // Эффект, отвечающий за логику работы таймера
    useEffect(() => {
        // Интервал для обновления состояний таймера
        let interval: NodeJS.Timeout;

        // Если таймер запущен
        if (isTimerRunning) {
            interval = setInterval(() => {
                // Логика уменьшения секунд и минут
                if (seconds === 0) {
                    if (minutes === 0) {
                        // Если время истекло, очистить интервал, установить статус завершения и остановить таймер
                        clearInterval(interval);
                        setIsTimerRunning(false);
                        setIsTimerFinished(true);
                    } else {
                        // Уменьшить минуты и установить секунды в 59
                        setMinutes((prev) => prev - 1);
                        setSeconds(59);
                    }
                } else {
                    // Уменьшить секунды
                    setSeconds((prev) => prev - 1);
                }
            }, 1000);
        }

        // Очистка интервала при размонтировании компонента или изменении зависимых состояний
        return () => clearInterval(interval);
    }, [isTimerRunning, minutes, seconds]);

    return (
        <div>
            <input
                type="number"
                value={minutes}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                style={{
                    padding: '8px',
                    margin: '4px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px',
                }}
            />

            {isTimerRunning ? (
                <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '8px' }}>
                    {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
                </div>
            ) : isTimerFinished ? (
                <div style={{ fontSize: '20px', color: 'green', fontWeight: 'bold', marginTop: '8px' }}>
                    Готово
                </div>
            ) : null}
        </div>
    );
};

export default Timer;
