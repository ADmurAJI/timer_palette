import { observable, action, reaction } from 'mobx';

class PaletteStore {
    // Массив цветов в палитре
    @observable colors: string[] = [];

    // Выбранный цвет
    @observable selectedColor: string | null = null;

    // Цвет по умолчанию
    @observable defaultColor: string = '#3498db';

    // Флаг открытия ColorPicker
    @observable isColorPickerOpen: boolean = false;

    // Конструктор класса, использует реакцию для отслеживания изменений в массиве colors
    constructor() {
        reaction(
            () => this.colors.slice(),
            (colors) => {
                const newColor = this.defaultColor;
                if (colors.includes(newColor)) {
                    this.setSelectedColor(newColor);
                    this.setIsColorPickerOpen(true);
                }
            }
        );
    }

    // Добавление цвета в палитру
    @action addDefaultColor = (color?: string) => {
        const newColor = color || this.defaultColor;
        this.colors.push(newColor);
        console.log("Добавлен цвет:", newColor);
    };

    // Удаление цвета из палитры
    @action removeColor = (color: string) => {
        this.colors = this.colors.filter((c) => c !== color);
    };

    // Обновление цвета в палитре
    @action updateColor = (color: string) => {
        if (this.selectedColor) {
            const index = this.colors.indexOf(this.selectedColor);
            if (index !== -1) {
                this.colors[index] = color;
                this.selectedColor = null;
            }
        }
    };

    // Установка выбранного цвета
    @action setSelectedColor = (color: string | null) => {
        this.selectedColor = color;
    };

    // Установка состояния открытия/закрытия ColorPicker
    @action setIsColorPickerOpen = (isOpen: boolean) => {
        this.isColorPickerOpen = isOpen;
    };

    // Новый метод для очистки палитры
    @action clearPalette = () => {
        this.colors = [];
        this.selectedColor = null;
        this.isColorPickerOpen = false;
    };
}

export const usePaletteStore = () => {
    return new PaletteStore();
};
