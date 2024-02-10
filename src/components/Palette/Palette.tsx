import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { usePaletteStore } from '../store/PaletteStore';
import { ChromePicker, ColorResult } from 'react-color';

// Компонент палитры с использованием MobX для управления состоянием цветов и ColorPicker
const Palette: React.FC = observer(() => {
    const paletteStore = usePaletteStore(); // Получение экземпляра хранилища палитры

    // Состояние для отслеживания видимости палитры
    const [isPaletteVisible, setIsPaletteVisible] = useState<boolean>(false);

    // Ref для ColorPicker, используется для определения кликов вне элемента и закрытия ColorPicker
    const colorPickerRef = useRef<HTMLDivElement>(null);

    // Обработчик клика по цвету
    const handleColorClick = (color: string) => {
        paletteStore.setSelectedColor(color); // Устанавливаем выбранный цвет в хранилище
        setIsPaletteVisible(true); // Показываем палитру
    };

    // Обработчик изменения цвета в ColorPicker
    const handleColorChange = (color: ColorResult) => {
        paletteStore.updateColor(color.hex); // Обновляем цвет в хранилище
    };

    // Обработчик закрытия ColorPicker
    const handleColorPickerClose = () => {
        setIsPaletteVisible(false); // Скрываем палитру
    };

    // Обработчик добавления цвета по умолчанию
    const handleAddDefaultColor = () => {
        console.log("Клик на кнопку 'Добавить цвет'");
        const defaultColor = paletteStore.defaultColor;
        if (paletteStore.colors.length === 0) {
            // Если палитра пуста, добавляем цвет по умолчанию и открываем палитру
            paletteStore.addDefaultColor(defaultColor);
            paletteStore.setSelectedColor(defaultColor);
            setIsPaletteVisible(true);
        }
    };

    // Эффект для отслеживания кликов вне ColorPicker и закрытия его
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
                handleColorPickerClose(); // Закрываем ColorPicker при клике вне его
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div>

            {/* Кнопка для добавления цвета по умолчанию */}
            <button
                style={{
                    padding: '8px',
                    margin: '4px',
                    backgroundColor: '#3498db',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
                onClick={handleAddDefaultColor}
            >
                Добавить цвет
            </button>

            {/* Отображение палитры */}
            <div>
                {paletteStore.colors.map((color) => (
                    <div
                        key={color}
                        style={{
                            cursor: 'pointer',
                            padding: '8px',
                            margin: '4px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            display: 'inline-block',
                            backgroundColor: color,
                            color: '#fff',
                        }}
                        onClick={() => handleColorClick(color)}
                    >
                        {/* Показ ColorPicker, если выбран цвет и палитра видима */}
                        {isPaletteVisible && (
                            <div
                                ref={colorPickerRef}
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    backgroundColor: '#fff',
                                    border: '1px solid #ccc',
                                    padding: '8px',
                                }}
                            >
                                <ChromePicker
                                    color={paletteStore.selectedColor || ''}
                                    onChange={handleColorChange}
                                />
                                <div onClick={handleColorPickerClose}>Закрыть ColorPicker</div>
                            </div>
                        )}
                        {color}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Palette;
